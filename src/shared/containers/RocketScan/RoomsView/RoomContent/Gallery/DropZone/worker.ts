import A from 'axios';
import { Api } from 'Utils/api';
import { getTimeout, sleep } from 'Utils/helpers';

const tusVersion = '1.0.0';

const getFileName = (files: File[]) => files.map((file: File) => file.name);
const createAssembly = (params, numberOfFiles) => {
  const formData = new FormData();
  formData.append('params', JSON.stringify(params));
  formData.append('num_expected_upload_files', numberOfFiles);
  return A.post('https://api2.transloadit.com/assemblies', formData).then((r) => r.data);
};

const uploadFileToAssembly = async (file, assembly) =>
  new Promise<{ success: boolean; error?: any }>((resolve, reject) => {
    const metadata = `assembly_url ${btoa(assembly.assembly_url)},filename ${btoa(file.name)},fieldname ZmlsZQ==`;
    const tusHeaders = {
      'tus-resumable': tusVersion,
      'upload-length': String(file.size),
      'upload-metadata': metadata,
    };
    A.post(assembly.tus_url, {}, { headers: tusHeaders })
      .then((tusResponse) => {
        const uploadHeaders = {
          'tus-resumable': tusVersion,
          'upload-offset': '0',
          'content-type': 'application/offset+octet-stream',
        };
        A.patch(tusResponse.headers.location, file, { headers: uploadHeaders })
          .then(() => {
            resolve({ success: true });
          })
          .catch((e) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              success: false,
              error: e,
            });
          });
      })
      .catch((e) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          success: false,
          error: e,
        });
      });
  });

const linkAssemblyToGroup = (roomId, assembly, numberOfFiles, uuid, projectId) =>
  Api.post(`/rooms/${roomId}/photo-assemblies`, {
    assembly_id: assembly.assembly_id,
    total_files: numberOfFiles,
    room_id: roomId,
    project_id: projectId,
    group_uuid: uuid,
  });

export const handleUpload = async (userId, roomId, albumId, acceptedFiles, numberOfFiles, uuid, project) => {
  const params = {
    num_expected_upload_files: numberOfFiles,
    template_id: process.env.REACT_TRANSLOADIT_TEMPLATE_ID,
    auth: {
      key: process.env.REACT_TRANSLOADIT_AUTH_ID,
    },
    fields: {
      user_id: userId,
      room_id: roomId,
      // @ts-ignore
      albums: { [albumId]: getFileName(acceptedFiles) },
    },
  };
  return new Promise<any>((resolve) => {
    createAssembly(params, numberOfFiles).then(async (assembly) => {
      await linkAssemblyToGroup(roomId, assembly, numberOfFiles, uuid, project?.id);
      // eslint-disable-next-line no-restricted-syntax
      for (const file of acceptedFiles) {
        // eslint-disable-next-line no-await-in-loop
        await uploadFileToAssembly(file, assembly);

        // eslint-disable-next-line no-await-in-loop
        await sleep(getTimeout(numberOfFiles));
      }

      resolve(true);
    });
  });
};

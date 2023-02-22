import robodog from '@uppy/robodog';

export const logoUpload = async (fields, templateId, acceptedFile, setUploading, resetFetching) =>
  new Promise((resolve, reject) => {
    // set spinners
    setUploading();

    // upload files
    robodog
      .upload(acceptedFile, {
        waitForEncoding: true,
        waitForMetadata: true,
        params: {
          template_id: templateId,
          auth: { key: process.env.REACT_TRANSLOADIT_AUTH_ID },
          fields,
        },
      })
      .then(async (response) => {
        // reset spinners
        await resetFetching();
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });

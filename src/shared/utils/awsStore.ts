// setup methods for external use of Axios
import axios from 'axios';
import { Api, baseURL, headers } from 'Utils/api';
import { Buffer } from 'buffer';

// Create a custom instance, without the withCredentials attribute.  AWS doesn't like it
const instance = axios.create({
  baseURL,
  headers,
  withCredentials: false,
});

interface Options {
  bucket?: string;
  contentType?: string;
  expires?: string;
  visibility?: string;
  headers?: any;
  options?: any;
  cancelToken?: any;
  progress?: (progress: number) => void;
}
export const awsStore = async (file: any, binaryFileString: any, options: Options = {}) => {
  const buf = Buffer.from(binaryFileString.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  // Use our api to get a response from our backend.
  // const optionStore = { progress: () => {}, ...options };
  const response = await Api.post(
    process.env.REACT_VAPOR_URL,
    {
      bucket: options?.bucket || '',
      content_type: options?.contentType || file.type,
      expires: options?.expires || '',
      visibility: options?.visibility || '',
    },
    {
      baseURL: null,
      headers: options?.headers || {},
      ...options?.options,
    }
  );

  const headers = response.data.headers;

  if ('Host' in headers) {
    delete headers.Host;
  }

  if (typeof options.progress === 'undefined') {
    options.progress = () => {};
  }

  const cancelToken = options.cancelToken || '';
  const fileName = file.name.trim();

  // Find the last period, so we can get the extension of the file
  const lastPeriod = fileName.lastIndexOf('.');

  // Get the file extension. Slice will return everything after the period.
  const fileExtension = fileName.slice(lastPeriod);

  // Get the file name, without the extension
  const name = fileName.slice(0, lastPeriod);

  const data = {
    cancelToken,
    headers,
    // @ts-ignore
    uuid: response.uuid,
    key: response.key,
    bucket: response.bucket,
    name: fileName,
    extension: fileExtension,
    content_type: file.type,
  };

  // Only add the upload progess if the method is part of options
  if (options.progress) {
    // eslint-disable-next-line
    data['onUploadProgress'] = (progressEvent: any) => {
      options.progress(progressEvent.loaded / progressEvent.total);
    };
  }
  // Send the file and update it's data on AWS
  await instance.put(response.data.url, buf, {
    cancelToken,
    headers,
    // @ts-ignore
    uuid: response.uuid,
    key: response.key,
    bucket: response.bucket,
    name: fileName,
    extension: fileExtension,
    content_type: file.type,
  });
  response.data.name = name;
  response.data.extension = fileExtension;
  response.data.file = fileName;

  return response.data;
};

export const thumbnailSrcSelector = ({ photoview }: any) => {
  const value = photoview?.thumbnailSrcUrl;
  return value || "";
};
export const irImageSrcSelector = ({ photoview }: any) => {
  const value = photoview?.irImageSrcUrl;
  return value || "";
};

export const notesSelector = ({ photoview }: any) => {
  const value = photoview?.notes;
  return value || [];
};

export const imageIdSelector = ({ photoview }: any) => {
  const value = photoview?.id;
  return value || "";
};

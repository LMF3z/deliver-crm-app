export const getImageFromArrayString = (images: string) => {
  const files = JSON.parse(images).files;
  return files[0];
};

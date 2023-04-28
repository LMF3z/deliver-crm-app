import axios from 'axios';

interface DataImageSavedImgBBResponse {
  data: {
    data: {
      id: string;
      title: string;
      url_viewer: string;
      url: string;
      display_url: string;
      width: string;
      height: string;
      size: string;
      time: string;
      expiration: string;
      delete_url: string;
    };
  };
}

export const handleRequestUploadImagesToImgbb = async (
  file: File
): Promise<{ link: string; delete_hash: string } | null> => {
  try {
    const form = new FormData();
    form.append('image', file);

    const { data }: DataImageSavedImgBBResponse = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: `${import.meta.env.VITE_IMG_IMGBB_URL_API}?key=${
        import.meta.env.VITE_IMG_IMGBB_API_KEY
      }`,
      data: form,
    });

    const url = await data.data.url;
    const delete_url = await data.data.delete_url;

    return { link: url, delete_hash: delete_url };
  } catch (error) {
    return null;
  }
};

import { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { MdOutlinePhotoSizeSelectLarge } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';
import { handleRequestUploadImagesToImgbb } from '../../../API/handleUploadImage.api';
import Button from '../ContainerButton';
import Loader from '../loader/Loader';
import { useProductsStore } from '../../../store/products/products.store';

const totalPermitsImages = 4;

interface Props {
  handleClose: () => void;
}

const SelectMultiImagesModal = ({ handleClose }: Props) => {
  const { setArrayImages, arrayImages, isEditMode } = useProductsStore();

  const [imagesSelected, setImagesSelected] = useState<
    {
      file: File;
      id: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget) {
      return;
    }

    const files = event.currentTarget.files;

    if (files?.length! > totalPermitsImages) {
      toast.error('Máximo 4 imagénes');
      return;
    }

    const filesDos = [...files!].map((f, i) => ({ file: f, id: i }));

    setImagesSelected(filesDos);
  };

  const deleteImg = (i: number) =>
    setImagesSelected(imagesSelected.filter((f) => f.id !== i));

  const handleUploadImages = async () => {
    const files = imagesSelected.map((f) => f.file);

    let filesSaved: string[] = [];

    setIsLoading(true);

    for (const image of files) {
      const saved = await handleRequestUploadImagesToImgbb(image);
      if (!saved) {
        toast.error('Error al subir imagenes. Intente de nuevo.');
        break;
      }

      filesSaved.push(saved.link);
    }

    setIsLoading(false);

    toast.success('Imágenes guardadas exitosamente.');

    setImagesSelected([]);
    setArrayImages(JSON.stringify({ files: filesSaved }));
    handleClose();
  };

  return (
    <article className='w-full h-full py-5 flex flex-col justify-center items-center'>
      {imagesSelected.length < totalPermitsImages && (
        <div className='w-full p-5 relative flex justify-center items-center border border-gray-500 rounded-lg'>
          <input
            type='file'
            multiple
            accept='image/png,image/jpeg,image/jpg'
            onChange={handleChangeSelectImage}
            className='w-full h-full absolute opacity-0 cursor-pointer'
          />
          <MdOutlinePhotoSizeSelectLarge className='w-20 h-20' />
        </div>
      )}
      <section className='w-full p-2 grid grid-cols-2 gap-3'>
        {imagesSelected.length > 0 &&
          imagesSelected.map((img) => (
            <figure key={img.id} className='relative bg-gray-400 rounded-lg'>
              <RiCloseCircleFill
                className='absolute left-0 cursor-pointer'
                color='#fffefe'
                onClick={() => deleteImg(img.id)}
              />
              <img
                src={String(URL.createObjectURL(img.file))}
                alt='selected'
                className='w-full h-full object-contain rounded-lg'
              />
            </figure>
          ))}
      </section>
      <Button
        positionContentContainer='w-full pr-2 flex justify-end items-center'
        classes='w-32'
        isDisable={imagesSelected.length < totalPermitsImages || isLoading}
        handleClick={handleUploadImages}
      >
        Guardar
      </Button>
      <Loader isOpen={isLoading} />
    </article>
  );
};

export default SelectMultiImagesModal;

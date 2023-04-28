import Button from '../ContainerButton';
import Loader from '../loader/Loader';

interface Props {
  handleClose: () => void;
  handleAccept: () => void;
  isLoading?: boolean;
}

const AlertModal = ({
  handleAccept,
  handleClose,
  isLoading = false,
}: Props) => {
  return (
    <div className='h-[23vh] flex flex-col justify-between'>
      <div className='h-[50%] text-center flex items-center'>
        <h2>¿Está seguro que desea realizar esta acción?</h2>
      </div>

      <Loader isOpen={isLoading} />

      <div className='h-[40%] flex justify-end items-end space-x-2'>
        <Button
          handleClick={handleAccept}
          positionContentContainer='w-[40%]'
          classes='bg-red-600'
        >
          Aceptar
        </Button>
        <Button
          handleClick={handleClose}
          positionContentContainer='w-[40%]'
          classes='bg-green-600'
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default AlertModal;

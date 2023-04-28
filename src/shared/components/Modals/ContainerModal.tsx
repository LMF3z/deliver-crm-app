import { ReactNode } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';

interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
  children?: ReactNode;

  closeModal: () => void;
  handleAccept?: () => void;
}

const ContainerModal = ({
  isOpen = false,
  title = '',
  children,
  closeModal,
  handleAccept,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-bgModal fixed top-0 left-0 z-[100]'>
      <div className='w-[90%] max-w-2xl min-h-[30vh] max-h-[90vh] overflow-y-auto px-2 rounded-lg bg-white'>
        {/* header */}
        <div className='h-[10%] flex justify-between items-center p-2'>
          <label className='text-lg'>{title}</label>
          <RiCloseCircleFill
            className='cursor-pointer w-6 h-6'
            onClick={closeModal}
          />
        </div>
        {/* body */}
        <div className='h-full flex items-center flex-1 text-center text-2xl'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContainerModal;

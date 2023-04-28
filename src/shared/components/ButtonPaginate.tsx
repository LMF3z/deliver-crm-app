import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  handleClick?: () => void;
}

const ButtonPagination = ({ children, handleClick }: Props) => {
  return (
    <div className='w-8 h-8 rounded-full text-black flex justify-center items-center cursor-pointer'>
      <span onClick={handleClick}>{children}</span>
    </div>
  );
};

export default ButtonPagination;

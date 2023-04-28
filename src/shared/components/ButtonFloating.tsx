import { ReactNode } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';

interface Props {
  icon?: ReactNode;
  handleClick: () => void;
  classes?: string;
}

const ButtonFloating = ({
  icon = <AiFillFileAdd className='w-6 h-6' color='#fff' />,
  handleClick,
  classes,
}: Props) => {
  return (
    <div
      onClick={handleClick}
      className={`w-16 h-16 grid place-items-center bg-blue-600 rounded-full cursor-pointer fixed bottom-3 left-5 ${classes}`}
    >
      {icon}
    </div>
  );
};

export default ButtonFloating;

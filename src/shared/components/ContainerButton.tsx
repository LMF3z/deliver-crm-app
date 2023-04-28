import { ReactNode } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

interface Props {
  positionContentContainer?: string;
  classes?: string;
  children: ReactNode;
  type?: ButtonType;
  isDisable?: boolean;
  handleClick?: () => void;
}

const Button = ({
  positionContentContainer,
  classes,
  children,
  type = 'button',
  isDisable = false,
  handleClick = () => {},
}: Props) => {
  return (
    <div
      className={`w-full max-w-2xl cursor-pointer ${
        positionContentContainer || 'flex justify-center items-center'
      }`}
    >
      <button
        type={type}
        onClick={handleClick}
        disabled={isDisable}
        className={`flex justify-center items-center gap-2 py-3 text-sm lg:text-md hover:bg-purpureHover hover:text-white ${
          isDisable ? 'bg-gray-600' : 'bg-purpure'
        } rounded-lg ${classes}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  label: string;
  error?: string;
}

const ContainerInput = ({ children, label, error }: Props) => {
  return (
    <div className='w-full max-w-2xl'>
      <label className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      {children}
      <label className='label'>
        {error && <span className='label-text-alt text-red-500'>{error}</span>}
      </label>
    </div>
  );
};

export default ContainerInput;

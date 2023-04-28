import './loader.css';

const Loader = ({ isOpen = false }: { isOpen: boolean }) => {
  if (isOpen === false) {
    return null;
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='loader' />
    </div>
  );
};

export default Loader;

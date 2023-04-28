import { useRef, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  handleClick?: () => void;
  collapse: boolean;
  views?: {
    icon: ReactNode;
    label: string;
    handleClick: () => void;
  }[];
}

const ItemSideBar = ({
  icon,
  label,
  views,
  handleClick,
  collapse = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='flex flex-col transition-all duration-500 relative cursor-pointer'>
      <input
        ref={inputRef}
        id='input_check'
        type='checkbox'
        className='peer w-10 h-10 opacity-0 absolute cursor-pointer'
      />

      <div
        className='py-2 px-2 flex items-center justify-between capitalize hover:bg-bgHighlight'
        onClick={() => {
          if (handleClick) handleClick();
          inputRef.current!.checked = !inputRef.current!.checked;
        }}
      >
        <div className='flex items-center gap-3' onClick={handleClick}>
          {icon}
          <span>{label}</span>
        </div>
      </div>

      {collapse && (
        <>
          <ul className='hidden peer-checked:grid peer-checked:grid-rows-1 transition-all duration-500 overflow-hidden pb-2 space-y-2'>
            {views?.map((view, index) => (
              <li
                key={index}
                className='pl-5 py-1 flex items-center capitalize rounded-md hover:bg-bgHighlight'
                onClick={() => {
                  view.handleClick()!;
                  inputRef.current!.checked = false;
                }}
              >
                <span>{view.label}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );

  // return (
  //   <div
  //     tabIndex={0}
  //     className='relative overflow-hidden bg-bgDefault hover:bg-purpureHover hover:text-white rounded-lg border border-green-600'
  //   >
  //     {collapse && (
  //       <input
  //         ref={inputRef}
  //         type='checkbox'
  //         className='peer w-full h-full absolute right-0 inset-0 cursor-pointer'
  //       />
  //     )}

  //     <div className='h-full flex items-center justify-start space-x-2 border border-red-600'>
  //       {icon}{' '}
  //       <span className='capitalize' onClick={handleClick}>
  //         {label}
  //       </span>
  //     </div>
  //     {/* content */}
  //     {collapse && (
  //       <div className='max-h-0 peer-checked:max-h-screen overflow-hidden transition-all duration-500 p-2'>
  //         {views?.map((child, index) => (
  //           <div
  //             className='pl-8 py-1 hover:bg-purpureHover rounded-lg'
  //             key={index}
  //           >
  //             <span
  //               className='capitalize'
  //               onClick={() => {
  //                 if (child?.handleClick) {
  //                   child.handleClick();
  //                   inputRef.current!.checked = false;
  //                 }
  //               }}
  //             >
  //               {child.label}
  //             </span>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default ItemSideBar;

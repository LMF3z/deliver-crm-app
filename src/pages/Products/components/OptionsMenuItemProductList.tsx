interface Props {
  tabIndex: number;
}

const OptionsMenuItemProductList = ({ tabIndex }: Props) => {
  return (
    <ul
      tabIndex={tabIndex}
      className='w-52 dropdown-content menu p-2 shadow bg-bgHighlight rounded-box'
    >
      <li>
        <a className='' href=''>
          option 1
        </a>
      </li>
      <li className='hover:text-red-400'>
        <a className='' href=''>
          option 2
        </a>
      </li>
      <li>
        <a className='' href=''>
          option 3
        </a>
      </li>
      <li>
        <a className='' href=''>
          option 4
        </a>
      </li>
      <li>
        <a className='' href=''>
          option 5
        </a>
      </li>
    </ul>
  );
};

export default OptionsMenuItemProductList;

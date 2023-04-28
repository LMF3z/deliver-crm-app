import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Navbars/Header';
import SideBarMenu from '../components/Sidebars/SideBarMenu';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <SideBarMenu />
      <main className='w-full px-5 min-h-screen overflow-y-auto'>
        {children}
      </main>
      <Toaster position='top-right' reverseOrder={false} gutter={8} />
    </>
  );
};

export default MainLayout;

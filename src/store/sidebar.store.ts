import { create } from 'zustand';

interface SidebarMenuStorageI {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const sidebarMenuStorage = create<SidebarMenuStorageI>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));

export default sidebarMenuStorage;

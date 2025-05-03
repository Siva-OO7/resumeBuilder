import { IUser } from "@/interface";
import { create } from "zustand";

// Define the store type
interface IUsersStore {
  currentUserData: IUser | null;
  setCurrentUserData: (data: IUser) => void;
}

// Properly typed Zustand store
const usersGlobalStore = create<IUsersStore>((set) => ({
  currentUserData: null,
  setCurrentUserData: (data) => set({ currentUserData: data }),
}));

export default usersGlobalStore;
export type { IUsersStore };

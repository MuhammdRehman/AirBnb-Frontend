import {create} from 'zustand';
export const useAuthStore = create((set) => ({
    user : null,
    setUser: (user) => set({user}),
    Logout: (user)=>set({user:null})
}));
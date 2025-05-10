import { petApi } from "@/api/pet.api";
import { Pet } from "@/pets/interface/pet.interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PetState {
  pets: Pet[];
  isLoading: boolean;
  error: null | string;
  message: null | string;
  fetchPets: ({ userId }: { userId: string }) => void;
  addPet: (pet: any) => void;
  updatePet: (pet: any) => void;
  deletePet: (petId: string) => void;
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      pets: [],
      isLoading: false,
      error: null,
      message: null,

      fetchPets: async ({ userId }) => {
        set({ isLoading: true, message: null, error: null });
        try {
          const res = await petApi.get(`pets/`, {
            data: { userId },
          });

          if (!res.data.ok) {
            set({ pets: [], isLoading: false, message: res.data.message });
            return;
          }
          set({
            pets: res.data.pets,
            isLoading: false,
            message: res.data.message,
          });
        } catch (error) {
          console.log((error as any).response.data.message);
          set({
            isLoading: false,
            error: "Error fetching pets",
          });
        }
      },
      addPet: async (pet: Pet) => {
        set({ isLoading: true, message: null, error: null });
        try {
          const res = await petApi.post(`pets/add`, {
            data: { ...pet },
          });

          if (!res.data.ok) {
            set({ pets: [], isLoading: false, message: res.data.message });
            return;
          }
          set((state) => ({
            pets: [...state.pets, res.data.pet],
            isLoading: false,
            message: res.data.message,
          }));
        } catch (error) {
          console.log((error as any).response.data.message);
          set({
            isLoading: false,
            error: "Error adding pet",
          });
        }
      },
      updatePet: async (pet: Pet) => {
        const { id, ...rest } = pet;
        set({ isLoading: true, message: null, error: null });
        try {
          const res = await petApi.put(`pets/update/${id}`, pet);

          if (!res.data.ok) {
            set({ pets: [], isLoading: false, message: res.data.message });
            return;
          }
          set((state) => ({
            pets: state.pets.map((pet) => (pet.id === id ? res.data.pet : pet)),
            isLoading: false,
            message: res.data.message,
          }));
        } catch (error) {
          console.log((error as any).response.data.message);
          set({
            isLoading: false,
            error: "Error updating pet",
          });
        }
      },
      deletePet: async (petId: string) => {
        set({ isLoading: true, message: null, error: null });
        try {
          const res = await petApi.delete(`pets/delete/${petId}`);

          if (!res.data.ok) {
            set((state) => ({
              pets: state.pets,
              isLoading: false,
              message: res.data.message,
            }));
            return;
          }
          set((state) => ({
            pets: state.pets.filter((pet) => pet.id !== petId),
            isLoading: false,
            message: res.data.message,
          }));
        } catch (error) {
          console.log((error as any).response.data.message);
          set({
            isLoading: false,
            error: "Error deleting pet",
          });
        }
      },
    }),
    {
      name: "pets-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

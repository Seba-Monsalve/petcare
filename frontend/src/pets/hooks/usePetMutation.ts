import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPetAction, deletePetAction, updatePetAction } from "../actions";
import { Pet } from "../interface/pet.interface";

export const usePetMutation = () => {
  const queryClient = useQueryClient();

  const createPetMutation = useMutation({
    mutationFn: createPetAction,
    onMutate: async (data) => {
      const optimisticPet = {
        ...data,
        id: Date.now(),
      };

      queryClient.setQueryData(
        // ["pets", { filterKey: data.category }],
        ["pets", {}],
        (oldData: any) => {
          if (oldData) {
            return [...oldData, optimisticPet];
          }
          return [optimisticPet];
        }
      );

      return { optimisticPet };
    },
    onSuccess: (newPet, variables, context) => {
      queryClient.removeQueries({
        queryKey: ["pets", context.optimisticPet.id],
      });

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        if (!oldData) {
          return [newPet];
        }
        return oldData.map((insertedPet: Pet) => {
          return insertedPet.id === context.optimisticPet.id
            ? newPet
            : insertedPet;
        });
      });
    },
    onError: (error, variables, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });

      queryClient.removeQueries({
        queryKey: ["pet", context?.optimisticPet.id],
      });

      queryClient.setQueryData(
        // ["pets", { filterKey: context?.optimisticPet.category }],
        ["pets", {}],
        (oldData: any) => {
          if (!oldData) {
            return [];
          }
          return oldData.filter((insertedPet: Pet) => {
            return insertedPet.id !== context?.optimisticPet.id;
          });
        }
      );
    },
  });

  const updatePetMutation = useMutation({
    mutationFn: updatePetAction,
    onMutate: async (data) => {
      console.log("onMutate", data);

      const optimisticPet = {
        ...data.pet,
      };

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        if (oldData) {
          return [oldData.map];
        }
        return [optimisticPet];
      });
      queryClient.setQueryData(["pet", { petId: optimisticPet.id }], () => {
        return optimisticPet;
      });
      return optimisticPet;
    },
    onSuccess: (newPet, variables, context) => {
      queryClient.removeQueries({
        queryKey: ["pet", { petId: newPet }],
      });
      console.log("newPet", newPet);
      queryClient.setQueryData(["pet", { petId: newPet.id }], () => {
        return newPet;
      });
      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        return oldData.map((pet: Pet) => (pet.id === newPet.id ? newPet : pet));
      });
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        return oldData.map((pet: Pet) => pet);
      });
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: deletePetAction,
    onMutate: async (id) => {
      return id;
    },
    onSuccess: (newPet, variables, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   // queryKey: ["pets", { filterKey: data.category }],
      //   queryKey: ["pets", {}],
      // });

      queryClient.removeQueries({
        queryKey: ["pet", { context }],
      });
      queryClient.setQueryData(
        // ["pets", { filterKey: newPet.category }],
        ["pets", {}],
        (oldData: any) => {
          if (!oldData) {
            return [];
          }
          return oldData.filter((insertedPet: Pet) => {
            return insertedPet.id !== context;
          });
        }
      );
    },
    onError: (error, variables, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        return oldData;
      });
    },
  });
  return { createPetMutation, updatePetMutation, deletePetMutation };
};

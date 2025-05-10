import { z } from "zod";

export const addPetValidation = z.object({
  name: z.string().min(1, { message: "Campo requerido" }),
  species: z.string({ message: "Campo requerido" }),

  breed: z.string({ message: "Campo requerido" }),
  sex: z.string({ message: "Campo requerido" }),

  urlImage: z.any().optional(),
  weight: z
    .string()
    .min(1, { message: "Campo requerido" })
    .max(1000, { message: "El peso no puede ser mayor a 1000 kg" }),
  sterilized: z.boolean(),
});

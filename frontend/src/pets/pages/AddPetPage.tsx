import { PetForm } from "../components/PetForm";

export const AddPetPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
      <h1 className="text-2xl font-bold">Agregar Mascota</h1>
      <p className="text-sm text-muted-foreground">
        Completa el formulario para agregar una nueva mascota.
      </p>
      <div className=" flex flex-row  mt-4 w-full">
        <PetForm />
      </div>
    </div>
  );
};

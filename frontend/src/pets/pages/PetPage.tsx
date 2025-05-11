import { useNavigate, useParams } from "react-router";
import { usePetStore } from "@/store/pet.store";
import { useEffect, useState } from "react";
import { Pet } from "../interface/pet.interface";
import { UpdatePetForm } from "../components/UpdatePetForm";
import { Loader } from "lucide-react";

export const PetPage = () => {
  const { id } = useParams();

  const { getPetById, isLoading } = usePetStore();
  const navigate = useNavigate();

  const [pet, setpet] = useState<Pet | undefined>(undefined);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) {
        navigate("/dashboard/");
        return;
      }
      const pet = await getPetById(id!);
      if (!pet) {
        navigate("/dashboard/");
        return;
      }
      setpet(pet);
    };

    fetchPet();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
        <span className="text-2xl">Cargando...</span>
        <Loader size={50} className="animate-spin" />
      </div>
    );
  }

  return !pet ? (
    <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
      <p className="text-sm text-muted-foreground">
        No se encontró la mascota con el id: {id}
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-2 p-2 w-full items-center justify-center">
      <h1 className="text-2xl font-bold">{pet.name}</h1>
      <p className="text-sm text-muted-foreground">
        Esta es la información de la mascota
      </p>
      <div className=" flex flex-row  mt-4 w-full">
        <UpdatePetForm pet={pet} />
      </div>
    </div>
  );
};

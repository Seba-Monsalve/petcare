import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pencil,
  Trash2,
  Heart,
  Calendar,
  Syringe,
  Stethoscope,
  Clock,
  Phone,
  Mail,
  MapPin,
  Plus,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { usePetStore } from "@/store/pet.store";
import { Pet } from "../interface/pet.interface";
import { differenceInMonths, differenceInYears } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage, Badge } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VaccinationHistory } from "../components/VaccinationHistory";
import { MedicalHistory } from "../components/MedicalHistory.ts";
import { months_ES } from "@/common/data/date.ts";
import toast from "react-hot-toast";
import { Loading } from "@/common/components/Loading.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { AddMedicalRecordForm } from "../components/AddMedicalRecordForm.tsx";
import { AddVaccinationRecordForm } from "../components/AddVaccinationRecordForm.tsx";

export const PetPage = () => {
  const { getPetById, isLoading, deletePet, error } = usePetStore();
  const navigate = useNavigate();
  const { petId } = useParams();
  const [pet, setPet] = useState<Pet>();

  useEffect(() => {
    const fetchPet = async () => {
      if (!petId) {
        navigate("/dashboard/");
        return;
      }
      const pet = await getPetById(petId!);
      console.log(pet);
      if (!pet) {
        navigate("/dashboard/");
        return;
      }
      setPet(pet!);
      console.log(pet);
    };

    fetchPet();
  }, [petId]);

  async function onDelete() {
    console.log({ pet });
    const confirmed = await toast.promise(
      new Promise((resolve) => {
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <span className="DW ">¿Estás seguro?</span>
              <Button
                className="bg-rose-500"
                onClick={() => {
                  try {
                    deletePet(petId!);
                    resolve(true);
                  } catch (error) {
                    resolve(false);
                  } finally {
                    toast.dismiss(t.id);
                    navigate("/dashboard/");
                  }
                }}
              >
                Yes
              </Button>
              <Button
                className="bg-black text-white"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
              >
                No
              </Button>
            </div>
          ),
          {
            duration: Infinity,
          }
        );
      }),
      {
        loading: "Esperando...",
        success: "Mascota eliminada",
        error: "Error al eliminar la mascota",
      }
    );
  }

  if (isLoading || !pet) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Información de la Mascota
            </CardTitle>
            <Badge variant={pet.isActive ? "default" : "secondary"}>
              {pet.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </CardHeader> */}
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={
                  pet.urlImage ||
                  `/src/assets/images/${pet.species.toLowerCase()}.png`
                }
                alt={pet.name}
                className="object-cover"
              />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p className="text-sm text-muted-foreground">
              {pet.species} - {pet.breed}
            </p>

            <div className="mt-6 w-full space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Edad</span>
                </div>
                {differenceInYears(new Date(), new Date(pet.dob)) > 0 &&
                  `
                            ${differenceInYears(
                              new Date(),
                              new Date(pet.dob)
                            )} años
                            `}
                {` 
                        ${
                          differenceInMonths(new Date(), new Date(pet.dob)) % 12
                        } meses
                        `}
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Nacido en</span>
                </div>
                <span className="text-sm">
                  {`${months_ES[new Date(pet.dob).getMonth() + 1]} ${new Date(
                    pet.dob
                  ).getFullYear()}`}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Peso</span>
                </div>
                <span className="text-sm">{pet.weight} kg</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Syringe className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Microchip</span>
                </div>
                <span className="text-sm">{pet.microchip || "No tiene"}</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Última revisión</span>
                </div>
                <span className="text-sm">
                  {}
                  {new Date(
                    pet.medicalRecord[pet.medicalRecord.length - 1]?.date
                  ).toLocaleDateString() == "Invalid Date"
                    ? "Ninguna"
                    : new Date(
                        pet.medicalRecord[pet.medicalRecord.length - 1]?.date
                      ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to={`/dashboard/pets/update/${pet.id}`}>
              <Button variant="outline" className="flex items-center gap-1">
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="flex items-center gap-1"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 p-2">
          {/* <CardHeader>
            <CardTitle>Detalles Completos</CardTitle>
            <CardDescription>
              Información detallada y registros médicos de {pet.name}
            </CardDescription>
          </CardHeader> */}
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="medical">Historial Médico</TabsTrigger>
                <TabsTrigger value="vaccines">Vacunas</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4">
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Información General
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Género</span>
                          <span className="text-sm">{pet.sex}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Color</span>
                          <span className="text-sm">{}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Estado</span>
                          <Badge
                            variant={pet.isActive ? "default" : "secondary"}
                            className={`${
                              pet.isActive ? "bg-green-600" : "bg-red-600"
                            }`}
                          >
                            {pet.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Tipo</span>
                          <span className="text-sm">{pet.species}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Raza</span>
                          <span className="text-sm">{pet.breed}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">
                            Esterilizado
                          </span>
                          <span className="text-sm">
                            {pet.sterilized ? (
                              <Badge variant="default" className="bg-green-600">
                                Si
                              </Badge>
                            ) : (
                              <Badge variant="destructive">No</Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Información del Propietario
                    </h3>
                    <Card className="p-2">
                      <CardContent className="">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-15 w-15">
                            <AvatarFallback>
                              {pet.owner.username?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">
                              {pet.owner.username}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 text-rose-500" />
                              <span>{pet.owner.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3 text-rose-500" />
                              <span>{pet.owner.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 text-rose-500" />
                              <span>{pet.owner.address}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Notas</h3>
                    <Card className="p-2">
                      <CardContent className="">
                        {pet.notes.length > 0 ? (
                          pet.notes.map((note, index) => (
                            <ul
                              key={index}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <li> # {note}</li>
                            </ul>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No hay notas disponibles.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="medical" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Historial Médico</h3>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="bg-rose-500 hover:bg-rose-600 cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir Registro
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <AddMedicalRecordForm />
                    </PopoverContent>
                  </Popover>
                </div>
                <MedicalHistory pet={pet} />
              </TabsContent>
              <TabsContent value="vaccines" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Historial de Vacunación
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="bg-rose-500 hover:bg-rose-600 cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir Registro
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <AddVaccinationRecordForm />
                    </PopoverContent>
                  </Popover>
                </div>
                <VaccinationHistory pet={pet} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Syringe,
  Stethoscope,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
} from "lucide-react";
import { Link } from "react-router";

// // Datos de ejemplo para una mascota específica
// const pet = {
//   id: "1",
//   name: "Max",
//   type: "Perro",
//   breed: "Labrador",
//   color: "Dorado",
//   gender: "Macho",
//   birthDate: "2020-05-10",
//   age: 3,
//   weight: 28.5,
//   microchipNumber: "985121054367890",
//   status: "Activo",
//   lastCheckup: "2023-05-15",
//   notes: "Alérgico a ciertos tipos de alimentos. Requiere dieta especial.",
//   owner: {
//     id: "owner1",
//     name: "Juan Pérez",
//     phone: "+34 600 123 456",
//     email: "juan.perez@example.com",
//     address: "Calle Principal 123, Madrid",
//   },
// };

export default function PetDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pets">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          Detalles de Mascota
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Información de la Mascota
            </CardTitle>
            <Badge variant={pet.status === "Activo" ? "default" : "secondary"}>
              {pet.status}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={`/placeholder.svg?text=${pet.name.charAt(0)}`}
                alt={pet.name}
              />
              <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p className="text-sm text-muted-foreground">
              {pet.type} - {pet.breed}
            </p>

            <div className="mt-6 w-full space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Edad</span>
                </div>
                <span className="text-sm">{pet.age} años</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">
                    Fecha de nacimiento
                  </span>
                </div>
                <span className="text-sm">
                  {new Date(pet.birthDate).toLocaleDateString()}
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
                <span className="text-sm">{pet.microchipNumber}</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium">Última revisión</span>
                </div>
                <span className="text-sm">
                  {new Date(pet.lastCheckup).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/dashboard/pets/${pet.id}/edit`}>
              <Button variant="outline" className="flex items-center gap-1">
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            </Link>
            <Button variant="destructive" className="flex items-center gap-1">
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
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
                          <span className="text-sm">{pet.gender}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Color</span>
                          <span className="text-sm">{pet.color}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Estado</span>
                          <Badge
                            variant={
                              pet.status === "Activo" ? "default" : "secondary"
                            }
                          >
                            {pet.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Tipo</span>
                          <span className="text-sm">{pet.type}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Raza</span>
                          <span className="text-sm">{pet.breed}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-sm font-medium">Edad</span>
                          <span className="text-sm">{pet.age} años</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Información del Propietario
                    </h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {pet.owner.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">
                              {pet.owner.name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{pet.owner.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span>{pet.owner.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{pet.owner.address}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Notas</h3>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm">{pet.notes}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="medical" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Historial Médico</h3>
                  <Button className="bg-rose-500 hover:bg-rose-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Registro
                  </Button>
                </div>
                <MedicalHistory petId={pet.id} />
              </TabsContent>
              <TabsContent value="vaccines" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Historial de Vacunación
                  </h3>
                  <Button className="bg-rose-500 hover:bg-rose-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Vacuna
                  </Button>
                </div>
                <VaccinationHistory petId={pet.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

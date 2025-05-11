import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Filter, ArrowUpDown, ListCollapse } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { usePetStore } from "@/store/pet.store";
import { differenceInMonths, differenceInYears } from "date-fns";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

// Datos de ejemplo para mascotas
// const pets = [
//   {
//     id: "1",
//     name: "Max",
//     type: "Perro",
//     breed: "Labrador",
//     age: 3,
//     owner: "Juan Pérez",
//     status: "Activo",
//     lastCheckup: "2023-05-15",
//   },
//   {
//     id: "2",
//     name: "Luna",
//     type: "Gato",
//     breed: "Siamés",
//     age: 2,
//     owner: "María García",
//     status: "Activo",
//     lastCheckup: "2023-06-20",
//   },
//   {
//     id: "3",
//     name: "Rocky",
//     type: "Perro",
//     breed: "Pastor Alemán",
//     age: 5,
//     owner: "Carlos Rodríguez",
//     status: "Inactivo",
//     lastCheckup: "2023-04-10",
//   },
//   {
//     id: "4",
//     name: "Milo",
//     type: "Gato",
//     breed: "Persa",
//     age: 1,
//     owner: "Ana Martínez",
//     status: "Activo",
//     lastCheckup: "2023-07-05",
//   },
//   {
//     id: "5",
//     name: "Coco",
//     type: "Ave",
//     breed: "Canario",
//     age: 2,
//     owner: "Pedro Sánchez",
//     status: "Activo",
//     lastCheckup: "2023-06-15",
//   },
//   {
//     id: "6",
//     name: "Toby",
//     type: "Perro",
//     breed: "Beagle",
//     age: 4,
//     owner: "Laura Fernández",
//     status: "Activo",
//     lastCheckup: "2023-05-25",
//   },
//   {
//     id: "7",
//     name: "Simba",
//     type: "Gato",
//     breed: "Maine Coon",
//     age: 3,
//     owner: "David López",
//     status: "Inactivo",
//     lastCheckup: "2023-03-30",
//   },
//   {
//     id: "8",
//     name: "Bella",
//     type: "Perro",
//     breed: "Bulldog",
//     age: 2,
//     owner: "Sofía Gómez",
//     status: "Activo",
//     lastCheckup: "2023-07-10",
//   },
// ];

export default function PetsPage() {
  const { pets, fetchPets } = usePetStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    const fetchData = async () => {
      await fetchPets({ userId: user!.id });
    };

    fetchData();
  }, [user]);
  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mascotas</h1>
        <Link to="/dashboard/pets/new">
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Mascota
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Mascotas</CardTitle>
          <CardDescription>
            Administra todas las mascotas registradas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar mascotas..."
                    className="w-full pl-8"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filtrar</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Tipo de mascota</DropdownMenuItem>
                    <DropdownMenuItem>Edad</DropdownMenuItem>
                    <DropdownMenuItem>Propietario</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  elementos por página
                </p>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="text-center">
                    {/* <TableHead className="w-[80px]">ID</TableHead> */}
                    <TableHead />
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Nombre
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Raza</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Propietario</TableHead>
                    <TableHead>Última Revisión</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pets
                    .filter((pet) => pet.isActive)
                    .map((pet) => (
                      <TableRow
                        key={pet.id}
                        className="hover:bg-gray-100 items-center"
                      >
                        {/* <TableCell className="font-medium">{pet.id}</TableCell> */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-15 w-15 border-2 border-gray-300 shadow-md">
                              <AvatarImage
                                src={
                                  pet.urlImage ||
                                  `/src/assets/images/${pet.species.toLowerCase()}.png`
                                }
                                className="object-cover rounded-full"
                                alt={pet.name}
                              />
                              <AvatarFallback className="bg-gray-200 text-gray-600 font-bold">
                                {pet.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link to={`/dashboard/pets/${pet.id}`}>
                              {pet.name}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>{pet.species}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        {/* TODO: Cambiar a edad */}
                        <TableCell className="flex flex-col text-center items-center justify-center">
                          <span>
                            {differenceInYears(new Date(), new Date(pet.dob)) >
                              0 &&
                              `
                            ${differenceInYears(
                              new Date(),
                              new Date(pet.dob)
                            )} años
                            `}
                          </span>
                          <span>
                            {` 
                        ${
                          differenceInMonths(new Date(), new Date(pet.dob)) % 12
                        } meses
                        `}
                          </span>
                        </TableCell>

                        {/* <TableCell>{pet.owner}</TableCell> */}
                        {/* <TableCell>
                        <Badge
                          variant={
                            pet.isActive === "Activo" ? "default" : "secondary"
                          }
                        >
                          {pet.status}
                        </Badge>
                      </TableCell> */}
                        {/* <TableCell>
                        {new Date(pet.lastCheckup).toLocaleDateString()}
                      </TableCell> */}
                        <TableCell className="text-center">
                          {pet.owner?.username}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            className="bg-rose-500 hover:bg-black cursor-pointer"
                            onClick={() => {
                              navigate(`/dashboard/pets/${pet.id}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <ListCollapse className="" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

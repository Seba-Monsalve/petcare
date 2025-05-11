import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addPetValidation } from "../validation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PetData } from "../data/pet.data";
import { useNavigate } from "react-router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui";
import { Pet } from "../interface/pet.interface";
import { usePetStore } from "@/store/pet.store";
import toast from "react-hot-toast";

import { FaTrashAlt } from "react-icons/fa";
export function UpdatePetForm({ pet }: { pet: Pet }) {
  const form = useForm<z.infer<typeof addPetValidation>>({
    resolver: zodResolver(addPetValidation),
    defaultValues: {
      name: pet.name ?? "",
      species: pet.species ?? undefined,
      sex: pet.sex ?? undefined,
      weight: pet.weight.toString() ?? "0",
      sterilized: pet.sterilized,
      urlImage: pet.urlImage ?? null,
      breed: pet.breed ?? "",
      dob_month: pet.dob ? new Date(pet.dob).getMonth().toString() : "",
      dob_year: pet.dob ? new Date(pet.dob).getFullYear().toString() : "",
    },
  });
  const navigate = useNavigate();
  const { updatePet, error, deletePet } = usePetStore();

  async function onSubmit(values: z.infer<typeof addPetValidation>) {
    const { weight, dob_month, dob_year, ...rest } = values;
    const dob = new Date(+dob_year, +dob_month);
    // usar el toast con promise
    await updatePet({ weight: +weight, dob, ...rest, id: pet.id });
    if (error) return toast.error(error);
    // navigate("dashboard/pets");
    toast.success("Mascota actualizada correctamente");
  }

  async function onDelete() {
    const confirmed = await toast.promise(
      new Promise((resolve, reject) => {
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <span className="DW ">¿Estás seguro?</span>
              <Button
                className="bg-rose-500"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
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
        success: "",
        error: "",
      }
    );
    if (confirmed) {
      await deletePet(pet.id);
      if (!error) {
        toast.success("Mascota eliminada correctamente");
        navigate("/dashboard/");
      } else {
        toast.error("Error al eliminar la mascota");
      }
      return;
    }
  }

  const species = form.watch("species");
  const urlImage = form.watch("urlImage");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex  flex-col  gap-10 items-start justify-between   "
      >
        <div className="flex flex-row gap-5 justify-center text-center items-center ">
          {/* imagen */}
          <div className="flex h-ful flex-col gap-2  text-center items-center ">
            <h2 className="font-semibold"> Imagen de tu mascota</h2>
            <img
              src={
                pet.urlImage
                  ? pet.urlImage
                  : urlImage && urlImage.length > 0
                  ? URL.createObjectURL(urlImage[0])
                  : species
                  ? `/src/assets/images/${species.toLowerCase()}.png`
                  : `/src/assets/images/none.png`
              }
              alt="Imagen de la mascota"
              className="h-50 w-50 rounded-lg object-cover "
            />
            <FormField
              control={form.control}
              name="urlImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* name */}
          <div className="flex h-full flex-col gap-2  text-center  space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la mascota</FormLabel>
                  <FormControl>
                    <Input placeholder="Fido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["hembra", "macho"].map((value) => (
                            <SelectItem key={value} value={value}>
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especie</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona Especie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object?.keys(PetData)?.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raza</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={!form.watch("species")}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona Raza" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {PetData[species] &&
                            PetData[species].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* peso */}
          <div className="flex h-full flex-col gap-2  justify-between text-center items-center space-y-2">
            <div className="flex flex-col gap-2 space-y-2 ">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="50 kg"
                        {...field}
                        type="number"
                        min={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Label>Fecha de nacimiento</Label>
              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="dob_month"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            pet.dob
                              ? new Date(pet.dob).getMonth().toString()
                              : ""
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="0">January</SelectItem>
                              <SelectItem value="1">February</SelectItem>
                              <SelectItem value="2">March</SelectItem>
                              <SelectItem value="3">April</SelectItem>
                              <SelectItem value="4">May</SelectItem>
                              <SelectItem value="5">June</SelectItem>
                              <SelectItem value="6">July</SelectItem>
                              <SelectItem value="7">August</SelectItem>
                              <SelectItem value="8">September</SelectItem>
                              <SelectItem value="9">October</SelectItem>
                              <SelectItem value="10">November</SelectItem>
                              <SelectItem value="11">December</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sterilized"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Esterilizado</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-2 space-y-2 ">
              <Button type="submit" className="bg-rose-500  ">
                Actualizar
              </Button>
              <Button
                type="button"
                onClick={() => onDelete()}
                className="bg-black "
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

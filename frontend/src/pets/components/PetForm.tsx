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
import { usePetStore } from "@/store/pet.store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Switch } from "@/components/ui/switch";

export function PetForm() {
  const form = useForm<z.infer<typeof addPetValidation>>({
    resolver: zodResolver(addPetValidation),
    defaultValues: {
      name: "",
      species: "perro",
      sex: undefined,
      weight: "0",
      sterilized: false,
      urlImage: null,
      breed: "",
    },
  });
  const navigate = useNavigate();

  const { addPet, error } = usePetStore();

  async function onSubmit(values: z.infer<typeof addPetValidation>) {
    const { weight, ...rest } = values;
    // usar el toast con promise
    await addPet({ weight: Number(weight), ...rest });
    if (error) return toast.error(error);
    // navigate("dashboard/pets");
    toast.success("Mascota agregada correctamente");
  }

  const especie = form.watch("species");
  const imagen = form.watch("urlImage");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex  flex-row  gap-10 items-start justify-between   "
      >
        <div className="flex flex-col gap-2 justify-center text-center items-center ">
          <h2 className="font-semibold"> Imagen de tu mascota</h2>
          <img
            src={
              imagen && imagen.length > 0
                ? URL.createObjectURL(imagen[0])
                : `/src/assets/images/${especie.toLowerCase()}.png`
            }
            alt="Imagen de la mascota"
            className="h-50 w-50 rounded-lg object-fit "
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
        <div className="space-y-2">
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
                  <Select onValueChange={field.onChange}>
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
                    onValueChange={field.onChange}
                    disabled={!form.watch("species")}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona Raza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PetData[especie] &&
                          PetData[especie].map((value) => (
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
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso</FormLabel>
                <FormControl>
                  <Input placeholder="50 kg" {...field} type="number" min={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sterilized"
            render={({}) => (
              <FormItem>
                <FormLabel>Esterilizado</FormLabel>
                <FormControl>
                  <Switch />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-rose-500">
            Ingresar
          </Button>
        </div>
      </form>
    </Form>
  );
}

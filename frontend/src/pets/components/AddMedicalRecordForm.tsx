import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MedicalRecordType } from "../interface/pet.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMedicalRecordSchema } from "../validation/addMedicalRecord.schema";
import { z } from "zod";
import { usePetMutation } from "../hooks";
import { PopoverClose } from "@radix-ui/react-popover";
import { PetData } from "../data/pet.data";
import { months_ES } from "@/common/data/date";
import { D } from "node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o";

export const AddMedicalRecordForm = ({ pet }: { pet: any }) => {
  const form = useForm<z.infer<typeof addMedicalRecordSchema>>({
    resolver: zodResolver(addMedicalRecordSchema),
    defaultValues: {
      type: undefined,
      description: "",
      month: new Date().getMonth().toString(),
      year: new Date().getFullYear().toString(),
    },
  });
  console.log(months_ES[new Date().getMonth()]);
  const { updatePetMutation } = usePetMutation();

  function onSubmit(values: z.infer<typeof addMedicalRecordSchema>) {
    console.log({ values });
    const medicalRecord = [
      ...pet.medicalRecord,
      {
        id: undefined,
        date: new Date(+values.year, +values.month),
        createdAt: undefined,
        ...values,
      },
    ];
    updatePetMutation.mutate({
      pet: {
        medicalRecord: medicalRecord,
      },
      id: pet.id,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <h3 className="text-lg font-medium mb-2">Nuevo Registro Médico</h3>
          <p className="text-sm text-muted-foreground"></p>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(MedicalRecordType).map((value) => (
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Descripción del registro médico"
                  className="w-full resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Fecha</Label>
        <div className="flex flex-row gap-2 w-full">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {months_ES.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
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
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    {...field}
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
                            <SelectItem key={year} value={year.toString()}>
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
        <PopoverClose
          disabled={!form.formState.isValid}
          type="submit"
          className={`cursor-pointer  ${
            !form.formState.isValid
              ? "bg-gray-300 "
              : "bg-rose-500 hover:bg-rose-600 transition-colors "
          }  text-white   rounded-md px-4 py-2 text-sm font-medium shadow-sm duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Ingresar
        </PopoverClose>
      </form>
    </Form>
  );
};

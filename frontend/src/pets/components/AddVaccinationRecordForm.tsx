import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VaccinationRecordType } from "../interface/pet.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addVaccinationRecord } from "../validation/addVaccinationRecord.schema";

export const AddVaccinationRecordForm = () => {
  const form = useForm<z.infer<typeof addVaccinationRecord>>({
    resolver: zodResolver(addVaccinationRecord),
    defaultValues: {
      type: VaccinationRecordType.Rabia,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof addVaccinationRecord>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <h3 className="text-lg font-medium mb-2">Nueva Vacuna </h3>
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
                      {Object.values(VaccinationRecordType).map((value) => (
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

        <FormLabel>Proxima Dosis</FormLabel>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Enero</SelectItem>
                        <SelectItem value="1">Febrero</SelectItem>
                        <SelectItem value="2">Marzo</SelectItem>
                        <SelectItem value="3">Abril</SelectItem>
                        <SelectItem value="4">Mayo</SelectItem>
                        <SelectItem value="5">Junio</SelectItem>
                        <SelectItem value="6">Julio</SelectItem>
                        <SelectItem value="7">Agosto</SelectItem>
                        <SelectItem value="8">Septiembre</SelectItem>
                        <SelectItem value="9">Octubre</SelectItem>
                        <SelectItem value="10">Noviembre</SelectItem>
                        <SelectItem value="11">Diciembre</SelectItem>
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
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 3 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Observaciones de la vacuna"
                  className="w-full resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

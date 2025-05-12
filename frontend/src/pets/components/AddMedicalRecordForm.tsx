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
import { MedicalRecordType } from "../interface/pet.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMedicalRecordSchema } from "../validation/addMedicalRecord.schema";
import { z } from "zod";

export const AddMedicalRecordForm = () => {
  const form = useForm<z.infer<typeof addMedicalRecordSchema>>({
    resolver: zodResolver(addMedicalRecordSchema),
    defaultValues: {
      type: MedicalRecordType.Consulta,
      description: "sasd",
    },
  });

  function onSubmit(values: z.infer<typeof addMedicalRecordSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

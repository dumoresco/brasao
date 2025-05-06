"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useCreateField } from "@/hooks/use-create-field";

export const fieldSchema = z.object({
  name: z.string().min(3, {
    message: "O nome do campo deve ter pelo menos 3 caracteres.",
  }),
  datatype: z.enum(["STRING", "NUMBER", "BOOLEAN", "DATE"]),
});

export const AddNewField = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const form = useForm<z.infer<typeof fieldSchema>>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: "",
      datatype: "STRING",
    },
  });

  const { mutate, isPending } = useCreateField();

  const handleSubmit = (data: z.infer<typeof fieldSchema>) => {
    mutate(data, {
      onSuccess: () => {
        setDialogOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size={"sm"} className="font-bold">
          <Plus className="h-4 w-4 " />
          {!isMobile && "Adicionar Campo"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Campo</DialogTitle>
          <DialogDescription>
            Insira os detalhes do campo que deseja adicionar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Campo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <FormField
                control={form.control}
                name="datatype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de dado</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o tipo de dado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STRING">STRING</SelectItem>
                          <SelectItem value="NUMBER">NUMBER</SelectItem>
                          <SelectItem value="BOOLEAN">BOOLEAN</SelectItem>
                          <SelectItem value="DATE">DATE</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="font-bold" isLoading={isPending}>
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

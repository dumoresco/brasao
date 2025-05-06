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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useQueryClient } from "@tanstack/react-query";
import { NumberInput } from "./inputs/number-input";
import { DateInput } from "./inputs/date-input";
import { BooleanInput } from "./inputs/boolean-input";
import { StringInput } from "./inputs/string-input";
import { useCreateFill } from "@/hooks/use-create-fill";
import type { Campo } from "../fields/fields-table-columns";

export const fillSchema = z
  .object({
    fieldId: z.string().min(1, {
      message: "O campo deve ser selecionado.",
    }),
    value: z.union([z.string(), z.number(), z.boolean(), z.date()]),
  })
  .refine(
    (data) => {
      const queryClient = useQueryClient();
      const fieldsCache = queryClient.getQueryData<Campo[]>(["fields"]);

      if (!fieldsCache) return true;

      const { datatype } =
        fieldsCache.find((field) => field.id === data.fieldId) || {};

      switch (datatype) {
        case "NUMBER":
          return !isNaN(Number(data.value));
        case "BOOLEAN":
          return (
            typeof data.value === "string" &&
            ["true", "false"].includes(data.value.toLowerCase())
          );
        case "DATE":
          return (
            typeof data.value === "string" && !isNaN(Date.parse(data.value))
          );
        default:
          return true;
      }
    },
    {
      message: "Valor inválido para o tipo de dado selecionado.",
      path: ["value"],
    }
  );

export const AddNewFill = () => {
  const queryClient = useQueryClient();
  const fieldsCache = queryClient.getQueryData<Campo[]>(["fields"]);

  const fillSchema = React.useMemo(() => {
    return z
      .object({
        fieldId: z.string().min(1, {
          message: "O campo deve ser selecionado.",
        }),
        value: z.string().min(1, {
          message: "O valor deve ser preenchido.",
        }),
      })
      .refine(
        (data) => {
          const field = fieldsCache?.find((field) => field.id === data.fieldId);
          if (!field) return true;

          const { datatype } = field;

          switch (datatype) {
            case "NUMBER":
              return !isNaN(Number(data.value));
            case "BOOLEAN":
              return ["true", "false"].includes(data.value.toLowerCase());
            case "DATE":
              return !isNaN(Date.parse(data.value));
            default:
              return true; // STRING
          }
        },
        {
          message: "Valor inválido para o tipo de dado selecionado.",
          path: ["value"],
        }
      );
  }, [fieldsCache]);
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const form = useForm<z.infer<typeof fillSchema>>({
    resolver: zodResolver(fillSchema),
    defaultValues: {
      fieldId: "",
      value: "",
    },
  });

  const { mutate, isPending } = useCreateFill();

  const handleSubmit = (data: z.infer<typeof fillSchema>) => {
    const currentField = fieldsCache?.find(
      (field) => field.id === data.fieldId
    );
    let parsedValue: string | number | boolean | Date = data.value;

    switch (currentField?.datatype) {
      case "NUMBER":
        parsedValue = Number(data.value);
        break;
      case "BOOLEAN":
        parsedValue =
          typeof data.value === "string"
            ? data.value.toLowerCase() === "true"
            : Boolean(data.value);
        break;
      case "DATE":
        parsedValue = new Date(data.value).toISOString();
        break;
      default:
        parsedValue = String(data.value);
    }

    mutate(
      { ...data, value: parsedValue },
      {
        onSuccess: () => {
          setDialogOpen(false);
          form.reset();
        },
      }
    );
  };

  const currentField = fieldsCache?.find(
    (field) => field.id === form.watch("fieldId")
  );

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
          {!isMobile && "Adicionar Preenchimento"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Preenchimento</DialogTitle>
          <DialogDescription>
            Insira os detalhes do preenchimento que deseja adicionar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="fieldId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campo</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de dado" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldsCache?.map((field: Campo) => (
                          <SelectItem key={field.id} value={field.id}>
                            {field.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={() => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    {renderInput(
                      currentField?.datatype ?? "STRING",
                      String(form.watch("value") ?? ""),
                      (val) => form.setValue("value", val)
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

type SupportedValue = string | number | boolean | Date;

const renderInput = (
  datatype: string | number | boolean | Date,
  value: SupportedValue,
  onChange: (val: string) => void
) => {
  const stringValue = String(value ?? "");

  switch (datatype) {
    case "NUMBER":
      return <NumberInput value={stringValue} onChange={onChange} />;
    case "DATE":
      return <DateInput value={stringValue} onChange={onChange} />;
    case "BOOLEAN":
      return <BooleanInput value={stringValue} onChange={onChange} />;
    default:
      return <StringInput value={stringValue} onChange={onChange} />;
  }
};

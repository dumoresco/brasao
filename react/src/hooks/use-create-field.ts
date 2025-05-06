import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import { api } from "../lib/api";
import type { fieldSchema } from "@/components/fields/add-new-field";

export const useCreateField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: z.infer<typeof fieldSchema>) => {
      const { name, datatype } = payload;

      const { data } = await api.post("/campos", {
        name,
        datatype,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      toast.success("Campo criado com sucesso!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao criar campo: Erro desconhecido.");
      }
    },
  });
};

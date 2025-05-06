import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import { api } from "../lib/api";
import type { fillSchema } from "@/components/fillers/add-new-fill";

export const useCreateFill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: z.infer<typeof fillSchema>) => {
      const { fieldId, value } = payload;

      const { data } = await api.post("/preenchimentos", {
        fieldId,
        value,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fills"] });
      toast.success("Preenchimento criado com sucesso!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao criar preenchimento: Erro desconhecido.");
      }
    },
  });
};

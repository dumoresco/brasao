import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useGetFields = () => {
  return useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const response = await api.get(`/campos`);

      return response.data;
    },
  });
};

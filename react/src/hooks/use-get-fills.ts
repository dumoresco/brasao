import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useGetFills = () => {
  return useQuery({
    queryKey: ["fills"],
    queryFn: async () => {
      const response = await api.get(`/preenchimentos`);

      return response.data;
    },
  });
};

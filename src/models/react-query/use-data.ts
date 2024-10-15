import { useQuery } from "@tanstack/react-query";
import { getData, getDataParams } from "@/src/models/data.model";

export const useGetData = (params: getDataParams) => {
  return useQuery(["data"], () => getData(params), {
    select: (data) => {
      return data;
    },
  });
};

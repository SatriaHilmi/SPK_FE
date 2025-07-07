import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export interface Jenis {
    id: string;
    nama: string;
}

export const useGetJenisQuery = () => {
    return useQuery({
        queryKey: ["jenis"],
        queryFn: async () => {
            const AxiosRest = await Axios.get<Jenis[]>("http://localhost:3000/jenis", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return AxiosRest.data;
        },
    });
};
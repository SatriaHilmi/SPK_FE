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
            const AxiosRest = await Axios.get<Jenis[]>("https://spkbe-production.up.railway.app/jenis", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return AxiosRest.data;
        },
    });
};
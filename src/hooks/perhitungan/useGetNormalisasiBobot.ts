import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export interface ResponseNormalisasiBobot {
    code: string;
    weight: number;
}

export const useGetNormalisasiBobot = () => {
    return useQuery({
        queryKey: ["normalisasi-bobot"],
        queryFn: async () => {
            const AxiosRest = await Axios.get<ResponseNormalisasiBobot[]>('http://localhost:3000/perhitungan/normalisasi-bobot', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        }
    });
}

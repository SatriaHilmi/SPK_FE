import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export interface ResponseUtilityPerJenis {
    matrixPerJenis: {
        jenis: string;
        dataHeader: string[];
        dataTable: {
            alternatif: string;
            criteria: {
                id: string;
                alternatif: string;
                codeId: string;
                nilai: number;
                nilaiUtility: number;
            }[];
        }[];
    }[];
}

export const useGetUtility = () => {
    return useQuery({
        queryKey: ['nilai-utility'],
        queryFn: async () => {
            const AxiosRest = await Axios.get<ResponseUtilityPerJenis>('https://spkbe-production.up.railway.app/perhitungan/nilai-utility', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return AxiosRest.data;
        },
    });
};

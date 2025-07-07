import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
// import { any } from "joi";

export interface ResponseMatrix {
    dataHeader: {
        code: string;
    }[],
    matrixPerJenis: {
        jenis: string;
        dataTable: {
            alternatif: string;
            criteria: {
                codeId: string;
                nilai: number;
            }[];
        }[];
    }[]
}

export const useGetDataMatrix = () => {
    // const queryKey: any[] = ['matrix'];
    return useQuery({
        queryKey: ["matrix"],
        queryFn: async () => {
            const AxiosRest = await Axios.get<ResponseMatrix>('http://localhost:3000/perhitungan/matrix', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        }
    });
}
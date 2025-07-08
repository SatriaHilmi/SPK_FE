import { useQuery } from "@tanstack/react-query";
import Axios from "axios";


export interface subCriteria {
    id: string,
    alternatif: string,
    namaId: string,
    subKriteria: { codeId: string; nilai: number }[];
    jenis: { nama: string; };
    codeId: string,
    nilai: number,
}

export const useGetSubCriteriaQuery = () => {
    return useQuery({
        queryKey: ['subkriteria'], queryFn: async () => {
            const AxiosRest = await Axios.get<subCriteria[]>('https://spkbe-production.up.railway.app//subkriteria', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        }
    });
}
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

interface TotalNilaiResponse {
    matrixTotal: {
        jenis: string;
        data: {
            alternatif: string;
            totalNilai: number;
        }[]
    }[]
}

export const useGetTotal = () => {
    return useQuery({
        queryKey: ['total-nilai'],
        queryFn: async () => {
            const res = await Axios.get<TotalNilaiResponse>('http://localhost:3000/perhitungan/total-nilai', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        }
    });
};
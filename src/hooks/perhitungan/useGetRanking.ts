import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface ResponseRanking {
    jenis: string;
    data: {
        alternatif: string;
        totalNilai: number;
        ranking: number;
        jenis: string;
    }[];
}

export const useGetRanking = () => {
    return useQuery({
        queryKey: ['ranking'],
        queryFn: async () => {
            const res = await axios.get<ResponseRanking[]>('http://localhost:3000/perhitungan/ranking', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return res.data;
        }
    });
};

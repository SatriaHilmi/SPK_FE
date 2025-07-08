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
            const res = await axios.get<ResponseRanking[]>('https://spkbe-production.up.railway.app//perhitungan/ranking', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return res.data;
        }
    });
};

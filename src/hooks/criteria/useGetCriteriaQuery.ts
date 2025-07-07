import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

export interface Criteria {
  id: string,
  code: string,
  name: string
  weight: number,
  criteria: string,
}

export const useGetCriteriaQuery = () => {
  return useQuery({
    queryKey: ['kriteria'], queryFn: async () => {
      const AxiosRest = await Axios.get<Criteria[]>('http://localhost:3000/kriteria', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return AxiosRest.data
    }
  });
};
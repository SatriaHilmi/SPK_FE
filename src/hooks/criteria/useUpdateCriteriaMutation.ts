import {useMutation} from '@tanstack/react-query'
import Axios from 'axios'
import { Criteria } from './useGetCriteriaQuery'

export const useUpdateCriteriaMutation = () => {
  return useMutation({
    mutationFn: async (data: Criteria) => {
      const AxiosRest = await Axios.put(`http://localhost:3000/kriteria/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return AxiosRest.data
    },
  })
}
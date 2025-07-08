import { useMutation } from '@tanstack/react-query'
import Axios from 'axios'

export const useCriteriaMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const AxiosRest = await Axios.delete(`https://spkbe-production.up.railway.app/kriteria/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return AxiosRest.data
    },
  })
}
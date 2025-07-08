import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { Criteria } from "./useGetCriteriaQuery";

export const useCreateCriteriaMutation = () => {
    return useMutation({
        mutationFn: async (data: Criteria) => {
            const AxiosRest = await Axios.post(`https://spkbe-production.up.railway.app/kriteria`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        },
    })
}
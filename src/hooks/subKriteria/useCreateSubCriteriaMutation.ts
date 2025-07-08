import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { subCriteria } from "./useGetSubCriteriaMutation";

export const useCreateSubCriteriaMutation = () => {
    return useMutation({
        mutationFn: async (data: subCriteria) => {
            const AxiosRest = await Axios.post(`https://spkbe-production.up.railway.app//subkriteria`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        },
    })
}

import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { Jenis } from "./useGetJenisQuery";

export const useUpdateJenisMutation = () => {
    return useMutation({
        mutationFn: async (data: Jenis) => {
            const AxiosRest = await Axios.put(`https://spkbe-production.up.railway.app//jenis/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        },
    })
}

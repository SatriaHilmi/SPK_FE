import { useMutation } from "@tanstack/react-query";
import Axios from "axios";

export const useDeleteSubCriteriaMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const AxiosRest = await Axios.delete(`https://spkbe-production.up.railway.app//subkriteria/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return AxiosRest.data;
        },
    });
};
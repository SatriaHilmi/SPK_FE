import { useMutation } from "@tanstack/react-query";
import Axios from "axios";

export const useDeleteJenisMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const AxiosRest = await Axios.delete(`https://spkbe-production.up.railway.app//jenis/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return AxiosRest.data;
        },
    });
};
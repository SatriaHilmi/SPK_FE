import { useMutation } from "@tanstack/react-query";
import Axios from "axios";

export const useDeleteJenisMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const AxiosRest = await Axios.delete(`http://localhost:3000/jenis/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return AxiosRest.data;
        },
    });
};
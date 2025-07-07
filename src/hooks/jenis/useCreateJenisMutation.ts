import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { Jenis } from "./useGetJenisQuery";

export const useCreateJenisMutation = () => {
    return useMutation({
        mutationFn: async (data: Jenis) => {
            const AxiosRest = await Axios.post("http://localhost:3000/jenis", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return AxiosRest.data;
        },
    });
};
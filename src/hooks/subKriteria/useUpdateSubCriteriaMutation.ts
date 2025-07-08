import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
// import { subCriteria } from "./useGetSubCriteriaMutation";

export const useUpdateSubCriteriaMutation = () => {
    return useMutation({
        mutationFn: async (data: {
            id: string;
            alternatif: string;
            codeId: string;
            namaId: string;
            nilai: number;
        }) => {
            const AxiosRest = await Axios.put(`https://spkbe-production.up.railway.app//subkriteria/${data.id}`, {
                alternatif: data.alternatif,
                codeId: data.codeId,
                namaId: data.namaId,
                nilai: data.nilai
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return AxiosRest.data;
        },
    });
};

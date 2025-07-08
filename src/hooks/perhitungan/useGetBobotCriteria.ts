import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export interface ResponseBobot {
    code: string;
    weight: number;
}

export const useGetBobotCriteria = () => {
    return useQuery({
        queryKey: ["bobot"],
        queryFn: async () => {
            const AxiosRest = await Axios.get<ResponseBobot[]>('https://spkbe-production.up.railway.app/perhitungan/bobot', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            return AxiosRest.data
        }
    });
}
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
// import { ResponseProfile } from "./useGetProfile";

interface ResponseProfile {
    id: string;
    email: string;
    username: string;
    name: string;
    password: string;
    role: string;
    photo: string | null;
}

export const useGetPhotoProfile = () => {
    return useQuery({
        queryKey: ['profile-data'],
        queryFn: async () => {
            const res = await Axios.get<ResponseProfile>(`https://spkbe-production.up.railway.app//profil`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data;
        }
    });
}
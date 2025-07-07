import { useMutation } from "@tanstack/react-query";
import Axios from "axios";

export const useDeletePhoto = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await Axios.delete(`http://localhost:3000/profil`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return res.data;
        }
    });
    // const deletePhoto = async (photo: string) => {
    //     const res = await Axios.delete(`http://localhost:3000/profil`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //         data: {
    //             photoUrl: photo,
    //         },
    //     });
    //     return res.data;
    // };

    // return { deletePhoto };
}
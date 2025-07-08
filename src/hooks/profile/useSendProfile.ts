// import { useQuery } from "@tanstack/react-query";
// import Axios from "axios";
// import { uploadImage } from "../../../utils/fileHelper";
import { useState } from "react";
import axios from "axios";
import ImageKit from "imagekit";
// import { set } from "react-hook-form";
import { useGetPhotoProfile } from "./useGetPhotoProfile";

const imagekit = new ImageKit({
    publicKey: "public_RmKp21ZgG7WNLMPCN8UD2p5M71s=",
    privateKey: "private_vsRMGE9/bdaJYThbHlWC13/mZHc=",
    urlEndpoint: "https://ik.imagekit.io/zfdqveuqb"
});

type Base64URLString = string;

export const useSendProfile = () => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { refetch } = useGetPhotoProfile()

    const AsyncCall = async (file: Base64URLString, fileName: string, format: string) => {
        setIsLoading(true)
        // try {
        //     const result = uploadImage(file, fileName, format as "jpg");
        //     if (!result) return
        //     const imageUrl = result?.url;
        //     console.log("imageUrl", imageUrl);
        //     if (!imageUrl) return
        //     const response = await axios.post(`https://spkbe-production.up.railway.app/profil`, {

        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("token")}`,
        //             "Content-Type": "application/json",
        //         },
        //         imageUrl: imageUrl,
        //     });

        //     if (response.status === 200) {
        //         const responseData = await response.data;
        //         setData(responseData)
        //     } else {
        //         const errorData = await response.data
        //         setError(errorData);
        //     }
        // } catch (error) {
        //     console.error("Error uploading image:", error);
        // }
        imagekit.upload(
            {
                file: file, //required
                fileName: `${fileName}.${format}`
            },
            function (error, result) {
                if (error) {
                    //@ts-ignore
                    setError(error);
                }
                else {
                    //@ts-ignore
                    setData(result);
                    if (result?.url) {
                        try {

                            const axiosResponse = axios.post(`https://spkbe-production.up.railway.app/profil`, { imageUrl: result.url }, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    "Content-Type": "application/json",
                                }

                            })
                            //@ts-ignore
                            setData((prev) => ({ ...prev, ...axiosResponse.data }))
                            refetch()
                        } catch (error: any) {
                            setError(error)
                            setIsLoading(false)
                        } finally {
                            setIsLoading(false)
                        }
                    }

                }
            });
    }

    return { AsyncCall, data, error, isLoading }
}

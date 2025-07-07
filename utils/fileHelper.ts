
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: "public_RmKp21ZgG7WNLMPCN8UD2p5M71s=",
    privateKey: "private_vsRMGE9/bdaJYThbHlWC13/mZHc=",
    urlEndpoint: "https://ik.imagekit.io/zfdqveuqb"
});

export const uploadImage = (file: Base64URLString, fileName: string, format: 'jpg' | 'png') => {
    let response = null;
    imagekit.upload(
        {
            file: file, //required
            fileName: `${fileName}.${format}`
        },
        function (error, result) {
            if (error) {
                response = error;
                console.log("error", error);
            }
            else {
                response = result;
                console.log("response", response);
            }
        });
    return response;

}

// export const toBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = (error) => reject(error);
//     });
// }
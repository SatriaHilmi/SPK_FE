import { useSendProfile } from '../../hooks/profile/useSendProfile';
import { useState } from 'react';
import { useGetPhotoProfile } from '../../hooks/profile/useGetPhotoProfile';
import { useDeletePhoto } from '../../hooks/profile/useDeletePhoto';

export const Profile = () => {
    const [image, setImage] = useState<File | null>(null);
    const [] = useState('');
    const [fileId, setFileId] = useState('');
    const { AsyncCall, isLoading: isLoadingUpload } = useSendProfile();
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const { data: dataProfile, refetch, isLoading: isLoadingProfile } = useGetPhotoProfile()
    const { mutateAsync } = useDeletePhoto();

    // const { deletePhoto } = useDeletePhoto()
    // console.log("dataProfile", dataProfile);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // console.log("previewUrl", previewUrl);
    // console.log("data", data);

    const handleUpload = async () => {
        if (image) {
            let format = null;
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                format = image.name.split('.').pop() as string;
                reader.readAsDataURL(image);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });

            if (!format) return

            await AsyncCall(base64, dataProfile?.id + (new Date).toDateString(), format);
            setFileId(fileId);
            refetch();
        }
    };

    const handleDelete = async () => {
        if (dataProfile?.photo) {
            await mutateAsync()
            refetch()
            // try {
            //     await mutateAsync(dataProfile?.photo as string)
            //     refetch()
            // } catch (error) {
            //     console.error("Error deleting photo:", error);
            // }
        }
    }



    return (
        <div className="p-6 border rounded mx-auto max-w-md text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{dataProfile?.name}</h2>
            <div className="justify-items-center">
                {isLoadingUpload || isLoadingProfile ? <p>Loading...</p> : (
                    <img src={previewUrl ? previewUrl : dataProfile?.photo ?? ''} alt={dataProfile?.name}
                        className="w-48 h-48 rounded-full border-4 border-gray-400 object-cover mx-auto mb-4" />
                )}
                <input type="file" accept='image' onChange={(e) => {
                    setImage(e.target.files?.[0] || null)
                    handleImageChange(e)
                }} />
                {/* <button onClick={() => setPreviewUrl(URL.createObjectURL(image!))} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Preview
                </button> */}
            </div>
            <div className="mt-3 mb-2" aria-disabled={true}>
                <div className="font-semibold">{dataProfile?.username}</div>
                <div className="text-gray-500">{dataProfile?.email}</div>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <button onClick={handleUpload} className="bg-blue-500 px-2 my-3 rounded py-1 text-white hover:bg-blue-600">Upload</button>
                <button onClick={handleDelete} className=" flex bg-red-500 px-2 my-3 rounded py-1 text-white hover:bg-red-600">Delete</button>
            </div>
        </div>
    );
};

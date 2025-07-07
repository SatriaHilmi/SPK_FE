import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Jenis, useGetJenisQuery } from "../hooks/jenis/useGetJenisQuery";
import { useCreateJenisMutation } from "../hooks/jenis/useCreateJenisMutation";

interface tambahDataJenisProps {
    onClick: () => void;
    refetch?: () => void;
}

export const TambahDataJenis: React.FC<tambahDataJenisProps> = ({ onClick }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Jenis>();
    const { mutateAsync } = useCreateJenisMutation();
    const { refetch } = useGetJenisQuery();
    const onSubmit = async (data: Jenis) => {
        try {
            await mutateAsync(data);
            reset();
            refetch();
            onClick();
        } catch (error) {
            console.error("Error creating jenis:", error);
        }
    };
    return (
        <>
            <div className="w-full px-6">
                <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-700">Data Jenis Alat Musik</h2>
                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mb-2" onClick={onClick}>
                            Kembali
                        </button>
                    </div>

                    <p className="text-blue-600 font-semibold mb-4 flex items-center">
                        <span className="mr-2"><FaPlus /></span> Tambah Data Jenis Alat Musik
                    </p>

                    {/* Form dengan tata letak horizontal */}
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Nama Jenis Alat Musik</label>
                            <input type="text" {...register("nama", { required: "data tidak boleh kosong" })} className="w-full border border-gray-500 rounded-lg p-3" />
                            {errors.nama && <span className="text-red-500">{errors.nama.message}</span>}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="submit" className="bg-green-500 px-6 py-3 text-white hover:bg-green-600 rounded-lg flex items-center">
                                <span>Simpan</span>
                            </button>
                            <button type="reset" className="bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 rounded-lg flex items-center" onClick={() => reset()}>
                                <span>Reset</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
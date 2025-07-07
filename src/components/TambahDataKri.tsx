import { SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { useCreateCriteriaMutation } from "../hooks/criteria/useCreateCriteriaMutation";
import { Criteria, useGetCriteriaQuery } from "../hooks/criteria/useGetCriteriaQuery";

interface FormKriteriaProps {
    onClick: () => void;
}

export const TambahDataKri: React.FC<FormKriteriaProps> = ({ onClick }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<Criteria>();
    const { mutateAsync } = useCreateCriteriaMutation();
    const { refetch } = useGetCriteriaQuery();
    const onSubmit: SubmitHandler<Criteria> = async (data) => {
        try {
            await mutateAsync({ ...data, weight: Number(data.weight) }); // weight is a number
            reset();
            refetch();
            onClick();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-full p-6">
            <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700">Data Kriteria</h2>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mb-2" onClick={onClick}>
                        Kembali
                    </button>
                </div>

                <p className="text-blue-600 font-semibold mb-4 flex items-center">
                    <span className="mr-2"><FaPlus /></span> Tambah Data Kriteria
                </p>

                {/* Form dengan tata letak horizontal */}
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        {/* Kode Kriteria */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Kode Kriteria</label>
                            <input type="text" {...register("code", { required: "Kode tidak boleh kosong!" })} className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Kode" />
                            {errors.code && <span className="text-red-500">{errors.code.message}</span>}
                        </div>

                        {/* Nama Kriteria */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Nama Kriteria</label>
                            <input type="text" {...register("name", { required: "Nama tidak boleh kosong!" })} className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Status" />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>

                        {/* Bobot Kriteria */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Bobot Kriteria</label>
                            <input type="number" {...register("weight")} className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Masukkan bobot kriteria" />
                            {errors.weight && <span className="text-red-500">Bobot tidak boleh kosong!</span>}
                        </div>

                        {/* Jenis Kriteria */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Jenis Kriteria</label>
                            <select {...register("criteria", { required: "Criteria wajib diisi!" })} className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                <option value="">--Pilih Jenis Kriteria--</option>
                                <option value="BENEFIT">Benefit</option>
                                <option value="COST">Cost</option>
                            </select>
                        </div>
                    </div>

                    {/* Tombol Simpan & Reset */}
                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center">
                            <MdSaveAlt className="mr-1" /> <span>Simpan</span>
                        </button>
                        <button type="reset" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center" onClick={() => reset()}>
                            <BiReset className="mr-1" /> <span>Reset</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
import { useForm } from "react-hook-form";
import { Jenis, useGetJenisQuery } from "../hooks/jenis/useGetJenisQuery";
import { useUpdateJenisMutation } from "../hooks/jenis/useUpdateJenisMutation";
import React from "react";

interface FormEditJenisProps {
    onClickClose: () => void;
    data: Jenis;
}

export const FormEditJenis: React.FC<FormEditJenisProps> = ({ onClickClose, data }) => {
    const { mutateAsync } = useUpdateJenisMutation();
    const { refetch } = useGetJenisQuery();
    const { register, formState: { errors }, handleSubmit } = useForm<Jenis>({ values: data });

    const submit = async (data: Jenis) => {
        try {
            await mutateAsync({ ...data, id: data.id });
            refetch();
            onClickClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Nama Jenis Alat Musik</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Nama Jenis" {...register('nama', { required: 'Nama tidak boleh kosong!' })} />
                    {errors.nama && <span className="text-red-500">{errors.nama.message}</span>}
                </div>
            </div>
            <div className="gap-3 flex justify-end">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Simpan
                </button>
                <button type="reset" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Reset
                </button>
            </div>
        </form>
    );
}
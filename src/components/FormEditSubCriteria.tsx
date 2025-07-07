import { useForm } from "react-hook-form";
import { useUpdateSubCriteriaMutation, } from "../hooks/subKriteria/useUpdateSubCriteriaMutation";
import { useGetSubCriteriaQuery } from "../hooks/subKriteria/useGetSubCriteriaMutation"; // Perbaikan import
import { BiExit } from "react-icons/bi";
import { MdSaveAlt } from "react-icons/md";
import { useEffect, useMemo } from "react";
import { useGetJenisQuery } from "../hooks/jenis/useGetJenisQuery";

interface FormEditSubCriteriaProps {
    onClickClose: () => void;
    subKey: string
}

interface FormValues {
    alternatif: string;
    value: string;
    namaId: string;
    nilai: number;
    id: string
}

export const FormEditSubCriteria: React.FC<FormEditSubCriteriaProps> = ({ subKey, onClickClose }) => {
    const { mutateAsync } = useUpdateSubCriteriaMutation();
    const { refetch, data } = useGetSubCriteriaQuery();
    const { data: jenisData } = useGetJenisQuery();

    const dataMemo = useMemo(() => {
        if (!data || !subKey) return [];
        return data?.filter(item => item.alternatif === subKey);
    }, [data, subKey]);


    const { register, handleSubmit, reset, watch, setValue, setError, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            alternatif: subKey,
            value: '',
            nilai: 0,
        },
    });

    const selectedCode = watch('value');

    useEffect(() => {
        const selectedItem = dataMemo.find(item => item.codeId === selectedCode);
        if (selectedItem) {
            setValue("nilai", selectedItem.nilai);
            setValue("id", selectedItem.id);
        } else {
            setValue("nilai", 0)
            setValue("id", '')
        };
    }, [selectedCode, dataMemo, setValue]);

    const onSubmit = async (formData: FormValues) => {
        try {
            const oldData = dataMemo.find(item => item.id === formData.id);
            const isAlterNatifeNoChange = formData.alternatif === subKey;
            const isNoChange = formData.nilai === oldData?.nilai || formData.nilai === 0;
            const isJenisNoChange = formData.namaId === oldData?.namaId;
            const isCodeNoChange = isNoChange && isAlterNatifeNoChange && isJenisNoChange;
            if (isCodeNoChange) {
                setError('alternatif', {
                    type: 'manual',
                    message: 'Tidak ada perubahan data'
                });
                setError('nilai', {
                    type: 'manual',
                    message: 'Tidak ada perubahan data'
                });
                return
            }

            if (!isNoChange && !isAlterNatifeNoChange) {
                console.log('nyantol boos')
                await mutateAsync({ alternatif: formData.alternatif, codeId: formData.value, nilai: formData.nilai, id: formData.id, namaId: formData.namaId });
                reset();
                refetch();
                onClickClose();
            } else if (!isAlterNatifeNoChange && isNoChange) {
                await Promise.all(dataMemo.map(async (item) => {
                    await mutateAsync({ alternatif: formData.alternatif, codeId: item.codeId, nilai: item.nilai, id: item.id, namaId: item.namaId });
                }))
                reset();
                refetch();
                onClickClose();
            } else {
                await mutateAsync({ alternatif: formData.alternatif, codeId: formData.value, nilai: formData.nilai, id: formData.id, namaId: formData.namaId });
                reset();
                refetch();
                onClickClose();
            }
        } catch (error) {
            console.log("Error creating item:", error);
        }


    };

    useEffect(() => {
        reset({
            alternatif: subKey,
        })
    }, [subKey])


    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3 mb-3">
                <div className="flex-1 min-w-[200px]">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Nama Alternatif</label>
                    <input
                        type="text"
                        className={"w-full p-3 border border-gray-500 rounded-lg"} placeholder="Nama Alternatif"
                        {...register("alternatif", { required: "Nama alternatif wajib diisi" })}
                    />
                    <div className="flex-1 min-w-[200px] my-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Jenis</label>
                        <select className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500"
                            {...register("namaId", { required: "Jenis alat musik wajib dipilih" })}>
                            <option value="">-- Pilih Jenis --</option>
                            {jenisData?.map((jenis, index) => (
                                <option key={index} value={jenis.nama}>{jenis.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px] my-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Kode Criteria</label>
                        <select className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500" {...register("value")}>
                            <option value="" className="text-gray-500">-Select Code-</option>
                            {dataMemo.map((item, index) => (
                                <option key={index} value={item.codeId}>{item.codeId}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px] my-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Nilai Sub-Criteria</label>
                        <input
                            type="number"
                            className={"w-full p-3 border border-gray-500 rounded-lg disabled:cursor-not-allowed"} placeholder="Nilai Alternatif"
                            {...register("nilai", { required: "Nilai alternatif wajib diisi", valueAsNumber: true, disabled: selectedCode === '' })}
                        />
                    </div>
                    <span>{errors.alternatif && errors.alternatif.message || errors.nilai && errors.nilai.message}</span>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center">
                    <MdSaveAlt className="mr-1" /> Simpan
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center"
                    onClick={onClickClose}
                >
                    <BiExit className="mr-1" /> Close
                </button>
            </div>
        </form>
    );
};
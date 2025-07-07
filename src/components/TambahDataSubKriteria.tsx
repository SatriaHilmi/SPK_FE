import { BiReset } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { useGetCriteriaQuery } from "../hooks/criteria/useGetCriteriaQuery";
import { useCreateSubCriteriaMutation } from "../hooks/subKriteria/useCreateSubCriteriaMutation";
import { subCriteria } from "../hooks/subKriteria/useGetSubCriteriaMutation";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { useGetJenisQuery } from "../hooks/jenis/useGetJenisQuery";

interface TambahDataSubKriteriaProps {
    onClick: () => void;
}

interface FormValues {
    alternatif: string;
    namaId: string;
    subKriteria: subCriteria[];
}

export const TambahDataSubKriteria: React.FC<TambahDataSubKriteriaProps> = ({ onClick }) => {
    const { data } = useGetCriteriaQuery();
    const { mutateAsync } = useCreateSubCriteriaMutation();
    const { refetch } = useGetCriteriaQuery();
    const { data: jenisData } = useGetJenisQuery();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            subKriteria: [{ codeId: "", nilai: 0 }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "subKriteria"
    });

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        console.log(formData);
        try {
            for (const subKriteria of formData.subKriteria) {
                await mutateAsync({ ...subKriteria, alternatif: formData.alternatif, nilai: subKriteria.nilai, namaId: formData.namaId });
            }
            reset();
            refetch();
        } catch (error) {
            console.log("Error creating item:", error);
        }
    };

    return (
        <div className="w-full p-6 max-h-screen overflow-y-auto">
            <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700">Data Sub-Kriteria & Alternatif</h2>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mb-2" onClick={onClick}>
                        Kembali
                    </button>
                </div>

                <p className="text-blue-600 font-semibold mb-4 flex items-center">
                    <span className="mr-2"><FaPlus /></span> Tambah Data Sub-Kriteria & Alternatif
                </p>

                {/* Form dengan tata letak horizontal */}
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-3 mb-3">
                        {/* Nama Alternatif */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Nama Alternatif</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nama Alternatif"
                                {...register("alternatif", { required: "Nama Alternatif is required" })}
                            />
                            {errors.alternatif && <span className="text-red-500">{errors.alternatif.message}</span>}
                        </div>

                        {/* Jenis Alat Musik */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Jenis Alat Musik</label>
                            <select className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500" {...register("namaId", { required: "Jenis wajib dipilih" })}>
                                <option value="">-- Pilih Jenis --</option>
                                {jenisData?.map(jenis => (
                                    <option key={jenis.id} value={jenis.nama}>{jenis.nama}</option>
                                ))}
                            </select>
                            {errors.namaId && <span className="text-red-500">{errors.namaId.message}</span>}
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 gap-3 mb-3">
                                {/* Code Kriteria */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Kode Criteria</label>
                                    <select
                                        className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        {...register(`subKriteria.${index}.codeId`, { required: "Kode Criteria is required" })}
                                    >
                                        <option value="" className="text-gray-500">-Select Code-</option>
                                        {data?.map(e => (<option key={e.id} value={e.code}>{e.code}</option>))}
                                    </select>
                                    {errors.subKriteria?.[index]?.codeId && <span className="text-red-500">{errors.subKriteria[index].codeId.message}</span>}
                                </div>

                                {/* Nilai Kriteria */}
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Nilai</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Masukkan bobot kriteria"
                                        {...register(`subKriteria.${index}.nilai`, { required: "Nilai is required" })}
                                    />
                                    {errors.subKriteria?.[index]?.nilai && <span className="text-red-500">{errors.subKriteria[index].nilai.message}</span>}
                                </div>

                                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={() => remove(index)}>
                                    Hapus
                                </button>
                            </div>
                        ))}

                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => append({
                            codeId: "", nilai: 0, alternatif: "", id: "", subKriteria: [{ codeId: "", nilai: 0 }], jenis: { nama: "" }, namaId: ""
                        })}>
                            Tambah Kriteria
                        </button>
                    </div>

                    {/* Tombol Simpan & Reset */}
                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center">
                            <MdSaveAlt className="mr-1" /> <span>Simpan</span>
                        </button>
                        <button type="button" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center" onClick={() => reset()}>
                            <BiReset className="mr-1" /> <span>Reset</span>
                        </button>
                    </div>

                    <div className="mt-3">
                        <div className="text-sm text-gray-500 font-semibold">
                            <span className="text-red-500">*</span> Keterangan
                        </div>
                        <div className="text-sm text-gray-500">
                            <h3>Kriteria Harga Guitar</h3>
                            <p>100 = &lt; 2.000.000,
                                75 = 2.000.000 - 2.999.999,
                                50 = 3.000.000 - 3.999.999,
                                25 = &gt; 4.000.000
                            </p><br />
                            <h3>Kriteria Harga Drum</h3>
                            <p>
                                100 = &lt; 8.000.000,
                                75 = 8.000.000 - 8.999.999,
                                50 = 9.000.000 - 9.999.999,
                                25 = &gt; 10.000.000
                            </p><br />
                            <h3>Kriteria Harga Keyboard</h3>
                            <p>
                                100 = &lt; 6.000.000,
                                75 = 6.000.000 - 6.999.999,
                                50 = 7.000.000 - 7.999.999,
                                25 = &gt; 8.000.000
                            </p><br />
                            <h3>Kriteria Harga Bass</h3>
                            <p>
                                100 = &lt; 3.000.000,
                                75 = 3.000.000 - 3.999.999,
                                50 = 4.000.000 - 4.999.999,
                                25 = &gt; 5.000.000
                            </p><br />
                            <h3>Kriteria Harga Biola</h3>
                            <p>
                                100 = &lt; 1.000.000,
                                75 = 1.000.000 - 1.999.999,
                                50 = 2.000.000 - 2.999.999,
                                25 = &gt; 3.000.000
                            </p>
                            <br />
                            <h3>Kriteria Kebutuhan</h3>
                            <p>25 = Jazz,
                                50 = Blues,
                                75 = Rock,
                                100 = Pop
                            </p>
                            <br />
                            <h3>Kriteria Kualitas</h3>
                            <p>25 = Kurang Bagus,
                                50 = Biasa,
                                75 = Bagus,
                                100 = Sangat Bagus
                            </p>
                            <br />
                            <h3>Kriteria Visual</h3>
                            <p>25 = Kurang Menarik,
                                50 = Biasa,
                                75 = Menarik,
                                100 = Sangat Menarik
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
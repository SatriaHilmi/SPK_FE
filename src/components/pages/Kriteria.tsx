import { useState } from "react";
import { TambahDataKri } from "../TambahDataKri";
import { Criteria, useGetCriteriaQuery } from "../../hooks/criteria/useGetCriteriaQuery";
import { Spinner } from "../LoadingButton";
import { useCriteriaMutation } from "../../hooks/criteria/useDeleteCriteriaMutation";
import { EditCriteria } from "../EditCriteria";
import { FormEditKriteria } from "../FormEditKriteria";

export const Kriteria = () => {
    const [criteria, setEditCriteria] = useState<Criteria | null>(null);
    const [list, setlist] = useState(true);
    const { data, isLoading, refetch } = useGetCriteriaQuery()
    const { mutateAsync, isPending } = useCriteriaMutation()
    const handleDelete = async (id: string) => {
        await mutateAsync(id)
        refetch()
    }
    return (
        <>
            {/* PopUp Section */}
            {list ? (
                <div className="w-full px-6">
                    {/* Main Section */}
                    <EditCriteria onClickClose={() => setEditCriteria(null)} isOpen={criteria ? true : false} title="Edit Kriteria">
                        <FormEditKriteria onClickClose={() => setEditCriteria(null)} data={criteria!}></FormEditKriteria>
                    </EditCriteria>
                    <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-700">Data kriteria</h2>
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mb-2" onClick={() => setlist(false)}>
                                Tambah Data
                            </button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            <table className="border border-collapse border-gray-500 w-full">
                                <thead className="sticky top-0 bg-yellow-300 text-black">
                                    <tr>
                                        <th className="border border-gray-500">
                                            No.
                                        </th>
                                        <th className="border border-gray-500">
                                            Kode Kriteria
                                        </th>
                                        <th className="border border-gray-500">
                                            Nama Kriteria
                                        </th>
                                        <th className="border border-gray-500">
                                            Bobot
                                        </th>
                                        <th className="border border-gray-500">
                                            Jenis
                                        </th>
                                        <th className="border border-gray-500">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {data?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-500">{index + 1}</td>
                                            <td className="border border-gray-500">{item.code}</td>
                                            <td className="border border-gray-500">{item.name}</td>
                                            <td className="border border-gray-500">{item.weight}</td>
                                            <td className="border border-gray-500">{item.criteria}</td>
                                            <td className="border border-gray-500 py-2">
                                                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => setEditCriteria(item)}>
                                                    {isLoading || isPending && <Spinner />}
                                                    Edit
                                                </button>
                                                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(item.id)}>
                                                    {isLoading || isPending && <Spinner />}
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <TambahDataKri onClick={() => setlist(true)} />
            )}
        </>
    );
};



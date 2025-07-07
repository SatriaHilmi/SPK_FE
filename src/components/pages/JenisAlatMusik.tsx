import { useState } from "react"
import { TambahDataJenis } from "../TambahDataJenis"
import { Jenis, useGetJenisQuery } from "../../hooks/jenis/useGetJenisQuery"
import { EditCriteria } from "../EditCriteria"
import { FormEditJenis } from "../FormEditJenis"
import { useDeleteJenisMutation } from "../../hooks/jenis/useDeleteJenisMutation"

export const JenisAlatMusik = () => {
    const [edit, setEditCriteria] = useState<Jenis | null>(null);
    const [list, setlist] = useState(true);
    const { data, isLoading, refetch } = useGetJenisQuery()
    const { mutateAsync } = useDeleteJenisMutation()
    const handleDelete = async (id: string) => {
        await mutateAsync(id)
        refetch()
    }
    if (isLoading) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Loading data...
            </div>
        )
    }

    return (
        <>
            {list ? (
                <div className="w-full px-6">
                    <EditCriteria onClickClose={() => setEditCriteria(null)} isOpen={edit ? true : false} title="Edit Jenis Alat Musik">
                        <FormEditJenis onClickClose={() => setEditCriteria(null)} data={edit!}></FormEditJenis>
                    </EditCriteria>
                    <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-700">Data Jenis Alat Musik</h2>
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mb-2" onClick={() => setlist(!true)}>
                                Tambah Data
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <table className="border border-collapse border-gray-500 w-full">
                                <thead>
                                    <tr className="bg-yellow-300 text-black">
                                        <th className="border border-gray-500">
                                            No
                                        </th>
                                        <th className="border border-gray-500">
                                            Jenis Alat Musik
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
                                            <td className="border border-gray-500">{item.nama}</td>
                                            <td className="border border-gray-500 py-2">
                                                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => setEditCriteria(item)}>
                                                    {/* {isLoading || isPending && <Spinner />} */}
                                                    Edit
                                                </button>
                                                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(item.id)}>
                                                    {/* {isLoading || isPending && <Spinner />} */}
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
            ) : (<TambahDataJenis onClick={() => setlist(true)} refetch={refetch} />
            )}
        </>
    )
}
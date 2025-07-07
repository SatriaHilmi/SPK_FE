import { useMemo, useState } from "react";
import { TambahDataSubKriteria } from "../TambahDataSubKriteria";
import { subCriteria, useGetSubCriteriaQuery } from "../../hooks/subKriteria/useGetSubCriteriaMutation";
// import { Alternatif } from "./Alternatif";
import { useGetCriteriaQuery } from "../../hooks/criteria/useGetCriteriaQuery";
import { useDeleteSubCriteriaMutation } from "../../hooks/subKriteria/useDeleteSubCriteriaMutation";
import { EditSubCriteria } from "../EditSubCriteria";
import { FormEditSubCriteria } from "../FormEditSubCriteria";
// import { it } from "node:test";
// import { string } from "joi";

interface EditSubCriteria {
    [key: string]: { value: number; id: string; }
}

export const DataSubKriteria = () => {

    const [list, setlist] = useState(true);
    const { data, refetch } = useGetSubCriteriaQuery()
    const { data: criteriaData } = useGetCriteriaQuery();
    const { mutateAsync } = useDeleteSubCriteriaMutation()
    const handleDelete = async (alternatifName: string) => {
        const subCriteriaId = data?.filter(item => item.alternatif === alternatifName).map(item => item.id);
        if (subCriteriaId && subCriteriaId.length > 0) {
            await Promise.all(subCriteriaId.map(id => mutateAsync(id)));
            refetch();
        } else {
            console.error("Sub Criteria not found");
        }
    }

    const groupDataByAlternatif = (data: subCriteria[]) => {
        // i need group all sub criteria by alternatif name
        const groupedCriteriaByAlternatifName: { [key: string]: { [key: string]: { value: number, id: string }, } } = {};
        data.forEach((item) => {
            if (!groupedCriteriaByAlternatifName[item.alternatif]) {
                groupedCriteriaByAlternatifName[item.alternatif] = {};
            }
            groupedCriteriaByAlternatifName[item.alternatif][item.codeId] = { value: item.nilai, id: item.id };
        });
        return groupedCriteriaByAlternatifName;
    }

    const groupedData = useMemo(() => groupDataByAlternatif(data || []), [data]);

    const [subCriteria, setEditSubCriteria] = useState<string>('');
    return (
        <>
            {list ? (
                <div className="w-full px-6">
                    <EditSubCriteria onClickClose={() => setEditSubCriteria('')} isOpen={subCriteria ? true : false} title="Edit Sub-Kriteria">
                        <FormEditSubCriteria onClickClose={() => setEditSubCriteria('')} subKey={subCriteria} />
                    </EditSubCriteria>
                    <div className="justify-center h-screen overflow-y-auto w-full py-5">
                        <div className="flex flex-col gap-4">
                            <div className="w-full p-8  bg-white border border-gray-200 rounded-lg shadow-md mb-4">
                                <div className="flex items-center just mb-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">Data Sub-Kriteria & Alternatif</h2>
                                </div>
                                <div className="flex justify-between items-end mb-2">
                                    <h4 className="text-xl font-semibold text-gray-700">Alternatif Guitar</h4>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2" onClick={() => setlist(false)}>Tambah Data</button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    <table className="border border-collapse border-gray-500 w-full">
                                        <thead className="sticky top-0 bg-yellow-300 text-black">
                                            <tr>
                                                <th className="border border-gray-500">
                                                    No
                                                </th>
                                                <th className="border border-gray-500">
                                                    Nama Alternatif
                                                </th>
                                                <th className="border border-gray-500">
                                                    Jenis
                                                </th>
                                                {criteriaData?.map((item) => (
                                                    <th key={item.id} className="border border-gray-500">
                                                        {item.code}
                                                    </th>
                                                ))}
                                                <th className="border border-gray-500">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {Object.keys(groupedData).map((alternatif, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border border-gray-500">{index + 1}</td>
                                                        <td className="border border-gray-500">{alternatif}</td>
                                                        <td className="border border-gray-500">
                                                            {data?.find(item => item.alternatif === alternatif)?.namaId || "-"}
                                                        </td>
                                                        {
                                                            criteriaData?.map((item, index) => (
                                                                // <td key={index} className="border border-gray-500">{groupedData[alternatif][item.code] ? groupedData[alternatif][item.code] : "-"}</td>
                                                                <td key={index} className="border border-gray-500">{groupedData[alternatif][item.code]?.value || "-"}</td>
                                                            ))
                                                        }
                                                        <td className="border border-gray-500 py-2">
                                                            <button className="focus:outline-none bg-yellow-500 text-white px-4 py-2 me-2 mb-2 rounded-lg font-medium text-sm focus:ring-4 hover:bg-yellow-600 dark:focus:ring-yellow-900"
                                                                onClick={() => setEditSubCriteria(alternatif)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="focus:outline-none bg-red-700 text-white px-4 py-2 me-2 mb-2 rounded-lg font-medium text-sm focus:ring-4 hover:bg-red-800 dark:focus:ring-red-900" onClick={() => handleDelete(alternatif)}>
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div className="w-full p-8  bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">Data Alternatif Guitar</h2>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2" onClick={() => setlist(false)}>Tambah Data</button>
                                </div>
                            </div>

                            <div className="w-full p-8  bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">Data Alternatif Drum</h2>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2" onClick={() => setlist(false)}>Tambah Data</button>
                                </div>
                            </div>

                            <div className="w-full p-8  bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">Data Alternatif Keyboard</h2>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2" onClick={() => setlist(false)}>Tambah Data</button>
                                </div>
                            </div>

                            <div className="w-full p-8  bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">Data Alternatif Bass</h2>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2" onClick={() => setlist(false)}>Tambah Data</button>
                                </div>
                            </div>

                            <div className="w-full p-8  bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4 border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">Data Alternatif Biola</h2>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2" onClick={() => setlist(false)}>Tambah Data</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            ) : (<TambahDataSubKriteria onClick={() => setlist(true)} />
            )}
        </>
    );
};
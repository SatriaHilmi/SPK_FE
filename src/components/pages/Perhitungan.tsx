import { BobotKriteria } from "../BobotKriteria";
import { NilaiUtility } from "../NilaiUtility";
import { NormalisasiBobot } from "../NormalisasiBobot";
import { PerhitunganNilai } from "../PerhitunganNilai";
import { useGetDataMatrix } from "../../hooks/perhitungan/useGetDataMatrix";

export const Perhitungan = () => {
    const { data, isLoading, isError } = useGetDataMatrix();
    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center">Error loading data</div>;
    return (
        <>
            <div className="w-full overflow-y-auto h-screen px-6 py-5">
                <div className="flex flex-col gap-4 pb-5">
                    {data?.matrixPerJenis.map((group, idx) => (
                        <div key={idx} className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                            <div className="mb-4 border-b">
                                <h2 className="text-xl font-semibold text-blue-400">
                                    Matrix Keputusan - {group.jenis}
                                </h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <table className="border border-collapse border-gray-500 w-full">
                                    <thead>
                                        <tr className="bg-yellow-300 text-black">
                                            <th className="border border-gray-500">No</th>
                                            <th className="border border-gray-500">Alternatif</th>
                                            {data?.dataHeader.map((header, index) => (
                                                <th key={index} className="border border-gray-500">{header.code}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {group.dataTable.map((item, i) => (
                                            <tr key={i}>
                                                <td className="border border-gray-500">{i + 1}</td>
                                                <td className="border border-gray-500">{item.alternatif}</td>
                                                {item.criteria.map((c, ci) => (
                                                    <td key={ci} className="border border-gray-500">{c.nilai}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                    <BobotKriteria />
                    <NormalisasiBobot />
                    <NilaiUtility />
                    <PerhitunganNilai />
                </div>
            </div>
        </>
    );
}
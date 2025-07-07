import { useGetUtility } from "../hooks/perhitungan/useGetUtility";

export const NilaiUtility = () => {
    const { data, isLoading, isError } = useGetUtility();
    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center">Error loading data</div>;

    return (
        <>
            {data?.matrixPerJenis.map((group, idx) => (
                <div key={idx} className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-blue-400 mb-4">Nilai Utility - {group.jenis}</h2>
                    <div className="max-h-96 overflow-x-auto">
                        <table className="border border-collapse border-gray-500 w-full">
                            <thead>
                                <tr className="bg-yellow-300 text-black">
                                    <th className="border border-gray-500">No</th>
                                    <th className="border border-gray-500">Alternatif</th>
                                    {group.dataHeader.map((header, index) => (
                                        <th key={index} className="border border-gray-500">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {group.dataTable.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-500">{index + 1}</td>
                                        <td className="border border-gray-500">{item.alternatif}</td>
                                        {item.criteria.map((c, ci) => (
                                            <td key={ci} className="border border-gray-500">{c.nilaiUtility.toFixed(2)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </>
    );
};

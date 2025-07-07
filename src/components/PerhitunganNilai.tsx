import { useGetTotal } from "../hooks/perhitungan/useGetTotal";

export const PerhitunganNilai = () => {
    const { data, isLoading, isError } = useGetTotal();

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center">Error loading data</div>;

    return (
        <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-400 mb-4">Perhitungan Total Nilai Setiap Jenis Alat Musik</h2>
            {data?.matrixTotal.map((group, idx) => (
                <div key={idx} className="mb-8">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">{group.jenis}</h3>
                    <table className="border border-collapse border-gray-500 w-full mb-4">
                        <thead>
                            <tr className="bg-yellow-300 text-black">
                                <th className="border border-gray-500">No</th>
                                <th className="border border-gray-500">Alternatif</th>
                                <th className="border border-gray-500">Total Nilai</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {group.data.map((item, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-500">{i + 1}</td>
                                    <td className="border border-gray-500">{item.alternatif}</td>
                                    <td className="border border-gray-500">{item.totalNilai.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};
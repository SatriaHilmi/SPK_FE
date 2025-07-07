import { useGetRanking } from "../../hooks/perhitungan/useGetRanking";

export const HasilAkhir = () => {
    const { data, isLoading, isError } = useGetRanking();
    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center">Error loading data</div>;

    return (
        <div className="w-full overflow-y-auto h-screen px-6 py-5">
            {data?.map((group, i) => (
                <div key={i} className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-blue-400 mb-4">
                        Ranking Alternatif {group.jenis}
                    </h2>
                    <table className="w-full border border-collapse border-gray-500">
                        <thead>
                            <tr className="bg-yellow-300 text-black">
                                <th className="border border-gray-500">No</th>
                                <th className="border border-gray-500">Alternatif</th>
                                {/* <th className="border border-gray-500">Total Nilai</th> */}
                                <th className="border border-gray-500">Ranking</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {group.data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-500">{index + 1}</td>
                                    <td className="border border-gray-500">{item.alternatif}</td>
                                    {/* <td className="border border-gray-500">{item.totalNilai}</td> */}
                                    <td className="border border-gray-500">{item.ranking}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};
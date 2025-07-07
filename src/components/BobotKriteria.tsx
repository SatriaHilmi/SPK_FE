import { useGetBobotCriteria } from "../hooks/perhitungan/useGetBobotCriteria";

export const BobotKriteria = () => {
    const { data, isLoading, isError } = useGetBobotCriteria();
    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError) return <div className="text-center">Error loading data</div>;
    return (
        <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-blue-400">Bobot Kriteria (W)</h2>
                {/* <button className="items-end bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2">Tambah Data</button> */}
            </div>
            <div className="flex justify-center">
                <table className="border border-collapse border-gray-500 w-full">
                    <thead>
                        <tr className="bg-yellow-300 text-black">
                            {data?.map((item, index) => (
                                <th key={index} className="border border-gray-500">
                                    {item.code}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            {data?.map((item, index) => (
                                <td key={index} className="border border-gray-500">
                                    {item.weight}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
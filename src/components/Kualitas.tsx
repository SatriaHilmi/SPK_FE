export const Kualitas = () => {
    return (
        <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-blue-400">Kualitas (C3)</h2>
                <button className="items-end bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-2">Tambah Data</button>
            </div>
            <div className="flex justify-center">
                <table className="border border-collapse border-gray-500 w-full">
                    <thead>
                        <tr className="bg-yellow-300 text-black">
                            <th className="border border-gray-500">
                                No
                            </th>
                            <th className="border border-gray-500">
                                Nama Sub-kriteria
                            </th>
                            <th className="border border-gray-500">
                                Nilai
                            </th>
                            <th className="border border-gray-500">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td className="border border-gray-500">1.</td>
                            <td className="border border-gray-500">Rp.1000</td>
                            <td className="border border-gray-500">1000</td>
                            <td className="border border-gray-500">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
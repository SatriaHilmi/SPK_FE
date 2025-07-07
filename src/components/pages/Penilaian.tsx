export const Penilaian = () => {
    return (
        <>
            <div className="w-full px-6">
                <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-700">Data Penilaian</h2>
                    </div>
                    <div className="flex justify-center">
                        <table className="border border-collapse border-gray-500 w-full">
                            <thead>
                                <tr className="bg-yellow-300 text-black">
                                    <th className="border border-gray-500">
                                        No
                                    </th>
                                    <th className="border border-gray-500">
                                        Alternatif
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
                                    <td className="border border-gray-500"><button className="bg-yellow-300 rounded-lg px-2 py-1 my-2">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
import React, { useMemo, useState } from "react";
import { SiAlwaysdata } from "react-icons/si";
import { BsClipboard2DataFill, BsFilePerson } from "react-icons/bs";
import { GrMultiple } from "react-icons/gr";
import { GiGuitar } from "react-icons/gi";

import { IoIosCalculator } from "react-icons/io";
import { SiVirustotal } from "react-icons/si";
import { AiOutlineMenu } from "react-icons/ai";
import { useLogin } from "../hooks/useLogin";
import { BiLogOut } from "react-icons/bi";
import { useGetPhotoProfile } from "../hooks/profile/useGetPhotoProfile";
// import { set } from "react-hook-form";

interface sidebarProps {
    setGim: (page: string) => void;
}

export const SideBar: React.FC<sidebarProps> = ({ setGim }) => {
    const [expand, setExpand] = useState(true);
    const [active, setActive] = useState<number | null>(null);
    const { userData } = useLogin()
    const { me } = useLogin()
    const { data: dataProfile, refetch } = useGetPhotoProfile()
    refetch()
    const toggleSideBar = () => {
        setExpand(!expand);
    }

    const useHandle = (index: number, page: string) => {
        setActive(index);
        setGim(page);
    }

    const menu = [
        { icon: BsClipboard2DataFill, label: "Data Kriteria", page: "kriteria" },
        { icon: GiGuitar, label: "Jenis Alat Musik", page: "jenisAlatMusik" },
        { icon: GrMultiple, label: "Data Sub-kriteria & Alternatif", page: "subkriteria" },
        // { icon: TbChartInfographic, label: "Data Penilaian", page: "penilaian" },
        { icon: IoIosCalculator, label: "Data Perhitungan", page: "perhitungan" },
        { icon: SiVirustotal, label: "Data Hasil Akhir", page: "hasil" },
        { icon: BsFilePerson, label: "Profile", page: "profile" },
    ];

    const menuItems = useMemo(() => {
        const role = userData?.data?.role;

        return menu.filter((item) => {
            const page = item.page.toLowerCase();

            if (role === "ADMIN") {
                // Admin bisa akses semua kecuali subkriteria
                return page !== "subkriteria";
            }

            // User biasa hanya bisa akses hasil, profile, dan subkriteria
            return ["hasil", "profile", "subkriteria"].includes(page);
        });
    }, [userData]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        me();
    }

    return (
        <div className={`h-screen ${expand ? "w-64" : "w-20"} bg-black text-white flex flex-col font-livvic transition-all duration-300`}>
            {/* <div className="flex flex-row justify-between py-4 px-4"> */}
            <div className="flex flex-row justify-between py-4 border-b border-gray-700 px-4">
                <div className="flex items-start justify-center">
                    <SiAlwaysdata className="text-4xl text-yellow-500" />
                    {expand && <h1 className="text-2xl font-bold font-livvic mx-2">SPK</h1>}
                </div>
                <div className="flex justify-center">
                    <button onClick={toggleSideBar} className={`absolute rounded-full bg-gray-800 p-2 ${expand ? "left-[235px]" : "left-[60px]"} text-white hover:text-gray-400 focus:outline-none duration-300`}>
                        <AiOutlineMenu className="text-2xl" />
                    </button>
                    {/* </div> */}
                </div>
            </div>

            <nav className="flex-1 mt-4">
                <ul className="space-y-4 px-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a className={`flex items-center ${expand ? '' : 'justify-center'} space-x-2 p-2 rounded-full duration-300 cursor-pointer ${active === index ? "bg-white text-black" : "hover:bg-gray-800"}`} onClick={() => useHandle(index, item.page)}>
                                <item.icon className="text-xl" />
                                {expand && <span>{item.label}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Garis pemisah di atas profil */}
            <div className="border-t border-gray-700 my-4 mx-4"></div>

            <div className="flex flex-col items-center px-4 mb-2 py-2">
                <img
                    src={dataProfile?.photo ?? "/default.jpg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-white"
                />
                {expand && (
                    <>
                        <p className="mt-2 font-semibold">{userData?.data?.username}</p>
                        <p className="text-sm text-gray-400">{userData?.data?.email}</p>
                    </>
                )}
            </div>

            <button type="button" className={`focus:outline-none ${expand ? '' : 'justify-center'} text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm mx-2 px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`} onClick={handleLogout}>
                <div className="flex justify-center items-center gap-1">
                    <BiLogOut />
                    Logout
                </div>
            </button>
        </div>
    )
}
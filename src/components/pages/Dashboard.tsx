// import React, { useState } from "react"
import { WithAuth } from "../../hoc/withAuth"
import { SideBar } from "../SideBar"
import { Kriteria } from "./Kriteria"
import { DataSubKriteria } from "./DataSubKriteria"
// import { TambahDataAl } from "../TambahDataAl"
import { JenisAlatMusik } from "./JenisAlatMusik"
import { Penilaian } from "./Penilaian"
import { Perhitungan } from "./Perhitungan"
import { HasilAkhir } from "./HasilAkhir"
import { Profile } from "./Profile"
import { useDashboardPage } from "../../hooks/useDashboardPage"

const Dashboard = () => {
    const { page, setPage } = useDashboardPage()
    return (
        <>
            <div className="flex h-screen">
                <SideBar setGim={setPage} />

                <div className="flex flex-1 justify-center items-center">
                    {page === 'kriteria' && <Kriteria />}
                    {page === 'jenisAlatMusik' && <JenisAlatMusik />}
                    {page === 'subkriteria' && <DataSubKriteria />}
                    {page === 'penilaian' && <Penilaian />}
                    {page === 'perhitungan' && <Perhitungan />}
                    {page === 'hasil' && <HasilAkhir />}
                    {page === 'profile' && <Profile />}
                    {page === 'dashboard' && (
                        <div className="text-center max-w-lg">
                            <p className="mb-4 font-livvic text-xl">
                                Selamat datang di dalam sistem pendukung keputusan pemilihan alat musik yang dapat membantu dalam mengambil setiap keputusan dengan baik
                            </p>
                            <img
                                src="assets/undraw-code.png"
                                alt="Kriteria"
                                className="h-auto max-w-full mx-auto"
                            />
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default WithAuth(Dashboard, { activate: true })
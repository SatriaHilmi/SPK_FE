// import { Navbar } from "./Navbar"

export const AboutUs = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-black">
            <div className="max-w-4xl p-5 bg-yellow-300 shadow-lg rounded-lg mb-20 text-center mt-24">
                <div className="flex flex-row justify-center">
                    <h1 className="text-4xl font-bold mb-5 text-center text-black hover:text-white duration-200 hover-scale-up">About Us</h1>
                </div>
                <p className="text-lg mb-3">
                    Sistem Pendukung Keputusan (SPK) adalah suatu sistem yang membantu pengambilan keputusan dalam suatu organisasi atau perusahaan. SPK ini dibuat dengan
                    menggunakan metode SMART (Simple Multi Atribute Rating Technique).
                </p>
                <p className="text-lg mb-3">
                    Sistem ini dibuat berdasarkan sepenuhnya ide dari penulis (peneliti), yang akan membantu banyak orang dalamm memilih
                    pilihan mereka. Sistem ini sangat cocok bagi kaum yang kesulitan dalam memilih suatu keputusan, atau bagi kaum mendang-mending.
                </p>
                <div className="mt-14 mb-5 flex flex-col items-center">
                    <h4 className="text-2xl font-semibold">Contact Us</h4>
                    <ul className="flex flex-col items-center justify-center">
                        <li className=" text-black py-2 px-4">Phone: 082363159160</li>
                        <li className=" text-black py-2 px-4">Email: hilmibarca24@gmail.com</li>
                    </ul>
                    <ul className="flex flex-col items-center justify-center mt-4">
                        <p className="text-black">Admin Access</p>
                        <li className="text-black">Username: admin</li>
                        <li className="text-black">password: admin1234</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
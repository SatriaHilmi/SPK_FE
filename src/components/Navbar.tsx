import { useLogin } from "../hooks/useLogin";

interface NavbarProps {
    setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
    const { isAuthenticated } = useLogin()
    return (
        <div>
            <nav className='flex justify-between items-center p-5 text-white bg-black bg-opacity-50 w-full absolute z-20'>
                <h1 className='text-end text-2xl font-bold z-20'>Sistem Pendukung Keputusan</h1>
                <ul className='flex justify-start items-start space-x-5'>
                    <li className='cursor-pointer text-white hover:underline hover:text-gray-500 z-20' onClick={() => setCurrentPage('about')}>About Us</li>
                    <li className='text-white z-20'>|</li>
                    <li className='cursor-pointer text-white hover:underline hover:text-gray-500 z-20' onClick={() => setCurrentPage('dashboard')}>{isAuthenticated ? 'Dashboard' : 'Login'}</li>
                    <li className='text-white z-20'>|</li>
                    <li className='cursor-pointer text-white hover:underline hover:text-gray-500 z-20' onClick={() => setCurrentPage('home')}>Home</li>
                </ul>
            </nav>
        </div>
    )
}
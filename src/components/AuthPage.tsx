import { useState } from 'react';
import { FormLogin } from './FormLogin';
import { FormRegister } from './FormRegister';

export const AuthPage = () => {
  const [isNewMember, setIsNewMember] = useState(false);
  return (
    <div className='flex h-screen bg-neutral-800 text-white relative overflow-hidden'>
      <div className='absolute w-[1080px] h-[1080px] bg-yellow-500 rounded-full flex items-center justify-center -left-[567px] -top-[80px]'>
        <div className='absolute w-[500px] h-[500px] bg-blue-600 rounded-full'></div>
      </div>
      <div className='flex flex-col justify-center w-full md:w-1/2 absolute md:right-0 h-full'>
        {isNewMember ? (
          <FormRegister>
            <div className='flex items-center space-x-1'>
              <p className='mt-2'>Sudah punya akun?</p>
              <p
                className='text-yellow-600 cursor-pointer hover:text-yellow-700 mt-2'
                onClick={() => setIsNewMember(false)}
              >
                Masuk
              </p>
            </div>
          </FormRegister>
        ) : (
          <FormLogin>
            <div className='flex items-center space-x-1'>
              <p className='mt-2'>Belum punya akun?</p>
              <p
                className='text-yellow-600 cursor-pointer hover:text-yellow-700 mt-2'
                onClick={() => setIsNewMember(true)}
              >
                Daftar
              </p>
            </div>
          </FormLogin>
        )}
      </div>
    </div>
  );
};

import { SubmitHandler, useForm } from 'react-hook-form';
import { usePopup } from '../hooks/usePopUp';
import axios from 'axios';
import { useLogin } from '../hooks/useLogin';
import { ReactNode } from 'react';
type FormValues = {
  username: string;
  password: string;
};

export const FormLogin: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showPopup } = usePopup();
  const { me } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post('https://spkbe-production.up.railway.app/auth/login', {
        username: data.username,
        password: data.password,
      });

      localStorage.setItem('token', response.data.token);
      me();
      // setIsAuthenticated(true);

    } catch (e: unknown) {
      //@ts-expect-error: Type of error is unknown
      const error = e?.response?.data?.error;
      //@ts-expect-error: Type of error is unknown
      const message = e?.response?.data?.message;
      if (error) {
        showPopup(error);
      }
      if (message) {
        showPopup(message);
      }
    }
  };
  return (
    <>
      <form
        className='w-full flex items-center justify-left relative z-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col p-4 w-full rounded-lg  xl:w-1/2 bg-neutral-800 mx-2'>
          <h1 className='text-7xl font-livvic text-neutral-200 mb-8'>LOGIN</h1>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Username'
              className='bg-transparent w-full py-2 px-4 rounded mt-4 border-neutral-400 border'
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            {errors.username && (
              <span className='text-red-500'>Username is required</span>
            )}
            <input
              type='password'
              placeholder='Password'
              className='bg-transparent w-full py-2 px-4 rounded mt-6 border-neutral-400 border'
              {...register('password', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            {errors.password && (
              <span className='text-red-500'>Password is required</span>
            )}
            {children}
            <button
              type='submit'
              className='bg-yellow-500 uppercase font-bold mt-8 rounded-lg p-2 text-neutral-800 hover:bg-yellow-600'
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};


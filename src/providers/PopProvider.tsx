import { createContext, useState, ReactNode } from 'react';

export type PopupContextType = {
  showPopup: (message: string) => void;
  hidePopup: () => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showPopup = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
  };

  const hidePopup = () => {
    setIsVisible(false);
    setMessage('');
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {isVisible && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
          onClick={hidePopup}
        >
          <div className='bg-neutral-800 p-4 rounded shadow-md text-center'>
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              <span className='font-medium'>Error</span> {message}
            </div>
            <button
              onClick={hidePopup}
              className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
            >
              OK
            </button>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};



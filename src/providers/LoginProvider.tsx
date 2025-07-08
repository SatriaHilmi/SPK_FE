import axios from "axios";
import { useState, createContext, useEffect, ReactNode } from "react";

interface UserDTO {
  username: string
  email: string
  name: string
  role: string
}

interface ResponseDTO {
  status: number
  message: string
  data?: UserDTO
}

export type LoginContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  userData?: ResponseDTO | undefined;
  me: () => Promise<void>
};

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setIsUserData] = useState<UserDTO>()

  const me = async () => {
    try {
      const response = await axios.get<UserDTO>('https://spkbe-production.up.railway.app//me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setIsUserData(response.data)
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    me();
  }, []);

  return (
    //@ts-ignore
    <LoginContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, userData, me }}>
      {children}
    </LoginContext.Provider>
  );
}
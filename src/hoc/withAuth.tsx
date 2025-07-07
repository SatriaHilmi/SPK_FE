import React from 'react';
import { AuthPage } from '../components/AuthPage';
import { useLogin } from '../hooks/useLogin';

interface WithAuthOptions {
  activate: boolean;
}

export const WithAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions
): React.FC<P> => {
  return function WrappedComponent(props: P) {
    const { isAuthenticated, isLoading, userData } = useLogin();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (userData?.data?.role && isAuthenticated && options.activate) {
      return <Component {...props} />;
    }

    return <AuthPage />

  };
};

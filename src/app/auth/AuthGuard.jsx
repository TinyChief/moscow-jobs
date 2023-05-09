import useAuth from '@/app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();


  if (isAuthenticated) {

    return <>{children}</>;
  } else {

    return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
  }

};

export default AuthGuard;

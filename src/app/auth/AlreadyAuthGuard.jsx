import useAuth from "@/app/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AlreadAuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated) {
    return <Navigate replace to="/" state={{ from: pathname }} />;
  } else {
    return <>{children}</>;
  }
};

export default AlreadAuthGuard;

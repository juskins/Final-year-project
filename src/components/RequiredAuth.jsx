import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const user = JSON.parse( localStorage.getItem('user'))

    return (
       
           
            user?.uid
            ? <Outlet />
               
                :<Navigate to="/login" state={{ from: window.location.pathname }} replace />

    );
}

export default RequireAuth;
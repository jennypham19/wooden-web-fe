import { useAppSelector } from "@/store"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { ROUTE_PATH } from "@/constants/routes";

const AuthGuard = () => {
    const { isAuthenticated, isInitialized} = useAppSelector((state) => state.auth);
    const location = useLocation();

    if(!isInitialized) {
        return <LoadingScreen />;
    }

    if(!isAuthenticated) {
        return <Navigate to={`/`} state={{ from: location }} replace />
    }

    return <Outlet />;
}

export default AuthGuard;
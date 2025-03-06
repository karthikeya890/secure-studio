import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth";
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;

 import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const auth = useContext(AuthContext)

   if(!auth || !auth.token){
    return <Navigate to={"/signin"} replace />
   }

   return <> {children} </>
};

export default ProtectedRoute;

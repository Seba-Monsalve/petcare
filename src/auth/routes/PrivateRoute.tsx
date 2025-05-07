import toast from "react-hot-toast";
import { Navigate } from "react-router";

export const PrivateRoute = ({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: React.JSX.Element;
}) => {
  if (!isAuth) {
    // toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/pitbull" />;
  }

  return children;
};

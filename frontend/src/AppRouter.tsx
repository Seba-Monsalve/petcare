import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import PetsPage from "./pages/PetsPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import { PrivateRoute } from "./auth/routes/PrivateRoute";
import { useAuthStore } from "./store/auth.store";
import { Unauthorized } from "./pages/Unauthorized";

function AppRouter() {
  const { user } = useAuthStore();
  console.log("AppRouter", user);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuth={!!user}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index path="/dashboard" element={<PetsPage />}></Route>
          <Route path="/dashboard/pets" element={<PetsPage />}></Route>
          <Route path="/dashboard/vets" element={<h1>vets</h1>}></Route>
        </Route>
        <Route path="/pitbull" element={<Unauthorized />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

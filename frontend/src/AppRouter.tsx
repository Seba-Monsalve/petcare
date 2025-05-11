import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import { PrivateRoute } from "./auth/routes/PrivateRoute";
import { useAuthStore } from "./store/auth.store";
import { Unauthorized } from "./pages/Unauthorized";
import PetsPage from "./pets/pages/PetsPage";
import { AddPetPage, PetPage } from "./pets/pages";

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
          <Route index path="/dashboard" element={<PetsPage />} />
          <Route path="/dashboard/pets/new" element={<AddPetPage />} />
          <Route path="/dashboard/pets/:id" element={<PetPage />} />
          <Route path="/dashboard/vets" element={<h1>vets</h1>} />
        </Route>
        <Route path="/pitbull" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

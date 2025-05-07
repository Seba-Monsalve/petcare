import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import DashboardLayout from "./pages/dashboard/DashBoardLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index path="/dashboard/pets" element={<h1>Pets</h1>}></Route>
          <Route path="/dashboard/vets" element={<h1>vets</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

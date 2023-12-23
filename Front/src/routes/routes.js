import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// layouts
import DashboardLayout from "../layouts/dashboard";
import SimpleLayout from "../layouts/simple";
//
import LoginPage from "../pages/Auth/LoginPage";
import ForgetPasswordPage from "../pages/Auth/ForgetPasswordPage";
import Page404 from "../pages/ErorPages/Page404";
import GestionDeveloppeur from "../pages/GestionDeveloppeur/GestionClient";
import GestionAbonnements from "../pages/GestionAbonnements/index";
import Parametre from "../pages/Parametres/index";
import DetailsClient from "../pages/GestionDeveloppeur/DetailsClient";
import DetailsAbonnement from "../pages/GestionAbonnements/DetailsAbonnement";

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem("refreshToken");
    return token !== "undefined" && token !== null;
  };
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      if (location.pathname === "/login/oublierMdp") {
        return;
      }
      console.log("Heeeey");
      navigate("/login");
    } else if (location.pathname === "/") {
      navigate("/app/gestion_clients");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SimpleLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="login/oublierMdp" element={<ForgetPasswordPage />} />
        <Route path="404" element={<Page404 />} />
      </Route>

      {isAuthenticated() && (
        <Route path="/app/*" element={<DashboardLayout />}>
          <Route path="gestion_clients" element={<GestionDeveloppeur />} />
          <Route
            path="gestion_clients/details/:id"
            element={<DetailsClient />}
          />
          <Route path="gestion_abonnements" element={<GestionAbonnements />} />
          <Route
            path="gestion_abonnements/details/:id"
            element={<DetailsAbonnement />}
          />
          <Route path="parametre" element={<Parametre />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

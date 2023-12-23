// routes
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Router from "./routes/routes";

// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import CustomToaster from "./custom/Toast/CustomToaster";
import authService from "./services/authService";
import Loading from "./layouts/loading/Loading";
import "./pages/StyleMain.css";
import Loader from "./components/Loader";
import { GetUserByToken } from "./store/feature/authSlice";

// ----------------------------------------------------------------------

export default function App() {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserByToken());
  }, [dispatch]);
  const { loading } = useSelector((state) => state.auth);

  /*   useEffect(() => {
    authService
      .getUserByToken()
      .then((response) => {
        console.log(response.data);
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []); */

  if (loading) {
    return <Loader />;
  }
  return (
    <ThemeProvider>
      <CustomToaster />
      <ScrollToTop />
      <StyledChart />
      {loading ? <Loading /> : <Router />}
    </ThemeProvider>
  );
}

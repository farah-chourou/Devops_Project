import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Container,
  Typography,
  Button,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import authService from "../../services/authService";
import { doMutation } from "../../utils/mutation";

const icon = (
  <Paper sx={{ m: 1 }}>
    <Box component="svg" sx={{ width: 150, height: 150 }}>
      <CheckCircleOutlineIcon color="primary" />
    </Box>
  </Paper>
);
const defaultTheme = createTheme();

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const [errorMail, seterrorMail] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const { mutate, success } = doMutation(
    "Error message if any",
    "Mot de passe envoyé avec succès",
    "abonnData",
    (data) => authService.forgotPassword(data)
  );
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onRecover = (e) => {
    e.preventDefault();
    try {
      mutate(userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #13103B 15%,     #1565C0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title> Connexion </title>
      </Helmet>

      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "white",
            padding: 5,
            borderRadius: 4,
            boxShadow: "#13133F 0px 8px 24px",
            margin: 5,
          }}
        >
          <CssBaseline />

          {success === true ? (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
                Mot de passe envoyé avec succès{" "}
              </Typography>
              <Box
                sx={{
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Zoom
                  in={success}
                  style={{ transitionDelay: success ? "500ms" : "0ms" }}
                >
                  {icon}
                </Zoom>
              </Box>
              <LoadingButton
                sx={{ mt: 4 }}
                fullWidth
                size="large"
                variant="outlined"
                onClick={handleNavigate}
              >
                Revenir à la page de login
              </LoadingButton>{" "}
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <Avatar
                src="/assets/images/logoWithBG.jpg"
                sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}
              />
              <Typography component="h1" variant="h5" color="#13133F">
                Récupérer votre mot de passe{" "}
              </Typography>
              <Box
                component="form"
                onSubmit={onRecover}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  size="small"
                  autoFocus
                  autoComplete="email"
                  value={userInfo.email}
                  label="Entrer votre mail ici "
                  onChange={handleChange}
                  required
                  error={errorMail}
                  helperText={errorMail ? "Mail invalide" : ""}
                />
                <Typography
                  variant="subtitle2"
                  underline="hover"
                  color="#3f51b5"
                  sx={{ p: 0.5 }}
                >
                  On va vous envoyer un nouveau mot de passe à votre email.
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Récupérer
                </Button>{" "}
                <Button fullWidth variant="outlined" onClick={handleNavigate}>
                  Revenir à la page de login
                </Button>{" "}
              </Box>
            </Box>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}

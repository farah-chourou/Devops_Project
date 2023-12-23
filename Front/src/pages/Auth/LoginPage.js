import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  TextField,
  Link,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Iconify from "../../components/iconify";
import { Login } from "../../store/feature/authSlice";

const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showpassword, setShowpassword] = useState(false);
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");

  const { user } = useSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    seterrorpassword(false);
    seterroremail(false);
    try {
      const response = await dispatch(Login(userInfo)).unwrap();
      if (response) {
        navigate("/app/gestion_clients");
      }
      /* authService
      .login(userInfo)
      .then((response) => {
        Toastfunction.TaostSuccess(
          `Bienvenue ${response.data.user.nom}  ${response.data.user.prenom}`
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.token);

        console.log(response);
        setUser(response.data.user);
        navigate("/app/gestion_clients");
      }) */
    } catch (error) {
      if (error?.response.data.message === "Please verify your email") {
        seterroremail(true);
      } else if (
        error?.response.data.message === "Please verify your password"
      ) {
        seterrorpassword(true);
      }
      console.log(error);
    }
  };

  return (
    <div
      className="bg-light"
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
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="/assets/images/logoWithBG.jpg"
              sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}
            />
            <Typography component="h1" variant="h5" color="#13133F">
              Connexion
            </Typography>
            <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="email"
                label="Adresse Email "
                name="email"
                autoComplete="email"
                autoFocus
                value={userInfo.email}
                onChange={handleChange}
                error={erroremail}
                helperText={erroremail ? "Eemail n'existe pas" : ""}
                type="email"
              />
              <TextField
                margin="normal"
                required
                size="small"
                fullWidth
                name="password"
                label="Mot de passe"
                id="password"
                value={userInfo.password}
                error={errorpassword}
                helperText={errorpassword ? "Mot de passe incorrect" : ""}
                onChange={handleChange}
                type={showpassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowpassword(!showpassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showpassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                sE CONNECTER
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login/oublierMdp" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>{" "}
        </Container>
      </ThemeProvider>
    </div>
  );
}

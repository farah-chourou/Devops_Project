/* eslint-disable react/jsx-key */
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

// @mui
import {
  Typography,
  Container,
  Grid,
  Stack,
  Paper,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useQuery } from "react-query";
import clientServices from "../../services/clientServices";
import abonnementServices from "../../services/abonnementServices";
import Loading from "../../layouts/loading/Loading";

function DetailsClient() {
  const { id } = useParams();
  const {
    data: clientData,
    isLoading,
    isError,
    error,
  } = useQuery("clientInformations", () => clientServices.getOne(id));
  const { data: abonnList, isLoadingAb } = useQuery("abonnList", () =>
    abonnementServices.getAllByClientID(id)
  );

  return (
    <Container className="container">
      <Helmet>
        <title> Détails Client </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Détails Client
        </Typography>
      </Stack>
      {isLoading || isLoadingAb ? (
        <Paper>
          <Loading />
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {/* First Column */}
          <Grid item xs={12} md={4} sx={{ borderRight: "1px solid #C4CDD5" }}>
            <Stack direction="column" alignItems="center" mb={2}>
              <Box>
                {" "}
                <img
                  alt="avatar"
                  src="/assets/images/avatar.png"
                  width="150px"
                />
              </Box>
              <Box alignItems="center">
                {" "}
                <Typography variant="h6">
                  <strong>{clientData?.fullName}</strong>
                </Typography>
              </Box>
              <Box mt={1}>
                {" "}
                <Stack direction="row" alignItems="center">
                  <AlternateEmailIcon />
                  <Typography variant="body1" m={1}>
                    {" "}
                    <span style={{ margin: 4 }}> {clientData?.email}</span>
                  </Typography>
                </Stack>{" "}
              </Box>
              <Box mt={1}>
                <Stack direction="row" alignItems="center">
                  <PhoneIcon />
                  <Typography variant="body1" m={1}>
                    <span style={{ margin: 4 }}>
                      {" "}
                      {clientData?.numTelephone}
                    </span>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="column">
              <Box>
                <Typography variant="h5" gutterBottom color="secondary">
                  Informations Générales
                </Typography>
                <Stack
                  direction="row"
                  mt={2}
                  mb={2}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h6">Pays</Typography>
                    <Typography variant="body1" color="gray">
                      {clientData?.pays}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Note
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {clientData?.note}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                {abonnList?.length !== 0 ? (
                  <Typography variant="h5" gutterBottom color="secondary">
                    Abonnements
                  </Typography>
                ) : (
                  ""
                )}
                <Grid container spacing={2}>
                  {abonnList?.map((item) => (
                    <Grid item xs={12} sm={6} md={6}>
                      <Card
                        sx={{
                          boxShadow: 4,
                          borderRadius: 2,
                          backgroundColor: "light",
                          cursor: "pointer",
                          transition: "transform 0.3s",

                          " &:hover ": {
                            transform: " scale(1.04)",
                          },
                        }}
                      >
                        <CardContent alignItems="center">
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle1" align="right">
                              {item?.application}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              align="left"
                              color={
                                item?.etatPaiement === "PAIED"
                                  ? "success"
                                  : "error"
                              }
                            >
                              {item?.etatPaiement === "PAIED"
                                ? "Payé"
                                : "Non Payé"}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>{" "}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default DetailsClient;

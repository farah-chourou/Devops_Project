/* eslint-disable prefer-template */
/* eslint-disable spaced-comment */
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

// @mui
import {
  Typography,
  Container,
  Grid,
  Stack,
  Button,
  Paper,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ImageIcon from "@mui/icons-material/Image";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useQuery } from "react-query";
import abonnementServices from "../../services/abonnementServices";
import { fDate } from "../../utils/formatTime";
import ModalAddPayement from "./Modals/ModalAddPayement";
import Loading from "../../layouts/loading/Loading";
import formatImage from "../../utils/formatImage";
import ModalEditPayement from "./Modals/ModalEditPayement";

function DetailsAbonnement() {
  const { id } = useParams();

  const {
    data: abonnData,
    isLoading,
    isError,
    error,
  } = useQuery("abonnementInformations", () => abonnementServices.getOne(id));
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: null,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add" });
  };
  const openEdit = () => {
    setPopup({ open: true, type: "edit", value: abonnData });
  };
  const handleClose = () => {
    setPopup({ open: false, type: "", row: null });
  };

  if (isLoading) {
    return (
      <Paper>
        {" "}
        <Loading />
      </Paper>
    );
  }
  return (
    <div>
      <Helmet>
        <title> Détails Abonnement </title>
      </Helmet>
      <Paper>
        <Box p={2} boxShadow={4}>
          <Typography variant="h6" gutterBottom>
            Détails Abonnement N° {abonnData._id}
          </Typography>
          <Stack direction="row" mt={2} mb={2} spacing={1} alignItems="center">
            <Chip
              variant="outlined"
              size="small"
              label={fDate(abonnData?.dateDebut)}
            />{" "}
            <ArrowRightAltIcon />
            <Chip
              variant="outlined"
              size="small"
              label={fDate(abonnData?.dateFin)}
            />
          </Stack>
          <table cellPadding={6}>
            <tr>
              <td>
                <Typography variant="subtitle1" color="gray">
                  Application
                </Typography>{" "}
              </td>
              <td> {abonnData?.application}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <Typography variant="subtitle1" color="gray">
                  Addresse MAC
                </Typography>
              </td>
              <td>
                {" "}
                {abonnData?.adresseMac ? abonnData?.adresseMac : "néant"}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <Typography variant="subtitle1" color="gray">
                  Période
                </Typography>
              </td>
              <td> {abonnData?.periode} Mois</td>
            </tr>
            <tr>
              <td>
                {" "}
                <Typography variant="subtitle1" color="gray">
                  Appareil
                </Typography>
              </td>
              <td>
                {" "}
                {abonnData?.deviceID?.label
                  ? abonnData?.deviceID?.label
                  : "néant"}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <Typography variant="subtitle1" color="gray">
                  Type d'abonnement
                </Typography>
              </td>
              <td>
                {" "}
                {abonnData?.typeAbonnID?.label
                  ? abonnData?.typeAbonnID?.label
                  : "néant"}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <Typography variant="subtitle1" color="gray">
                  Client
                </Typography>
              </td>
              <td>
                <Link
                  to={`/app/gestion_clients/details/${abonnData?.clientID?._id}`}
                >
                  {abonnData?.clientID?.fullName}
                </Link>{" "}
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="subtitle1" color="gray">
                  Certificat
                </Typography>
              </td>
              {abonnData?.files.length > 0 &&
              formatImage.isImageFile(abonnData?.files[0]) ? (
                <td>
                  <IconButton href={abonnData?.files[0]} target="_blank">
                    {" "}
                    <ImageIcon />
                  </IconButton>{" "}
                </td>
              ) : abonnData?.files.length === 0 ? (
                ""
              ) : (
                <td>
                  {" "}
                  <a
                    href={abonnData?.files[0]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton>
                      {" "}
                      <PictureAsPdfIcon />
                    </IconButton>{" "}
                  </a>
                </td>
              )}
            </tr>
          </table>
        </Box>
      </Paper>
      <Paper>
        <Box p={2} mt={2} boxShadow={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" gutterBottom>
              Détails Paiement
            </Typography>
            {abonnData?.montant === undefined ? (
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => openAdd()}
                size="small"
              >
                Ajouter Paiement
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => openEdit()}
                size="small"
              >
                Modifier Paiement
              </Button>
            )}
          </Stack>

          <table cellPadding={6}>
            <tr>
              <td>
                <Typography variant="subtitle1" color="gray">
                  Status
                </Typography>{" "}
              </td>
              <td>
                {" "}
                <Chip
                  size="small"
                  label={
                    abonnData?.etatPaiement === "PAIED" ? "Payé" : "Non Payé"
                  }
                  color={
                    abonnData?.etatPaiement === "PAIED" ? "success" : "error"
                  }
                />{" "}
              </td>
            </tr>

            <>
              <tr>
                <td>
                  {" "}
                  <Typography variant="subtitle1" color="gray">
                    Service De Paiement
                  </Typography>
                </td>
                <td> {abonnData?.servicePaiement?.label}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Typography variant="subtitle1" color="gray">
                    Montant
                  </Typography>
                </td>
                <td>
                  {abonnData?.montant !== undefined
                    ? abonnData.montant + "dt"
                    : null}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Typography variant="subtitle1" color="gray">
                    Destinataire
                  </Typography>
                </td>
                <td> {abonnData?.destinataire}</td>
              </tr>{" "}
            </>
          </table>
        </Box>
      </Paper>

      {popup.type === "add" && (
        <ModalAddPayement popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "edit" && (
        <ModalEditPayement popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default DetailsAbonnement;

/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import Lottie from "lottie-react";
import { Grid, TextField, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery } from "react-query";
import AbonnementServices from "../../../services/abonnementServices";
import { doMutation } from "../../../utils/mutation";
import clientServices from "../../../services/clientServices";
import deviceServices from "../../../services/deviceServices";
import typeAbonnServices from "../../../services/typeAbonnServices";
import pendingAnimationData from "../../../components/pending.json";

function ModalAddAbonnement({ popup, handleClose }) {
  const [Show, setShow] = useState(false);
  const { open, value } = popup;
  const [ErrorMac, setErrorMac] = useState(false);
  const [Abonnement, setAbonnement] = useState({
    application: "",
    adresseMac: "",
    dateDebut: "",
    dateFin: "",
    periode: "",
    clientID: "",
    deviceID: "",
    typeAbonnID: "",
    note: "",
  });

  const [Documentation, setDocumentation] = useState(null);

  const handleChangeDoc = (e) => {
    setDocumentation(e.target.files[0]);
  };

  const {
    data: clientList,
    isError,
    error,
  } = useQuery("clientData", clientServices.getAll);
  const { data: deviceList } = useQuery("deviceData", deviceServices.getAll);
  const { data: typeAbonnList } = useQuery(
    "typeAbonnData",
    typeAbonnServices.getAll
  );

  const { mutate, isLoading } = doMutation(
    "Error message if any",
    "Abonnement ajouté avec succès",
    "abonnData",
    (data) => AbonnementServices.add(data),
    handleClose
  );

  const handleChange = (e) => {
    setAbonnement({ ...Abonnement, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMac(false);

    try {
      const formData = new FormData();
      formData.append("application", Abonnement.application);
      if (Abonnement.adresseMac) {
        formData.append("adresseMac", Abonnement.adresseMac);
      }
      formData.append("dateDebut", Abonnement.dateDebut);
      formData.append("periode", Abonnement.periode);
      formData.append("clientID", Abonnement.clientID);
      if (Abonnement.deviceID) {
        formData.append("deviceID", Abonnement.deviceID);
      }
      if (Abonnement.typeAbonnID) {
        formData.append("typeAbonnID", Abonnement.typeAbonnID);
      }
      if (Documentation) {
        formData.append("Documentation", Documentation);
      }
      if (
        Abonnement.adresseMac.length === 17 ||
        Abonnement.adresseMac.length === 0
      ) {
        mutate(formData);
      } else {
        setErrorMac(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Ajouter un nouveau Abonnement "}</DialogTitle>
      {isLoading ? (
        <Lottie
          animationData={pendingAnimationData}
          style={{
            resizeMode: "contain",
            alignSelf: "center",
            margin: "auto",
            height: 250,
            width: 250,
          }}
        />
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Application"
                  required
                  name="application"
                  size="small"
                  onChange={handleChange}
                  value={Abonnement.application}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Choisir client"
                  name="clientID"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  required
                >
                  {clientList?.map((option) => (
                    <MenuItem key={option.value} value={option._id}>
                      {option.fullName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="dateDebut"
                  label={"dateDebut"}
                  size="small"
                  required
                  onChange={handleChange}
                  value={Abonnement.dateDebut}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Choisir Periode"
                  name="periode"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  required
                >
                  {[...Array(12)].map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1} Mois
                    </MenuItem>
                  ))}
                  <MenuItem value={24}>24 Mois</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="file"
                  name="Documentation"
                  size="small"
                  onChange={handleChangeDoc}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Adresse Mac"
                  placeholder="XX:XX:XX:XX:XX:XX"
                  name="adresseMac"
                  size="small"
                  onChange={handleChange}
                  value={Abonnement.adresseMac}
                  error={ErrorMac}
                  helperText={ErrorMac ? "Adresse MAC  être de 17 lettre " : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Choisir appareil"
                  name="deviceID"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                >
                  {deviceList?.map((option) => (
                    <MenuItem key={option.value} value={option._id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Choisir type d'abonnement"
                  name="typeAbonnID"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                >
                  {typeAbonnList?.map((option) => (
                    <MenuItem key={option.value} value={option._id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
            <Button autoFocus variant="contained" type="submit">
              Ajouter
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
}

export default ModalAddAbonnement;

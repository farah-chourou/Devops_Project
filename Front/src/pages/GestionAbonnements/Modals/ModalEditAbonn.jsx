import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useQuery } from "react-query";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { doMutation } from "../../../utils/mutation";
import clientServices from "../../../services/clientServices";
import AbonnementServices from "../../../services/abonnementServices";
import deviceServices from "../../../services/deviceServices";
import typeAbonnServices from "../../../services/typeAbonnServices";

const PeriodeList = ["1 Mois", "2 Mois"];

function ModalEditClient({ popup, handleClose }) {
  const { open, value } = popup;
  const [Abonnement, setAbonnement] = useState({
    application: value.application,
    adresseMac: value.adresseMac,
    dateDebut: value.dateDebut,
    dateFin: value.dateFin,
    periode: value.periode,
    clientID: value.clientID,
    deviceID: value.deviceID,
    typeAbonnID: value.typeAbonnID,
  });

  const [Documentation, setDocumentation] = useState(null);

  const handleChangeDoc = (e) => {
    setDocumentation(e.target.files[0]);
  };

  const {
    data: clientList,
    isLoading,
    isError,
    error,
  } = useQuery("clientData", clientServices.getAll);
  const { data: deviceList } = useQuery("deviceData", deviceServices.getAll);
  const { data: typeAbonnList } = useQuery(
    "typeAbonnData",
    typeAbonnServices.getAll
  );
  const handleChange = (e) => {
    setAbonnement({ ...Abonnement, [e.target.name]: e.target.value });
  };
  const { mutate: mutateEdit } = doMutation(
    "Error message if any",
    "Client modifier avec succès",
    "clientData",
    (data) => AbonnementServices.update(data),
    handleClose
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const d = { _id: value._id, clientData: Abonnement };
      mutateEdit(d);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Modifier Abonnement "}</DialogTitle>

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
                defaultValue={"gg"}
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
                size="small"
                required
                onChange={handleChange}
                value={Abonnement.dateDebut}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="dateFin"
                size="small"
                required
                onChange={handleChange}
                value={Abonnement.dateFin}
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
              >
                {PeriodeList?.map((option) => (
                  <MenuItem key={option.value} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                name="Documentation"
                size="small"
                required
                onChange={handleChangeDoc}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Adresse Mac"
                name="adresseMac"
                size="small"
                required
                onChange={handleChange}
                value={Abonnement.adresseMac}
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
    </Dialog>
  );
}

export default ModalEditClient;

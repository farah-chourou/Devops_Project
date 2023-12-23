/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery } from "react-query";

import { doMutation } from "../../../utils/mutation";
import servicePaiementServices from "../../../services/servicePaiementServices";
import abonnementServices from "../../../services/abonnementServices";

const PeriodeList = ["1 Mois", "2 Mois"];
function ModalAddPayement({ popup, handleClose }) {
  const { id } = useParams();

  const { open, value } = popup;
  const [Paiement, setPaiement] = useState({
    servicePaiement: "",
    montant: 0,
    destinataire: "",
  });

  const {
    data: ServicePaiementList,
    isLoading,
    isError,
    error,
  } = useQuery("servicePaiementData", servicePaiementServices.getAll);

  const handleChange = (e) => {
    setPaiement({ ...Paiement, [e.target.name]: e.target.value });
  };
  const { mutate } = doMutation(
    "Error message if any",
    "Paiement ajouté avec succès",
    "abonnementInformations",
    (data) => abonnementServices.update(data),
    handleClose
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const d = { _id: id, d: Paiement };
      mutate(d);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Ajouter un nouveau Paiement "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Montant"
                required
                type="number"
                name="montant"
                size="small"
                onChange={handleChange}
                value={Paiement.montant}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Choisir Service Paiement"
                name="servicePaiement"
                size="small"
                fullWidth
                onChange={handleChange}
              >
                {ServicePaiementList?.map((option) => (
                  <MenuItem key={option.value} value={option._id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                name="destinataire"
                size="small"
                label="Destinataire"
                required
                onChange={handleChange}
                value={Paiement.destinataire}
              />
            </Grid>{" "}
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

export default ModalAddPayement;

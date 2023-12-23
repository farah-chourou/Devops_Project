import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { doMutation } from "../../../utils/mutation";
import abonnementServices from "../../../services/abonnementServices";

// eslint-disable-next-line react/prop-types
function ModalDelete({ popup, handleClose }) {
  const { open, value } = popup;
  const { mutate } = doMutation(
    "Error message if any",
    "Abonnement supprimer avec succès",
    "abonnData",
    (data) => abonnementServices.deleteAbonn(data),
    handleClose
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      mutate(value._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Supprimer Abonnement "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer l'abonnement numéro {value._id} ?{" "}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Supprimer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalDelete;

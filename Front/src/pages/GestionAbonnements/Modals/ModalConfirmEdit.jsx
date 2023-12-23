import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { doMutation } from "../../../utils/mutation";
import abonnServices from "../../../services/abonnementServices";

// eslint-disable-next-line react/prop-types
function ModalConfirmEdit({ popup, handleClose }) {
  const { open, value } = popup;
  const { mutate } = doMutation(
    "Error message if any",
    "Paiement modifier avec succès",
    "abonnData",
    (data) => abonnServices.update(data),
    handleClose
  );
  const [Paiement, setPaiement] = useState({
    etatPaiement: "",
  });
  const updatePaied = async (e) => {
    try {
      e.preventDefault();
      let updatedPaiement = null;

      if (value.etatPaiement === "PAIED") {
        updatedPaiement = { ...Paiement, etatPaiement: "NOT_PAIED" };
      } else {
        updatedPaiement = { ...Paiement, etatPaiement: "PAIED" };
      }

      await setPaiement(updatedPaiement);

      const d = { _id: value?._id, d: updatedPaiement };
      mutate(d);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Demande Confirmation "}</DialogTitle>

      <form onSubmit={(e) => updatePaied(e)}>
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de modifier l'état du paiement ?{" "}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Confirmer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalConfirmEdit;

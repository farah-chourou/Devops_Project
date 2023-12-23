import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { doMutation } from "../../../utils/mutation";
import clientServices from "../../../services/clientServices";

function ModalEditClient({ popup, handleClose }) {
  const { open, value } = popup;
  const [Client, setClient] = useState({
    fullName: value?.fullName,
    email: value.email,
    numTelephone: value.numTelephone,
    pays: value.pays,
    note: value.note,
  });

  const [ErrorEmail, setErrorEmail] = useState(false);
  const [ErrorPhone, setErrorPhone] = useState(false);
  const handleChange = (e) => {
    setClient({ ...Client, [e.target.name]: e.target.value });
  };
  const { mutate: mutateEdit } = doMutation(
    "Error message if any",
    "Client modifier avec succès",
    "clientData",
    (data) => clientServices.update(data),
    handleClose
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const d = { _id: value._id, clientData: Client };
      mutateEdit(d);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Modifier Client "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom & Prénom"
                required
                name="fullName"
                size="small"
                onChange={handleChange}
                value={Client.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="N° Téléphone"
                name="numTelephone"
                size="small"
                onChange={handleChange}
                value={Client.numTelephone}
                error={ErrorPhone}
                helperText={ErrorPhone ? "Numéro telephone  déja existe" : ""}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                size="small"
                onChange={handleChange}
                value={Client.email}
                error={ErrorEmail}
                helperText={ErrorEmail ? "Email déja existe" : ""}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                label="Pays"
                name="pays"
                size="small"
                required
                onChange={handleChange}
                value={Client.pays}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                multiline
                rows={3}
                label="Note"
                name="note"
                size="small"
                required
                onChange={handleChange}
                value={Client.note}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Modifier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalEditClient;

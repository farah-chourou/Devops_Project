/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useQuery } from "react-query";

// @mui
import {
  Typography,
  Card,
  Stack,
  CardContent,
  IconButton,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteModal from "../Modals/DeleteModal";
import { doMutation } from "../../../utils/mutation";
import typeAbonnServices from "../../../services/typeAbonnServices";
import Loading from "../../../layouts/loading/Loading";

function TypeAbonnTabs() {
  const [Label, setLabel] = useState("");
  const handleClose = () => {
    setPopup({ open: false, type: "", row: typeAbonnData });
  };
  const {
    data: typeAbonnData,
    isLoading,
    isError,
    error,
  } = useQuery("typeAbonnData", typeAbonnServices.getAll);
  const { mutate } = doMutation(
    "Error message if any",
    "Type abonnement ajouté avec succès",
    "typeAbonnData",
    (data) => typeAbonnServices.add(data),
    handleClose
  );
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: typeAbonnData,
    other: "Type Abonnement",
  });
  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "deleteDevice",
      value: row,
      other: "Type Abonnement",
    });
  };

  const onAdd = (e) => {
    e.preventDefault();
    console.log(Label);
    try {
      mutate({ label: Label });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <Paper>
        <Loading />
      </Paper>
    );
  }

  return (
    <div>
      {" "}
      <form onSubmit={(e) => onAdd(e)}>
        <Stack direction="row" alignItems="center" mb={2} spacing={3}>
          <TextField
            id="outlined-basic"
            label="Ajouter ICI"
            variant="outlined"
            sx={{ width: "100%" }}
            size="small"
            color="primary"
            focused
            name="Label"
            value={Label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            type="submit"
          >
            Ajouter
          </Button>
        </Stack>
      </form>
      <Grid container spacing={3}>
        {typeAbonnData?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: 2,
                backgroundColor: "light",
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  backgroundColor: "#FAFBFC",
                  boxShadow: 8,
                  transform: "scale(1.05)",
                },
                "&:hover .show-on-hover": {
                  opacity: 1,
                },
              }}
            >
              <CardContent alignItems="center">
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1" align="right">
                    {item.label}
                  </Typography>
                  <IconButton
                    align="left"
                    className="show-on-hover"
                    sx={{
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    onClick={() => openDelete(item)}
                  >
                    <AutoDeleteIcon color="error" />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {popup.type === "deleteDevice" && (
        <DeleteModal popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default TypeAbonnTabs;

/* eslint-disable prefer-template */
/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// @mui
import {
  Typography,
  Container,
  Stack,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TextField,
  MenuItem,
  Box,
  tableCellClasses,
  TablePagination,
  InputLabel,
  FormControl,
  OutlinedInput,
  Tooltip,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";
import ModalAddDeveloper from "./Modals/ModalAddAbonn";
import ModalDelete from "./Modals/ModalDelete";
import ModalEditDeveloper from "./Modals/ModalEditAbonn";
import abonnServices from "../../services/abonnementServices";
import { fDate } from "../../utils/formatTime";
import Loading from "../../layouts/loading/Loading";
import { roles } from "../../custom/roles";
import ModalConfirmEdit from "./Modals/ModalConfirmEdit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#06142A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Filter = [
  {
    value: "application",
    label: "Application",
  },
  {
    value: "adresseMac",
    label: "Adresse MAC",
  },
  {
    value: "dateDebut",
    label: "Date Début",
  },
  {
    value: "dateFin",
    label: "Date Fin",
  },

  {
    value: "clientID",
    label: "Nom Client",
  },
];
function index() {
  const { user } = useSelector((state) => state.auth);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: null,
  });
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: abonnData,
    isLoading,
    isError,
    error,
  } = useQuery("abonnData", abonnServices.getAll);

  const openAdd = () => {
    setPopup({ open: true, type: "add" });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };
  const openConfirmUpdatPai = (item) => {
    setPopup({ open: true, type: "editPai", value: item });
  };

  const openShow = (id) => {
    navigate(`/app/gestion_abonnements/details/${id}`);
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      value: row,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: null });
  };

  const filteredData = abonnData?.filter((item) => {
    if (filterValue === "") {
      return true;
    }
    if (filterValue === "application") {
      return item.application.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "adresseMac") {
      return item.adresseMac.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "dateDebut") {
      return item.dateDebut.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "dateFin") {
      return item.dateFin.toLowerCase().includes(searchText.toLowerCase());
    }

    if (filterValue === "clientID") {
      return item.clientID.nom.toLowerCase().includes(searchText.toLowerCase());
    }
    return true;
  });

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const pageData = filteredData?.slice(startIndex, endIndex);
  return (
    <Container>
      <Helmet>
        <title> Gestion abonnements </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Liste des abonnements
        </Typography>
        {user?.role === roles.SUPER_ADMIN ? (
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => openAdd()}
          >
            Nouveau abonnements
          </Button>
        ) : (
          ""
        )}
      </Stack>
      <Stack direction="row" alignItems="center" mb={5}>
        <Box>
          <FormControl fullWidth sx={{ mr: 1, width: 250 }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">
              Rechercher
            </InputLabel>
            <OutlinedInput
              startAdornment={<SearchIcon position="start">$</SearchIcon>}
              label="Amount"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <TextField
            id="outlined-select-currency"
            select
            label="Filtre"
            size="small"
            sx={{ width: 150 }}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            {Filter.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>
      {isLoading ? (
        <Paper>
          <Loading />
        </Paper>
      ) : (
        <Paper>
          <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
            <Table sx={{ minWidth: 500 }} stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <b>Etat </b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b> Client </b>
                  </StyledTableCell>

                  <StyledTableCell>
                    <b> Application</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Adresse Mac </b>
                  </StyledTableCell>
                  <StyledTableCell>
                    {" "}
                    <b> Date De Début</b>{" "}
                  </StyledTableCell>
                  <StyledTableCell>
                    {" "}
                    <b> Date De Fin </b>{" "}
                  </StyledTableCell>

                  <StyledTableCell padding="none">
                    {" "}
                    <b> Autre </b>{" "}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData?.map((item) => (
                  <StyledTableRow key={item._id} hover>
                    <TableCell>
                      {" "}
                      <Chip
                        size="small"
                        label={
                          item?.etatPaiement === "PAIED" ? "Payé" : "Non Payé"
                        }
                        color={
                          item?.etatPaiement === "PAIED" ? "success" : "error"
                        }
                      />{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Link
                        to={`/app/gestion_clients/details/${item?.clientID?._id}`}
                      >
                        {item?.clientID?.fullName}
                      </Link>{" "}
                    </TableCell>
                    <TableCell>{item.application}</TableCell>
                    <TableCell padding="none">{item.adresseMac}</TableCell>{" "}
                    <TableCell>{fDate(item.dateDebut)}</TableCell>
                    <TableCell>{fDate(item?.dateFin)} </TableCell>
                    <TableCell padding="none">
                      {user?.role === roles.SUPER_ADMIN ? (
                        <>
                          <Tooltip title="Supprimer">
                            <IconButton
                              onClick={() => openDelete(item)}
                              color="primary"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Modifier Paiement">
                            <IconButton
                              onClick={() => openConfirmUpdatPai(item)}
                              color="primary"
                            >
                              <RequestQuoteIcon />
                            </IconButton>
                          </Tooltip>
                          {/*  <Tooltip title="Modifier">
                            <IconButton
                              onClick={() => openUpdate(item)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip> */}
                        </>
                      ) : (
                        <Tooltip title="Modifier Paiement">
                          <IconButton
                            onClick={() => openConfirmUpdatPai(item)}
                            color="primary"
                          >
                            <RequestQuoteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Voir Détails">
                        <IconButton
                          onClick={() => openShow(item?._id)}
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>{" "}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage="Ligne par page"
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiTablePagination-menuItem  ":
                {
                  marginTop: 1,
                },
              " .MuiTablePagination-displayedRows ": {
                marginTop: 2,
              },
            }}
          />{" "}
        </Paper>
      )}
      {popup.type === "add" && (
        <ModalAddDeveloper popup={popup} handleClose={handleClose} />
      )}

      {popup.type === "delete" && (
        <ModalDelete popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <ModalEditDeveloper popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "editPai" && (
        <ModalConfirmEdit popup={popup} handleClose={handleClose} />
      )}
    </Container>
  );
}

export default index;

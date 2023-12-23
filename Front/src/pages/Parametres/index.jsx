/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import PropTypes from "prop-types";

// @mui
import {
  Typography,
  Tab,
  Tabs,
  Card,
  Stack,
  CardContent,
  IconButton,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeviceTabs from "./Tabs/DeviceTabs";
import TypeAbonnTabs from "./Tabs/TypeAbonnTabs";
import ServicePaiementTabs from "./Tabs/ServicePaiementTabs";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function index() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Paramétre
        </Typography>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Device" {...a11yProps(0)} />
          <Tab label="Type Abonnement" {...a11yProps(1)} />
          <Tab label="Service de paiement" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DeviceTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TypeAbonnTabs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ServicePaiementTabs />
      </CustomTabPanel>
    </Box>
  );
}

export default index;

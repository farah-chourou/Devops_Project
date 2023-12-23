import Person2Icon from "@mui/icons-material/Person2";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ExposureIcon from "@mui/icons-material/Exposure";
import GroupIcon from "@mui/icons-material/Group";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BorderColorIcon from "@mui/icons-material/BorderColor"; // component
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import SvgColor from "../../../components/svg-color";
import { roles } from "../../../custom/roles";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Gestion Des Clients",
    path: "/app/gestion_clients",
    icon: <GroupIcon />,
    role: roles.ALL,
  },
  {
    title: "Gestion Des Abonnements",
    path: "/app/gestion_abonnements",
    icon: <CardMembershipOutlinedIcon />,
    role: roles.ALL,
  },
  {
    title: "Paramètres",
    path: "/app/parametre",
    icon: <SettingsSuggestSharpIcon />,
    role: roles.SUPER_ADMIN,
  },

  {
    /*
    title: "Saisir Tache",
    path: "/app/saisir_tache",
    icon: <BorderColorIcon />,
    role: roles.DEVELOPER,
*/
  },
];

export default navConfig;

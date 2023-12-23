const roles = {
  ALL: "ALL",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

const isAll = () => {
  return true;
};
const isADMIN = (user) => {
  return user?.role === roles.ADMIN;
};

const isSUPERADMIN = (user) => {
  return user?.role === roles.SUPER_ADMIN;
};
module.exports = {
  roles,
  isAll,
  isADMIN,
  isSUPERADMIN,
};

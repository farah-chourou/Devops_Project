import axios from "../custom/axios";

const API_URL = "/api/ServicePaiement/";

const getAll = () => axios.get(`${API_URL}getAll`).then((r) => r.data.data);

const add = (data) => axios.post(`${API_URL}add`, data);
const deleteService = (id) => axios.delete(`${API_URL}delete/${id}`);

const servicePaiementServices = {
  getAll,
  add,
  deleteService,
};

export default servicePaiementServices;

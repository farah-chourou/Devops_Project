import axios from "../custom/axios";

const DYNAMIC_URL = "/api/Abonnement/";
const API_URL = "/abonnnement/";

const getAll = () => axios.get(`${DYNAMIC_URL}getAll`).then((r) => r.data.data);
const getOne = (id) =>
  axios.get(`${DYNAMIC_URL}getOne/${id}`).then((r) => r.data.data);

const add = (data) => axios.post(`${API_URL}add`, data);
const deleteAbonn = (id) => axios.delete(`${DYNAMIC_URL}delete/${id}`);

const update = (data) => {
  const { _id, d } = data;
  return axios.put(`${DYNAMIC_URL}update/${_id}`, data.d);
};
const getAllByClientID = (id) =>
  axios.get(`${API_URL}getByClientID/${id}`).then((r) => r.data.data);

const abonnementServices = {
  getAll,
  add,
  update,
  deleteAbonn,
  getOne,
  getAllByClientID,
};

export default abonnementServices;

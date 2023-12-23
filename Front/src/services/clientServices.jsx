import axios from "../custom/axios";

const API_URL = "/api/Client/";

const getAll = () => axios.get(`${API_URL}getAll`).then((r) => r.data.data);
const getOne = (id) =>
  axios.get(`${API_URL}getOne/${id}`).then((r) => r.data.data);

const add = (data) => axios.post(`${API_URL}add`, data);
const deleteClient = (id) => axios.delete(`${API_URL}delete/${id}`);

const update = (data) => {
  const { _id, clientData } = data;
  console.log(data.clientData);
  return axios.put(`${API_URL}update/${_id}`, data.clientData);
};

const clientServices = {
  getAll,
  add,
  update,
  deleteClient,
  getOne,
};

export default clientServices;

import axios from "../custom/axios";

const API_URL = "/api/TypeAbon/";

const getAll = () => axios.get(`${API_URL}getAll`).then((r) => r.data.data);

const add = (data) => axios.post(`${API_URL}add`, data);
const deleteTypeAbon = (id) => axios.delete(`${API_URL}delete/${id}`);

const typeAbonnServices = {
  getAll,
  add,
  deleteTypeAbon,
};

export default typeAbonnServices;

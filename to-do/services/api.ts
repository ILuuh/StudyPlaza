import {create} from "axios";

const api = create({
  baseURL: "http://192.168.10.45:3000",
});

export default api;
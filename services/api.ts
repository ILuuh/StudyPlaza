import {create} from "axios";

const api = create({
  baseURL: "http://192.168.10.42:3000",
});

export default api;
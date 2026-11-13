import {create} from "axios";

const api = create({
  baseURL: "http://192.168.3.9:3500",
});

export default api;
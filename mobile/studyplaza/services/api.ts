import {create} from "axios";

const api = create({
  baseURL: "http://192.168.14.234:3500",
});

export default api;
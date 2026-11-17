import {create} from "axios";

const api = create({
  baseURL: "http://192.168.14.234:3000",
});

export default api;
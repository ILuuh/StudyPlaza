import {create} from "axios";

const api = create({
  baseURL: "http://10.0.0.233:4001",
});

export default api;
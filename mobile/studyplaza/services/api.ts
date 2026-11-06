import {create} from "axios";

const api = create({
  baseURL: "http://10.33.4.26:3000",
});

export default api;
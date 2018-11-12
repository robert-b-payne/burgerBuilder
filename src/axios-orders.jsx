import axios from "axios";

const instance = axios.create({
  baseURL: "https://superburgerbuilder.firebaseio.com/"
});

instance.interceptors.request.use(req => {
  console.log("axios request interceptor:");
  console.log(req);
  return req;
});
instance.interceptors.response.use(res => {
  console.log("axios response interceptor");
  console.log(res);
  return res;
});

export default instance;

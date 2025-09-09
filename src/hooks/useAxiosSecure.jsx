import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/authInfo/provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  // request interceptor to add authorization header for secre call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log(token);
      config.headers.authorization = `Bearer ${token}`;
      console.log("request by interceptors", token);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const message = error.response.message;
      console.log("Status error in the interceptors", message);
      // for 401 and 403 logout the user and move the user to login page
      // if (status === 401 || status === 403) {
      if (message === "unAuthorized Access!") {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;

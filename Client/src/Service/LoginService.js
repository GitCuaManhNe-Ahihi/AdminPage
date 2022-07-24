import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://baochicuocsong.herokuapp.com/api/v1/",
});

export const loginService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance 
      .post("login", data)
      .then((res) => {
        resolve({accesstoken:res.headers["authorization"]});
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
export const forgetService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance 
      .post("forget", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const AuthService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance 
      .get("auth/token", {headers:{Authorization: `Bearer ${data}`}})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

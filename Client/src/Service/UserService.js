import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:6887/api/v1/",
});

export const statisticalPostOfUser = async (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`article/sum/id`, { params: { id } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUserService = async (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`user`, { params: { id } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllUserService = async (...api) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(...api)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addUserService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`user`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const forgetPasswordService = async (email) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`user/password`, { params: { email } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const changePasswordService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .patch(`user/password`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUserService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .patch(`user`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

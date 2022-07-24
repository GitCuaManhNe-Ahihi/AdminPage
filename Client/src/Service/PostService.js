import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://baochicuocsong.herokuapp.com/api/v1/",
});
export const postService = async (...api) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(...api)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
export const yourPostService = async (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("article/own", {params: {id:id}})
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
export const postArticle = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("article/new", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const deletePostService = async (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`article`,{params:{id}})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const editPostService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put("article", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const browseService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .patch("article/browser", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const statisticalFollowGenresService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("statisticalgenres")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const statisticalFollowMonthService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("statisticalmonth")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const countService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("article/sum")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadImageService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("picture", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteImageService = async (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete("picture",{params:{id:data}})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
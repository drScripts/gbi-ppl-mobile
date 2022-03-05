import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://823a-103-121-197-106.ngrok.io/api",
});

export const get = async ({ pathUrl }) => {
  const returner = {
    data: "",
    status: 0,
    message: "",
  };
  try {
    const { data, status } = await axiosInstance.get(pathUrl);

    returner.data = data;
    returner.status = status;
  } catch (e) {
    returner.data = e.response.data;
    returner.status = e.response.status;
    returner.message = e.message;
  }
  return returner;
};

export const post = async ({ pathUrl, postData }) => {
  const returner = {
    data: "",
    status: 0,
    message: "",
  };

  try {
    const { data, status } = await axiosInstance.post(pathUrl, postData);

    returner.data = data.data;
    returner.status = status;
  } catch (e) {
    returner.data = e.response.data.data;
    returner.status = e.response.data.meta.code;
    returner.message = e.response.data.meta.message ?? e.message;
  }

  return returner;
};

export const postWithAuth = async ({ pathUrl, postData, token }) => {
  const returner = {
    data: "",
    status: 0,
    message: "",
  };

  try {
    const { data, status } = await axiosInstance.post(pathUrl, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    returner.data = data.data;
    returner.status = status;
  } catch (e) {
    returner.data = e.response.data.data;
    returner.status = e.response.data.meta.code;
    returner.message = e.response.data.meta.message ?? e.message;
  }

  return returner;
};

export const getWithAuth = async ({ urlPath, token }) => {
  const returner = {
    data: "",
    status: 0,
    message: "",
  };

  try {
    const { data, status } = await axiosInstance.get(urlPath, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    returner.data = data.data;
    returner.status = status;
  } catch (e) {
    returner.data = e.response.data.data;
    returner.status = e.response.data.meta.code;
    returner.message = e.response.data.meta.message ?? e.message;
  }
  return returner;
};

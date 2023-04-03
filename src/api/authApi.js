import axios from "axios";

export const userSignup = async (userdata) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup/`, userdata, config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const loginUser = async (userdata) => {
  console.log("p_URL",process.env.REACT_APP_BASE_URL);
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login/`, userdata, config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/forgetpassword/`,
      {
        email: email,
      },
      config
    );
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const changePasswordApi = async (data) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/password-change/`,
     data,
      config
    );
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
import axios from "axios";
import { BASE_URL } from "../constant/constant";

export const userSignup = async (userdata) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`${BASE_URL}/user/signup/`, userdata, config);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userdata) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`${BASE_URL}/user/login/`, userdata, config);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      const res = await axios.get(`${BASE_URL}/user/logout/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

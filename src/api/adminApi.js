import axios from "axios";

export const sendMail = async (email) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/admin/send_mail/`,
      {
        email: email,
      },
      config
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const adminSignup = async (admindata) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/admin/signup_admin/`,
      admindata,
      config
    );
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const validateToken = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/validate_token/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

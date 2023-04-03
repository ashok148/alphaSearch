import axios from "axios";

export const getCompanyList = async (token, page, rowsPerPage) => {
  try {
    if (token) {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/company/all/?page_size=${rowsPerPage}&page_num=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getCompanyDetail = async (token, companyId) => {
  try {
    if (token) {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/company/?Company_ID=${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateCompanyDetail = async (token, companyId, companydata) => {
  try {
    if (token) {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/company/?Company_ID=${companyId}`,
        companydata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const deleteCompany = async (token, companyId) => {
  try {
    if (token) {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/company/?Company_ID=${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

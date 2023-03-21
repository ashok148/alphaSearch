import axios from "axios";
const BASE_URL = "http://34.247.201.223:8083"

export const companyListApi = async () => {
  try {
    const token = await localStorage.getItem('authToken');
    if (token) {
      const res = await axios.get(`${BASE_URL}/company_list`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res;
    } 
  } catch (error) {
    console.log(error);
  }
};
export const elasticSearchApi = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/search/elastic/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLocationApi = async () => {
  try {
    const token = await localStorage.getItem('authToken');
    if (token) {
      const res = await axios.get(`${BASE_URL}/locations/`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res;
    }  
  } catch (error) {
    console.log(error);
  }
};

export const getOperationModel = async () => {
  try {
    const token = await localStorage.getItem('authToken');
    if (token) {
      const res = await axios.get(`${BASE_URL}/operating_model/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";

export const elasticSearchApi = async (
  token,
  location,
  includeTerm,
  excludeTerm,
  revenue,
  employee,
  includeIndustry,
  excludeIndustry,
  page,
  rowsPerPage
) => {
  console.log("includeIndustry", includeIndustry.join(","));
  try {
    if (token) {
      const res = await axios.get(
        `${
          process.env.REACT_APP_SEARCH_BASE_URL
        }/search/elastic/?Locations=${location.join(
          ","
        )}&Terms_include=${includeTerm.join(
          ","
        )}&Terms_exclude=${excludeTerm.join(",")}&Revenue_start=${
          revenue[0]
        }&Revenue_end=${revenue[1]}&Employees_start=${
          employee[0]
        }&Employees_end=${employee[1]}&Industry_include=${includeIndustry.join(
          ","
        )}&Industry_exclude=${excludeIndustry.join(
          ","
        )}&page_size=${rowsPerPage}&page_num=${page * rowsPerPage}`,
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

export const getLocationApi = async (token) => {
  try {
    if (token) {
      const res = await axios.get(
        `${process.env.REACT_APP_SEARCH_BASE_URL}/locations/`,
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

export const getOperationModel = async (token) => {
  try {
    if (token) {
      const res = await axios.get(
        `${process.env.REACT_APP_SEARCH_BASE_URL}/operating_model/`,
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

export const operatingModelApi = async (token, industry) => {
  try {
    if (token) {
      const res = await axios.post(
        `${process.env.REACT_APP_SEARCH_BASE_URL}/operating_model`,
        {
          industry: industry,
        },
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

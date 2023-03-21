import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ListCard from "../components/company/ListCard";
import FilterSection from "../components/company/FilterSection";
import { companyListApi } from "../api/searchApi";
import MainLayout from "../components/layouts/MainLayout";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: 3,
  paddingTop: "20px",
  paddingBottom: 0,
}));

const CompanyList = () => {
  const [detail, setDetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const Companies = detail?.map((item) => {
    return item["_source"]
  }
  );
  const filteredCompanies = Companies?.filter((company) =>
    company.Company_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterChange = (filterCriteria) => {
    // fetchData(filterCriteria);
  }
  
  useEffect(() => {
    const handleApi = async () => {
      const res = await companyListApi();
      if (res) {
        setDetail(res?.data)
      }
  }
    handleApi();
  }, [])

  return (
    <MainLayout
      search={searchQuery}
      setSearch={setSearchQuery}>
      <Container
        sx={{ pt: 9, bgcolor: "#F2F3F4" }}
      >
        <Wrapper>
          <FilterSection
            handleFilterChange={handleFilterChange}
          />
          <Grid
            style={{
              width: "70%",
              marginLeft: "340px",
            }}
          >
            {filteredCompanies?.map((company, key) => (
              <ListCard
                key={key}
                company={company}
              />
            ))}
          </Grid>
        </Wrapper>
      </Container>
    </MainLayout>
  );
};

export default CompanyList;

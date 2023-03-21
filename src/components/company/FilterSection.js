import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
  Box,
  Grid,
  InputBase,
  Slider,
  Popover,
  Checkbox,
  Autocomplete,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import MultiSearch from "../MultiSearch";
import { getLocationApi, getOperationModel } from "../../api/searchApi";

const PaperWraper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 320,
  maxHeight: 500,
  bgcolor: "background.paper",
  position: "fixed",
  overflowY: "scroll",
}));
const GridWraper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "1px solid #d7dbdd",
  position: "sticky",
  top: 0,
  zIndex: "1",
  background: "#fff",
}));
const Search = styled("div")(({ theme }) => ({
  borderRadius: "4px",
  border: "0.5px solid #D7DBDD",
  backgroundColor: "#F2F3F4",
  display: "flex",
  alignItems: "center",
  width: "278px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "3px 3px 3px 6px",
  height: "100%",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "3px 3px 3px 6px",
    paddingLeft: `8px`,
    maxWidth: "100%",
  },
}));
const popupStyle = {
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: "20px",
  marginTop: "10px",
  cursor: "pointer",
};
const InputBox = styled(InputBase)(({ theme }) => ({
  border: "0.5px solid #D7DBDD",
  backgroundColor: "#F2F3F4",
  borderRadius: "5px",
  "& .css-yz9k0d-MuiInputBase-input": {
    textAlign: "center !mportant",
  },
}));
const SizeFilterBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  alignItems: "center",
}));
const ListItem = styled("span")(({ theme }) => ({
  fontWeight: "600",
  color: "#909497",
  fontFamily: "Ubuntu,sans-serif",
  fontSize: "12px",
}));

export default function FilterSection({ handleFilterChange }) {
  const [revenue, setRevenue] = useState([0, 5000000]);
  const [employee, setEmployee] = useState([0, 100000]);
  const [location, setLocation] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [operationModel, setOperationModel] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const locationData = locationList?.map((location) => location?.key);
  const operationModelData = operationModel?.map((data) => data?.key);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredList = operationModelData?.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelect = (event, newValue) => {
    setLocation(newValue);
    handleFilterChange(location);
  };
  const handleRevenue = (event, newValue) => {
    setRevenue(newValue);
  };
  const handleEmployee = (event, newValue) => {
    setEmployee(newValue);
  };
  function valuetext(value) {
    return `$${value.toLocaleString()}`;
  }
  function valueLableFormat(value) {
    return `${value.toLocaleString()}`;
  }

  useEffect(() => {
    try {
      getLocationApi().then((res) => {
        setLocationList(res?.data);
      });
      getOperationModel().then((res) => {
        setOperationModel(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setLocationList, setOperationModel]);

  return (
    <PaperWraper elevation={3}>
      <List
        component="nav"
        subheader={
          <GridWraper>
            <Typography variant="h6">Filters</Typography>
            <MoreVertIcon />
          </GridWraper>
        }
      >
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>TERMS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Include these terms</p>
              <MultiSearch />
              <p>Exclude these terms</p>
              <MultiSearch />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>OPERATING MODEL</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <span>Industry</span>
              <p>Include</p>
              <Search onClick={handleSearchClick}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#00a3d0" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  disabled
                />
              </Search>
              <p>Exclude</p>
              <Search onClick={handleSearchClick}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#00a3d0" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  disabled
                />
              </Search>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleSearchClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 3, width: 500, height: 300 }}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: "#00a3d0" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search classification"
                      inputProps={{ "aria-label": "search" }}
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <ClearIcon
                      fontSize="2px"
                      onClick={() => setSearchQuery("")}
                    />
                  </Search>
                  {filteredList?.map((item, key) => {
                    return (
                      <div style={popupStyle}>
                        <Checkbox />
                        <ListItem key={key}>
                          {item}
                        </ListItem>
                      </div>
                    );
                  })}
                </Box>
              </Popover>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>LOCATION</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Autocomplete
                multiple
                id="tags-outlined"
                value={location}
                onChange={handleSelect}
                options={locationData}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" />
                )}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>SIZE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Revenue</p>
              <SizeFilterBox>
                <span>Min</span>
                <InputBox defaultValue={"$0"} />-<span>Max</span>
                <InputBox defaultValue={"$ 5 Million"} />
              </SizeFilterBox>
              <Box>
                <Slider
                  min={0}
                  max={5000000}
                  step={1000}
                  value={revenue}
                  onChange={handleRevenue}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valuetext}
                />
              </Box>
              <p>Employee</p>
              <SizeFilterBox>
                <span>Min</span>
                <InputBox defaultValue={"0"} />-<span>Max</span>
                <InputBox defaultValue={"100,000+"} />
              </SizeFilterBox>
              <Box>
                <Slider
                  min={0}
                  step={100}
                  max={100000}
                  value={employee}
                  onChange={handleEmployee}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueLableFormat}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </List>
    </PaperWraper>
  );
}

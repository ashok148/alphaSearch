import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Tab, Tabs } from "@mui/material";
import ListItem from "../ListItem";
import logoIcon from "../../assets/logoIcon.png";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/authSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "0.5px solid #D7DBDD",
  backgroundColor: "#F2F3F4",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    maxWidth: "100%",
    width: "450px",
    [theme.breakpoints.down('lg')]: {
      width: '26ch',
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#316ded",
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: "6px",
  marginRight: '20px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const TabWraper = styled(Tabs)(({ theme }) => ({
  // "&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
  //   color: "#000000 !important",
  fontWeight: 600,
  //   textTransform: "unset",
  // },
}));

export default function Header({ search, setSearch }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [value, setValue] = useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    logoutUser().then(() => dispatch(logout()));
    setAnchorEl(null);
    navigate("/");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Off</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "#fff" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}>
          <Box sx={{ display: "flex" }}>
            <StyledTypography variant="h5">
              <img src={logoIcon} alt="icon" width="30px" height="30px" />  Alpha Search
            </StyledTypography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#00a3d0" }} />
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                onChange={handleSearch}
                placeholder="Search a term, industry, or a specific company"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <TabWraper
              value={value}
              onChange={handleChange}
            >
              <Tab label="Search" />
              <Tab label="Lists" />
            </TabWraper>
            <ListItem />
            <IconButton size="large" onClick={handleProfileMenuOpen}>
              <PersonPinIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

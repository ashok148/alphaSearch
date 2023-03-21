import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Paper,
  TextField,
  Grid,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import StyledButton from "../../components/StyledButton";
import { sendMail } from "../../api/adminApi";
import CreateAdmin from "./CreateAdmin";
import { logout } from "../../redux/slices/auth/authSlice";
import { logoutUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardPaper = styled(Paper)`
  width: 70%;
  height: auto;
  min-height: 400px;
  padding: 20px;
  margin: 80px auto;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const FormContainer = styled(Container)`
  margin-top: "6px";
`;
const GridWraper = styled(Grid)`
  display: flex;
  /* height: 400px; */
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShow(false);
  };
  const handleInviteClick = () => {
    setOpen(false);
  };

  const handleCreateAdmin = () => {
    setOpen(true);
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    // Send API request to send email invite
    console.log("Sending invite to: ", email);
    try {
      const res = await sendMail(email);
      if (res.status === 200) {
        setShow(true);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async () => {
    const res = await logoutUser();
    if (res.status === 200) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <>
      <div style={{ textAlign: "end", margin: "10px" }}>
        <StyledButton
          label="logout"
          backgroundColor={"#000"}
          textColor="#fff"
          handleClick={() => handleClick()}
        />
      </div>
      <Typography variant="h4" sx={{ mb: 4, mt: 6, textAlign: "center" }}>
        Admin Dashboard
      </Typography>
      <DashboardPaper>
        <GridWraper container>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              borderRight: "0.5px solid #909497",
              pr: 1,
            }}
          >
            <Typography
              sx={{
                mb: 3,
                mt: 3,
                cursor: "pointer",
                color: `${open ? "#000" : "#00a3d0"}`,
                background: `${open ? "" : "#EBF7F6"}`,
                padding: "15px",
              }}
              onClick={handleInviteClick}
            >
              Send Invite
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                color: `${open ? "#00a3d0" : "#000"}`,
                background: `${open ? "#EBF7F6" : ""}`,
                padding: "15px",
              }}
              onClick={handleCreateAdmin}
            >
              Create Admin
            </Typography>
          </Grid>
          {open ? (
            <Grid item md={9}>
              <CreateAdmin />
            </Grid>
          ) : (
            <Grid item md={9}>
              <FormContainer maxWidth="xs">
                <form onSubmit={handleSendInvite}>
                  <TextField
                    sx={{ mb: 8, mt: 8 }}
                    fullWidth
                    required
                    variant="outlined"
                    placeholder="Email address"
                    label="user@example.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <StyledButton
                    fWidth={true}
                    label="Send invite  "
                    backgroundColor="#00a3d0"
                    textColor="#fff"
                    type="submit"
                  />
                </form>
              </FormContainer>
            </Grid>
          )}
        </GridWraper>
      </DashboardPaper>
      {show && (
        <Snackbar open={show} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="success">Invite sent.</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AdminDashboard;

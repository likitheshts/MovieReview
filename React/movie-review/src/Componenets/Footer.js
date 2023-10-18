import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function Footer() {
  return (
    <AppBar position="static" style={footerStyle}>
      <Toolbar>
        <Typography variant="h5">
          © {new Date().getFullYear()} Copyright - All rights reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

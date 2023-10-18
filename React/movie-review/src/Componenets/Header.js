import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const headerStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function Header() {
  return (
    <AppBar position="static" style={headerStyle}>
      <Toolbar>
        <Typography variant="h5">Movie Review App</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

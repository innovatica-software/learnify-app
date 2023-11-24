import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NotFoundImage from "./not-found.gif"; // Import the not-found image

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        overflow: "hidden",
      }}
    >
      <img
        src={NotFoundImage}
        alt="Page Not Found"
        style={{
          maxWidth: "100%",
          maxHeight: "80%",
          width: "auto",
          height: "auto",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

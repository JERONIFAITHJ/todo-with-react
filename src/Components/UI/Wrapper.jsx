import React from "react";
import { Grid } from "@mui/material";

export default function Wrapper({ children }) {
  return (
    <Grid
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "linear-gradient(90deg, #F1A7F1, #FAD0C4)",
        justifyContent: "center",
        alignItems: "center",
      }}
      container
    >
      <Grid
      xs={12}
      sm={11}
      md={10}
      lg={6}
        sx={{
          textAlign: "center",
          color: "	#666699",
          minHeight: "50vh",
          padding: '5vh 2vw',
          backgroundImage: "linear-gradient(90deg, #E8DBFC, #F8F9D2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 20px lightgray",
        }}
        item
      >
        {children}
      </Grid>
    </Grid>
  );
}

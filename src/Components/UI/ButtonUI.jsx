import React from "react";
import { Button, Typography } from "@mui/material";

export default function ButtonUI({ id, icon, desc, styles, clickHandler }) {
  const IconElement = React.cloneElement(icon, { style: { ...styles } });

  return (
    <Button
      sx={{
        backgroundImage: 'linear-gradient(90deg, #F1A7F1, #FAD0C4)',
        borderRadius: "5px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "	#666699",
        alignContent: "center",
        fontWeight: '700',
        width: {xs: '80%', sm: '60%', md: '60%',lg: '45%'},
        fontFamily: "Montserrat, sans-serif, Nunito, Solway !important",
      }}
      id={id}
      variant="contained"
      onClick={clickHandler}
    >
      {IconElement}
      <Typography variant="p" sx={{ fontSize: "1.5rem", minWidth: '80%', textAlign: 'center' }}>
        {desc}
      </Typography>
    </Button>
  );
}

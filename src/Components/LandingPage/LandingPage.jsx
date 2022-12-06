import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Wrapper from "../UI/Wrapper";

export default function LandingPage() {
  return (
    <Wrapper>
      <h1 style={{ fontSize: "2.5rem" }}>A simple todo built using ReactJS</h1>
      <h3 style={{ fontSize: "1.8rem" }}>
        <Link to="/auth">
          <span style={{ textDecoration: "underline", color: '#666999' }}>Sign in</span>{" "}
        </Link>
        to proceed!
      </h3>
    </Wrapper>
  );
}

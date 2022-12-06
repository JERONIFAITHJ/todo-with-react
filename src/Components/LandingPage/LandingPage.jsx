import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../UI/Wrapper";

export default function LandingPage() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log('RUN');
  //   if(JSON.parse(localStorage.getItem('USER_DATA'))){
  //     navigate('/todo-list');
  //   }
  // },[]);
  return (
    <Wrapper>
      <h1 style={{ fontSize: "2.5rem" }}>A simple todo built using ReactJS</h1>
      <h3 style={{ fontSize: "1.8rem" }}>
        <Link to={ JSON.parse(localStorage.getItem('USER_DATA')) ? '/todo-list' : "/auth"}>
          <span style={{ textDecoration: "underline", color: '#666999' }}>Sign in</span>{" "}
        </Link>
        to proceed!
      </h3>
    </Wrapper>
  );
}

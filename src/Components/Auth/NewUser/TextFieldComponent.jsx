import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function TextFieldComponent({
  setIsTyping,
  email,
  password,
  emailInputHandler,
  passwordInputHandler,
  isError,
  errVal,
  isNewUser,
  signInSubmitHandler,
  userName,
  setUserName,
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isNewUser && (
        <TextField
          type="text"
          value={userName}
          sx={{ width: "60%", fontSize: "30px !important", marginTop: "3vh" }}
          InputProps={{ style: { fontSize: "2rem" } }}
          placeholder="Enter your name here"
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
        />
      )}
      <TextField
        type="text"
        value={email}
        onChange={emailInputHandler}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        sx={{
          width: { xs: "80%", sm: "60%", md: "60%", lg: "60%" },
          fontSize: "30px !important",
          marginTop: "3vh",
        }}
        InputProps={{ style: { fontSize: "2rem" } }}
        placeholder="Enter your mail here"
        autoComplete="off"
      />
      <TextField
        type="password"
        value={password}
        onFocus={() => setIsTyping(true)}
        onChange={passwordInputHandler}
        onBlur={() => setIsTyping(false)}
        sx={{
          width: { xs: "80%", sm: "60%", md: "60%", lg: "60%" },
          fontSize: "30px !important",
          marginTop: "3vh",
        }}
        InputProps={{ style: { fontSize: "2rem" } }}
        placeholder="Enter your password here"
        autoComplete="off"
      />
      {isError && (
        <p style={{ marginTop: "20px", fontSize: "1.4rem" }}>{errVal}</p>
      )}
      {!isError && (
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            fontSize: "1.2rem",
            backgroundImage: "linear-gradient(90deg, #F1A7F1, #FAD0C4)",
            color: "	#666699",
            width: "30%",
            fontSize: "1.7rem",
          }}
          onClick={() =>
            isNewUser ? signInSubmitHandler(false) : signInSubmitHandler(true)
          }
        >
          Submit
        </Button>
      )}
    </div>
  );
}

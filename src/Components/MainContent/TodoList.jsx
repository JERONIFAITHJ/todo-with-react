import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import Wrapper from "../UI/Wrapper";
import { v4 as uuid } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import CheckboxListSecondary from "./TodoRender";

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState();
  const todoHandler = (e) => {
    setTodo(e.target.value);
  };

  const getData = async () => {
    const q = query(
      collection(db, "TodoData"),
      where("userID", "==", JSON.parse(localStorage.getItem("USER_DATA")).uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTodoList(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const addData = async (e) => {
    if (todo.length < 1) {
      return;
    }
    try {
      const uniqueId = uuid();
      await setDoc(doc(db, "TodoData", uniqueId), {
        uniqueId,
        todo,
        userID: JSON.parse(localStorage.getItem("USER_DATA")).uid,
        createdAt: new Date(),
        status: true,
      });
    } catch (error) {
      console.log(error);
    }
    setTodo("");
  };
  return (
    <Wrapper>
      <Typography
        variant="h1"
        sx={{
          fontSize: "2.5rem",
          fontWeight: "700",
          fontFamily: "Montserrat, sans-serif, Nunito, Solway !important",
        }}
      >
        {`${JSON.parse(localStorage.getItem("USER_DATA")).displayName}'s Todo`}
      </Typography>
      <div style={{ width: "100%", display: "flex", boxSizing: "border-box" }}>
        <TextField
          type="text"
          value={todo}
          autoComplete="off"
          onChange={todoHandler}
          placeholder="Todo"
          sx={{ width: { xs: "100%" },  }}
          InputProps={{ style: { fontSize: "2rem",  } }}
        />
        <Button
          onClick={addData}
          sx={{
            minWidth: "10%",
            fontSize: "1.6rem",
            borderColor: "pink",
            fontSize: "30px",
            color: "white",
            backgroundColor: "#666999 !important",
          }}
          variant="contained"
        >
          <AddIcon sx={{ fontSize: "3rem" }} />
        </Button>
      </div>
      {todoList && todoList.length > 0 ? (
        <CheckboxListSecondary todoList={todoList} />
      ) : todoList && todoList.length === 0 ? (
        <p style={{fontSize: '1.5rem'}}>YOU HAVE NOTHING TO DO? 😒</p>
      ) : (
        <p style={{fontSize: '1.5rem'}}>HOLD ON... 🔍</p>
      )}
    </Wrapper>
  );
}

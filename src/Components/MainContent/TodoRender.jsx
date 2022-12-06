import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export default function CheckboxListSecondary({ todoList }) {
  const handleToggle = async (value) => {
    const docRef = doc(db, "TodoData", value.uniqueId);
    try {
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, {
        status: !value.status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = (value) => async () => {
    try {
      await deleteDoc(doc(db, "TodoData", value.uniqueId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <List
      dense
      sx={{ width: "100%", backgroundColor: "#666999", borderRadius: "10px" }}
    >
      {todoList.sort((a, b) => a.createdAt - b.createdAt).map((value, i) => {
        const labelId = `checkbox-list-secondary-label-${i}`;
        return (
          <ListItem key={i} disablePadding>
            <ListItemButton sx={{ gap: "20px" }}>
              <Checkbox
                edge="end"
                sx={{ color: "white !important" }}
                checked={!value.status}
                onChange={() => handleToggle(value)}
                inputProps={{ "aria-labelledby": labelId }}
              />
              <div style={{ width: "100%" }}>
                <h1
                  style={{
                    color: "white",
                    wordWrap: "break-word",
                    maxWidth: "80%",
                    textDecoration: value.status ? 'unset' : 'line-through'
                  }}
                >
                  {value.todo}
                </h1>
              </div>
            </ListItemButton>
            <Button
              sx={{ margin: "0 10px", minWidth: "20px" }}
              onClick={deleteHandler(value)}
            >
              <CloseIcon sx={{ color: "white", fontSize: '2rem' }} />
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
}

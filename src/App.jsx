import { Button } from "@mui/material";
import { Fragment } from "react";
import AllRoutes from "./Pages/AllRoutes";
import "./App.css";
import UserContext from "./Components/Store/UserContext";

function App() {
  return (
    <Fragment>
      <UserContext>
        <AllRoutes />
      </UserContext>
    </Fragment>
  );
}

export default App;

import React, { Fragment, Suspense, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../Components/LandingPage/LandingPage";
import Wrapper from "../Components/UI/Wrapper";
import { UserInfoContext } from "../Components/Store/UserContext";
const AuthPage = React.lazy(() =>
  import("../Components/Auth/ExistingUser/AuthPage")
);
const TodoList = React.lazy(() => import("../Components/MainContent/TodoList"));

export default function AllRoutes() {
  const [login] = useContext(UserInfoContext);
  const LoggedIn = () => {
    if (login.isLoggedIn) {
      return <Outlet />;
    } else {
      return <Navigate to='/auth' />; 
    }
  };

  return (
    <Fragment>
      <Suspense fallback={<Wrapper><p style={{ fontSize: '1.5rem' }}>Loading... 🔍</p></Wrapper>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<LoggedIn />}>
            <Route path="/todo-list" element={<TodoList />} />
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

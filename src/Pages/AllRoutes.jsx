import React, { Fragment, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../Components/LandingPage/LandingPage";
import Wrapper from "../Components/UI/Wrapper";
// import AuthPage from "../Components/Auth/ExistingUser/AuthPage";
// import TodoList from "../Components/MainContent/TodoList";
const AuthPage = React.lazy(() =>
  import("../Components/Auth/ExistingUser/AuthPage")
);
const TodoList = React.lazy(() => import("../Components/MainContent/TodoList"));

export default function AllRoutes() {
  const LoggedIn = () => {
    if (true) {
      return <Outlet />;
    } else {
      return <p>Failed</p>;
    }
  };

  return (
    <Fragment>
      <Suspense fallback={<Wrapper>Loading...</Wrapper>}>
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

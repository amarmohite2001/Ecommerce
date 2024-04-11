import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdmin() && isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: "/user/profile",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminProtectedRoute;

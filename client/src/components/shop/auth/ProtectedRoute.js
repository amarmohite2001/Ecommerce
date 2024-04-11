import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticate() && !isAdmin() ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;

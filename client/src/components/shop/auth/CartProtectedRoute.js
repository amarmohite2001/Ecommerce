import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const CartProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      JSON.parse(localStorage.getItem("cart")).length !== 0 &&
      isAuthenticate() ? (
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

export default CartProtectedRoute;

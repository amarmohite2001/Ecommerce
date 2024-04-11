import React, { Fragment, useReducer } from "react";
import Rout from "./components";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

function App() {
  const [data, dispatch] = useReducer(layoutReducer, layoutState);
  return (
    <Fragment>
      <LayoutContext.Provider value={{ data, dispatch }}>
        <Rout />
      </LayoutContext.Provider>
    </Fragment>
  );
}

export default App;

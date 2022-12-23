import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import PlayingBar from "./components/PlayingBar/PlayingBar";
import UserContext from "./context/UserContext/UserContext";
import routes from "./routes/routes";

function App() {
  const userContext = useContext(UserContext);

  return (
    <>
      <NavBar>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.path === "/" ? (
                  <Navigate to="/login" />
                ) : (
                  <route.component />
                )
              }
            />
          ))}
        </Routes>
      </NavBar>
      {userContext.user && <PlayingBar />}
    </>
  );
}

export default App;

import React from "react";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import PlayingBar from "./components/PlayingBar/PlayingBar";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <NavBar>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </NavBar>
      <PlayingBar />
    </>
  );
}

export default App;

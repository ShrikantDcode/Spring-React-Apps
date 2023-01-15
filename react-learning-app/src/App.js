import React from "react";
import "./App.css";
import BasicFeatures from "./components/es6-features/BasicFeatures";
import HomePage from "./components/HomePage";
import VariableDeclaration from "./components/VariableDeclaration";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

function App() {
  return (
    <div>
      <HomePage />
      {/* <Routes>
        <Route path={"/"} element={<HomePage />} exact />
        <Route path={"/user-list"} element={<UserList />} exact />
      </Routes> */}
    </div>
  );
}

export default App;

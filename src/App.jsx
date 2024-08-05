import React from "react";

import { Route, Router, RouterProvider, Routes } from "react-router-dom";
import CodeRoom from "./pages/CodeRoom";
import Home from "./pages/Home";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/code" element={<CodeRoom />} />
    </Routes>
  );
};

export default App;

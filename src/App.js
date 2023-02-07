import React from 'react';
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/edit/:id" element={<Edit/>} />
        <Route  path="/" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
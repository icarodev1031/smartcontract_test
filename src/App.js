import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import HomePage from "./pages/Home";
function App() {

  const location = useLocation();
  
  return (
    <div className="App">
      <Menu title={location.pathname == "/" ? "" : "Home"}/>
      <div className="route-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
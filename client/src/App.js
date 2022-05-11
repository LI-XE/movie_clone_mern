import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} exact></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

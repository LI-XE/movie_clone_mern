import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import MovieDetailPage from "./screens/MovieDetailPage";
import MyFavoritedMovies from "./screens/MyFavoritedMovies";
import Profile from "./screens/Profile";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} exact></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage />}
              exact
            ></Route>
            <Route
              path="/favorite"
              element={<MyFavoritedMovies />}
              exact
            ></Route>
            <Route path="/profile/:id" element={<Profile />} exact></Route>
            <Route path="/register" element={<RegisterPage />} exact></Route>
            <Route path="/login" element={<LoginPage />} exact></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

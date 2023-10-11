import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Store/context";
import LikedItems from "./components/FIreBaseStore/LikedItems";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import SignIn from "./components/SignInForm/SignIn";
import SignUp from "./components/SignInForm/SignUp";
import SearchMovies from "./components/Movies/SerchedMovies/SearchMovies";
import MovieDetails from "./components/Movies/MovieDetails/MovieDetails";
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/likedlist" element={<LikedItems />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchMovies />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

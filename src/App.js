import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Store/context";
import LikedItems from "./components/FIreBaseStore/LikedItems";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import SignIn from "./components/SignInForm/SignIn";
import SignUp from "./components/SignInForm/SignUp";
function App() {
  const [searchData, setSearchData] = useState("");
  const onSetSearchData = (data) => {
    console.log(data);
    setSearchData(data);
  };
  return (
    <UserContextProvider>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Header search={onSetSearchData} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/likedlist" element={<LikedItems />} />
          <Route path="/home" element={<Home query={searchData} />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

import { useCallback, useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import SignIn from "./components/SignInForm/SignIn";
import Header from "./components/Header/Header";
import SignUp from "./components/SignInForm/SignUp";
import { UserContextProvider } from "./Store/contex";
import LikedItems from "./components/FIreBaseStore/LikedItems";
function App() {
  const [searchData, setSearchData] = useState();
  const onSetSearchData = (data) => {
    console.log(data);
    setSearchData(data);
  };
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <NavBar />
          <Header search={onSetSearchData} />
          <Routes>
            <Route path="/" element={<Home query={searchData} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/likedlist" element={<LikedItems />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;

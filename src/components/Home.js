import Header from "./Header/Header";
import Popular from "./Popular/Popular";
// import { useCallback, useState } from "react";
import { useState } from "react";
import SearchMovies from "./SerchedMovies/SearchMovies";
const Home = (props) => {
  let search;
  if (props.query) {
    search = <SearchMovies query={props.query} />;
  } else {
    search = <div></div>;
  }
  return (
    <>
      {/* <Header search={onSetSearchData} /> */}
      {/* <h2>Searched Movies</h2> */}
      {search}

      <h2>Popular Movies</h2>
      <Popular />
    </>
  );
};

export default Home;

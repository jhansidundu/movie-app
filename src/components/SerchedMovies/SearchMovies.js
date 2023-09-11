import axios from "axios";
// import { useState } from "react";
import { useState, useEffect } from "react";
import { AUTHTOKEN } from "../../constants";
import MovieCard from "../Movies/MovieCard/MovieCard";
import classes from "./SearchMov.module.css";
const SearchMovies = (props) => {
  console.log(props.query);
  const [searchResult, setSearchResult] = useState([]);
  let result = [];
  // let query = props.query;
  useEffect(() => {
    let url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      props.query +
      "&include_adult=false&language=en-US&page=1";
    console.log(url);
    const response = axios.get(url, {
      headers: {
        authorization: AUTHTOKEN,
      },
    });

    response.then((res) => {
      res = res.data;
      //   console.log(res);
      result = res["results"];
      setSearchResult(result);
      //   console.log(result);
      //   console.log(searchResult);
    });
  });

  return (
    <ul className={classes.box}>
      {searchResult.map((element) => (
        <li>
          <MovieCard element={element} />
        </li>
      ))}
    </ul>
  );
};
export default SearchMovies;

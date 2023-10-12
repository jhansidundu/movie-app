import axios from "axios";
import { useState, useEffect } from "react";
import { AUTHTOKEN, PROXY_URL } from "../../../constants";
import MovieCard from "../MovieCard/MovieCard";
import classes from "./SearchMov.module.css";
import { useSearchParams } from "react-router-dom";
const SearchMovies = () => {
  const [searchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const query = searchParams.get("q");
    const result = [];
    const url = `${PROXY_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    console.log(url);
    const response = axios.get(url, {
      headers: {
        authorization: AUTHTOKEN,
        // "Access-Control-Allow-Origin": "*",
      },
    });

    response.then((res) => {
      res = res.data;
      result.push(...res["results"]);
      setSearchResult(result);
    });
  });

  if (!searchResult || searchResult.length === 0) {
    return (
      <div className={classes.content}>
        <h5 className={`${classes["px-2"]} ${classes["pt-1"]}`}>
          There are no movies that matched your query.
        </h5>
      </div>
    );
  }

  return (
    <div className={`${classes.content} text-light`}>
      <h4 className="px-3 pt-2">Searched Movies</h4>

      <div className={classes.box}>
        {searchResult.map((element) => (
          <MovieCard key={element.id} element={element} />
        ))}
      </div>
    </div>
  );
};
export default SearchMovies;

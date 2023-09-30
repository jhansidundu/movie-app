import { useEffect, useState } from "react";
import classes from "./Popular.module.css";
import axios from "axios";
import { AUTHTOKEN } from "../../constants";
import MovieCard from "../Movies/MovieCard/MovieCard";
const Popular = () => {
  const [data, setData] = useState([]);
  let result = [];
  useEffect(() => {
    const response = axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          authorization: AUTHTOKEN,
        },
      }
    );

    response.then((res) => {
      res = res.data;
      result = res["results"];
      setData(result);
      // console.log(data);
    });
  }, []);

  return (
    <ul className={classes.box}>
      {data.map((element) => (
        <MovieCard element={element} id={element.id} />
      ))}
    </ul>
  );
};

export default Popular;

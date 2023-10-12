import { useEffect, useState } from "react";
import classes from "./Popular.module.css";
import axios from "axios";
import { AUTHTOKEN, PROXY_URL } from "../../../constants";
import MovieCard from "../MovieCard/MovieCard";
const Popular = () => {
  const [data, setData] = useState([]);
  let result = [];
  useEffect(() => {
    const response = axios.get(
      `${PROXY_URL}/movie/popular?language=en-US&page=1`,
      {
        headers: {
          authorization: AUTHTOKEN,
          // "Access-Control-Allow-Origin": "*",
        },
      }
    );

    response.then((res) => {
      res = res.data;
      result = res["results"];
      setData(result);
    });
  }, []);

  return (
    <div className={classes.content}>
      <h4 className={classes.title}>Popular Movies</h4>
      <ul className={classes.box}>
        {data.map((element) => (
          <MovieCard key={element.id} element={element} id={element.id} />
        ))}
      </ul>
    </div>
  );
};

export default Popular;

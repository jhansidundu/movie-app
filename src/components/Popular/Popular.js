import { useEffect, useState } from "react";
import classes from "./Popular.module.css";
import axios from "axios";
const Popular = () => {
  const [data, setData] = useState([]);
  let result = [];
  useEffect(() => {
    const response = axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTkyOWY0YmVkYWZjZTNkMDliY2YyNGY3Yzk1ODA1NSIsInN1YiI6IjY0YzRmYjNhY2FkYjZiMDEwNjZjYmU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbr9_n_HBlSNbKCc550a1RYwRTMxLJ1pl89hAl49dM0",
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
    <ul>
      {data.map((element) => (
        <img
          className={classes.Popular}
          src={`https://image.tmdb.org/t/p/w220_and_h330_face${element.backdrop_path}`}
        />
      ))}
    </ul>
  );
};

export default Popular;

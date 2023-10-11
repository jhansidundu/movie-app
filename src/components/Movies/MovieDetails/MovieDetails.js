import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Poster from "./Poster/Poster";
import Details from "./Details/Details";
import axios from "axios";
import { AUTHTOKEN } from "../../../constants";
import classes from "./MovieDetails.module.css";

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    async function fetchMovieDetails() {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const response = await axios(url, {
        headers: {
          Authorization: AUTHTOKEN,
        },
      });
      setMovie(response.data);
    }
    fetchMovieDetails();
  }, []);
  if (!movie) {
    return <></>;
  }
  return (
    <div className={classes["main-content"]}>
      <Poster backdropPath={movie.backdrop_path} />
      <Details movie={movie} />
    </div>
  );
}

export default MovieDetails;

import classes from "./Details.module.css";
import { AiFillStar } from "react-icons/ai";
import KeyValue from "./KeyValue/KeyValue";

function Details({ movie }) {
  const year = getYear(movie.release_date);
  function getYear(date) {
    const newDate = new Date(date);
    return newDate.getFullYear();
  }
  function getInHoursAndMins(mins) {
    const hours = parseInt(mins / 60);
    const minutes = mins % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${minutes}min`;
  }
  function calculateInMillions(money) {
    if (!money) return "Not Available";
    return `$${parseInt((money * 10) / 1000000) / 10} million`;
  }
  return (
    <div className={classes.details}>
      <div className={classes.header}>
        <div>
          <h2>{movie.original_title}</h2>
          <p className={classes.tagline}>{movie.tagline}</p>
          <div className={classes["color-grey"]}>
            <span className={`${classes["border-right"]} ${classes["pr-1"]}`}>
              {year}
            </span>
            <span
              className={`${classes["border-right"]} ${classes["px-1"]}`}
            >{`${getInHoursAndMins(movie.runtime)}`}</span>
            <span className={classes["pl-1"]}>
              {movie.adult ? "18+" : "14+"}
            </span>
          </div>
        </div>
        <div className={classes.rating}>
          <span>{Math.round(movie.vote_average * 10) / 10}</span>
          <AiFillStar color="yellow" />
        </div>
      </div>
      <div className={classes.synopsis}>
        <h4>Synopsis</h4>
        <p className={classes.overview}>{movie.overview}</p>
      </div>
      <div className={classes["key-info"]}>
        <KeyValue label="Status" value={movie.status} />
        <KeyValue label="Budget" value={calculateInMillions(movie.budget)} />
        <KeyValue label="Revenue" value={calculateInMillions(movie.revenue)} />
        <KeyValue
          label="Languages"
          value={movie.spoken_languages.map((m) => m.english_name).join(", ")}
        />
        <KeyValue
          label="Created by"
          value={movie.production_companies.map((m) => m.name).join(", ")}
        />
      </div>
    </div>
  );
}

export default Details;

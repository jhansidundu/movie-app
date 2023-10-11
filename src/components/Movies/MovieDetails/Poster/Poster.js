import Card from "../../../UI/Card/Card";
import classes from "./Poster.module.css";

function Poster({ backdropPath }) {
  const imageUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${backdropPath}`;
  return (
    <Card>
      <img className={classes["poster"]} src={imageUrl} />
    </Card>
  );
}

export default Poster;

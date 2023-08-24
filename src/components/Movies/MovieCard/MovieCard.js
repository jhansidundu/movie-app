import classes from "./MovieCard.module.css";
import Card from "./Card/Card";
const MovieCard = (props) => {
  return (
    <Card>
      <div>
        <div className={classes.img}>
          <img
            src={`https://image.tmdb.org/t/p/w220_and_h330_face${props.element.backdrop_path}`}
          />
        </div>
        <div>
          <div>{props.element.title}</div>
          <div>{props.element.overview}</div>
        </div>
      </div>
    </Card>
  );
};
export default MovieCard;

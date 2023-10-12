import classes from "./MovieCard.module.css";
import Card from "../../UI/Card/Card";
import image from "../../../assets/No_Image_Available.jpg";
import { useState } from "react";
import { collection, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import userContext from "../../../Store/context";
import { useContext } from "react";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router";

const MovieCard = (props) => {
  const context = useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [color, setColor] = useState("white-color");
  const navigate = useNavigate();

  const url = props.element.backdrop_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face${props.element.backdrop_path}`
    : image;
  const movieCollection = collection(db, "wishlist-movies");
  const goToMovieDetails = () => {
    navigate(`/movie/${props.element.id}`);
  };
  const onAddLike = async () => {
    if (color === "white-color") {
      await addDoc(movieCollection, {
        movieId: props.element.id,
        uid: context.uid,
      });
      setColor("red-color");
    } else {
      await deleteDoc(movieCollection, {
        movieId: props.element.id,
        uid: context.uid,
      });
      setColor("white-color");
    }
  };

  let likeButton;
  if (context.login) {
    likeButton = (
      <div onClick={onAddLike} className={`${classes[color]} ${classes.heart}`}>
        <BiHeart></BiHeart>
      </div>
    );
  } else {
    likeButton = <div></div>;
  }
  let date = props.element.release_date;
  console.log(date);
  const dateArr = date.split("-");
  console.log(dateArr);
  const newDate = dateArr.map((ele) => {
    return parseInt(ele);
  });
  console.log(newDate);

  // var date8 = new Date(newDate[0], newDate[1], newDate[2]);
  // console.log(date8);
  return (
    <Card class={classes["card-bg"]}>
      <div onClick={goToMovieDetails}>
        <div
          className={classes.image}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img className={classes.pic} src={url} />
          {isHovered && likeButton}
        </div>
        <div className={classes["card-body"]}>{props.element.title}</div>
      </div>
    </Card>
  );
};
export default MovieCard;

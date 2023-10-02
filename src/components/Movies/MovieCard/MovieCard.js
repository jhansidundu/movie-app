import classes from "./MovieCard.module.css";
import Card from "../../UI/Card/Card";
import image from "../../../assets/No_Image_Available.jpg";
import { useState } from "react";
import { collection, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import userContext from "../../../Store/context";
import { useContext } from "react";
import { BiHeart } from "react-icons/bi";

const MovieCard = (props) => {
  const context = useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [color, setColor] = useState("white-color");

  const url = props.element.backdrop_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face${props.element.backdrop_path}`
    : image;
  const movieCollection = collection(db, "wishlist-movies");
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

  return (
    <Card>
      <div
        className={classes.image}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img className={classes.pic} src={url} />
        {isHovered && likeButton}
      </div>
      <div className={classes["card-body"]}>{props.element.title}</div>
    </Card>
  );
};
export default MovieCard;

import classes from "./MovieCard.module.css";
import Card from "./Card/Card";
import image from "../../../assets/No_Image_Available.jpg";
import { useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../configure/firebase";
import userContext from "../../../Store/context";
import { useEffect } from "react";
import { useContext } from "react";
import { BiHeart } from "react-icons/bi";

import axios from "axios";
const MovieCard = (props) => {
  const context = useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [color, setColor] = useState("white-color");

  const url = props.element.backdrop_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face${props.element.backdrop_path}`
    : image;
  const movieCollection = collection(db, "wishlist-movies");
  const onAddLike = async () => {
    console.log(context.uid, props.element.id);
    await addDoc(movieCollection, {
      movieId: props.element.id,
      uid: context.uid,
    });
    setColor("red-color");
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

  // console.log(props.id);
  return (
    <Card>
      <div
        className={classes.image}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div>
          <img className={classes.pic} src={url} />

          {isHovered && likeButton}
        </div>
        <div>
          <div className="color:white">{props.element.title}</div>
          {/* <div>{props.element.overview}</div> */}
        </div>
      </div>
    </Card>
  );
};
export default MovieCard;

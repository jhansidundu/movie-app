import classes from "./MovieCard.module.css";
import Card from "./Card/Card";
import image from "../../../assets/No_Image_Available.jpg";
import { useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../configure/firebase";
import userContext from "../../../Store/contex";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
const MovieCard = (props) => {
  const context = useContext(userContext);
  console.log(props.element);
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
  };

  // console.log(props.id);
  return (
    <Card>
      <div className={classes.image}>
        <div>
          <button onClick={onAddLike}>like</button>
          <img className={classes.pic} src={url} />
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

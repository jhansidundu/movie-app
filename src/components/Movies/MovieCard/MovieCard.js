import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router";
import userContext from "../../../Store/context";
import image from "../../../assets/No_Image_Available.jpg";
import { db } from "../../../config/firebase";
import Card from "../../UI/Card/Card";
import classes from "./MovieCard.module.css";

const MovieCard = ({ element, isLiked = false, onDisLike = null }) => {
  const context = useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const navigate = useNavigate();

  const url = element.backdrop_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face${element.backdrop_path}`
    : image;
  const movieCollection = collection(db, "wishlist-movies");
  const goToMovieDetails = () => {
    navigate(`/movie/${element.id}`);
  };
  const onAddLike = async (e) => {
    console.log(e);
    e.stopPropagation();
    if (!liked) {
      await addDoc(movieCollection, {
        movieId: element.id,
        uid: context.uid,
      });
      setLiked(true);
    } else {
      const q = query(
        movieCollection,
        where("uid", "==", context.uid),
        where("movieId", "==", element.id)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.forEach((d) => {
        const docRef = doc(movieCollection, d.id);

        deleteDoc(docRef)
          .then(() => {
            setLiked(false);
            if (onDisLike) {
              onDisLike(element);
            }
          })
          .catch((error) => {
            console.error("Error deleting document: ", error);
          });
      });
    }
  };

  let likeButton;
  if (context.login) {
    likeButton = (
      <div
        onClick={onAddLike}
        className={`${classes.heart} ${liked ? "text-danger" : ""}`}
      >
        {liked ? <AiFillHeart /> : <BiHeart />}
      </div>
    );
  } else {
    likeButton = <div></div>;
  }

  function getDisplayTitle(title) {
    if (title.length < 25) return title;
    else return title.substring(0, 25);
  }
  return (
    <Card class={classes["card"]}>
      <div onClick={goToMovieDetails}>
        <div
          className={classes.image}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img className={classes.pic} src={url} />
          {isHovered && likeButton}
        </div>
        <div className={classes["card-body"]}>
          <div className="d-flex justify-content-between">
            <p className="m-0 pr-2">{getDisplayTitle(element.title)}</p>
            <span>
              <p className="d-inline text-warning">
                {Math.round(element.vote_average * 10) / 10}
              </p>
              /10
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default MovieCard;

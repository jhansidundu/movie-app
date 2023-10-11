import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import userContext from "../../Store/context";
import { db } from "../../config/firebase";
import { AUTHTOKEN } from "../../constants";
import MovieCard from "../Movies/MovieCard/MovieCard";
import classes from "./LikedItems.module.css";

function LikedItems() {
  const [likeData, setLiked] = useState([]);
  const context = useContext(userContext);
  useEffect(() => {
    let filterData = [];
    const getList = async () => {
      try {
        const movieCollection = collection(db, "wishlist-movies");
        const q = query(movieCollection, where("uid", "==", context.uid));
        const querySnapshot = await getDocs(q);

        filterData = querySnapshot.docs.map((doc) => doc.data());
      } catch (err) {
        console.log(err);
      }
      for (let record of filterData) {
        const response = axios.get(
          `https://api.themoviedb.org/3/movie/${record.movieId}?language=en-US`,
          {
            headers: {
              Authorization: AUTHTOKEN,
            },
          }
        );

        response.then((res) => {
          res = res.data;
          setLiked((prev) => {
            return [...prev, res];
          });
        });
      }
    };

    getList();
  }, [context.uid]);

  return (
    <>
      <h2 className={classes.heading}>Your Whishlist</h2>
      <div className={classes.box}>
        {likeData.map((element) => (
          <MovieCard key={element.id} element={element} />
        ))}
      </div>
    </>
  );
}
export default LikedItems;

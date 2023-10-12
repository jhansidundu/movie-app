import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import userContext from "../../Store/context";
import { db } from "../../config/firebase";
import { AUTHTOKEN } from "../../constants";
import MovieCard from "../Movies/MovieCard/MovieCard";
import classes from "./LikedItems.module.css";
import { PROXY_URL } from "../../constants";

function LikedItems() {
  const [likeData, setLiked] = useState([]);
  const context = useContext(userContext);

  function removeItem(item) {
    const movieId = likeData.findIndex((m) => (m.id = item.id));
    const movies = likeData.splice(movieId, 1);
    setLiked(movies);
  }

  useEffect(() => {
    let filterData = [];
    const getList = async () => {
      const movieCollection = collection(db, "wishlist-movies");
      try {
        const q = query(movieCollection, where("uid", "==", context.uid));
        const querySnapshot = await getDocs(q);

        filterData = querySnapshot.docs.map((doc) => doc.data());
      } catch (err) {
        console.log(err);
      }
      for (let record of filterData) {
        const response = axios.get(
          `${PROXY_URL}/movie/${record.movieId}?language=en-US`,
          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
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

  if (!likeData || likeData.length === 0) {
    return (
      <div className={classes.content}>
        <h5 className="px-4 pt-2">There are no movies whishlisted.</h5>
      </div>
    );
  }

  return (
    <div className={classes.content}>
      <h4 className={classes.heading}>Your Whishlist</h4>
      <div className={classes.box}>
        {likeData.map((element) => (
          <MovieCard
            key={element.id}
            element={element}
            isLiked={true}
            onDisLike={removeItem}
          />
        ))}
      </div>
    </div>
  );
}
export default LikedItems;

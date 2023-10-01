import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import userContext from "../../Store/context";
import { db } from "../../config/firebase";
import { AUTHTOKEN } from "../../constants";
import MovieCard from "../Movies/MovieCard/MovieCard";
import classes from "./LikedItems.module.css";

function LikedItems() {
  const movieCollection = collection(db, "wishlist-movies");
  const [likeData, setLiked] = useState([]);
  const context = useContext(userContext);

  useEffect(() => {
    let filterData = [];
    setLiked(() => {
      return [];
    });
    const getList = async () => {
      try {
        const data = await getDocs(movieCollection);

        filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      } catch (err) {
        console.log(err);
      }
      for (let record of filterData) {
        console.log(record);
        if (record.uid === context.uid) {
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
            console.log(res);
            setLiked((prev) => {
              return [...prev, res];
            });
          });
        }
      }
    };

    getList();
  }, []);

  return (
    <ul className={classes.box}>
      {likeData.map((element) => (
        <MovieCard key={element.id} element={element} />
      ))}
    </ul>
  );
}
export default LikedItems;

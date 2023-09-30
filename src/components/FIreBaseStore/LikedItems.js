import { useState } from "react";
import { AUTHTOKEN } from "../../constants";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../configure/firebase";
import { useEffect } from "react";
import axios from "axios";
import userContext from "../../Store/context";
import { useContext } from "react";
import classes from "./LikedItems.module.css";
import MovieCard from "../Movies/MovieCard/MovieCard";

function LikedItems() {
  const movieCollection = collection(db, "wishlist-movies");
  const [likeData, setLiked] = useState([]);
  const context = useContext(userContext);

  // useEffect(() => {
  //   const response = axios.get(
  //     `https://api.themoviedb.org/3/movie/${uid}?language=en-US`,
  //     {
  //       headers: {
  //         Authorization: AUTHTOKEN,
  //       },
  //     }
  //   );
  // }, []);

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
        // console.log(filterData);
        // setMovieList(filterData);
      } catch (err) {
        console.log(err);
      }
      for (let record of filterData) {
        console.log(record);
        if (record.uid === context.uid) {
          let result;
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
            // result = res["result"];
            setLiked((prev) => {
              return [...prev, res];
            });
          });
        }
      }
    };

    getList();
  }, []);

  // console.log(likeData);
  return (
    <ul className={classes.box}>
      {likeData.map((element) => (
        <li>
          <MovieCard element={element} />
        </li>
      ))}
    </ul>
  );
}
export default LikedItems;

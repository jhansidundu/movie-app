import Popular from "./Movies/Popular/Popular";
import SearchMovies from "./Movies/SerchedMovies/SearchMovies";
const Home = (props) => {
  let search;
  if (props.query) {
    search = <SearchMovies query={props.query} />;
  } else {
    search = <></>;
  }
  return (
    <>
      {search}
      <Popular />
    </>
  );
};

export default Home;

import Popular from "./Movies/Popular/Popular";
import SearchMovies from "./Movies/SerchedMovies/SearchMovies";
const Home = ({ query }) => {
  return (
    <>
      {query && <SearchMovies query={query} />}
      <Popular />
    </>
  );
};

export default Home;

import image from "../../assets/Tmdb.svg";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <a className={classes.logo}>
          <img src={image} alt="here is image app" />
        </a>
        <div>
          <input type="text" className={classes.input} />
        </div>
        <button>Search</button>
      </header>
    </>
  );
};
export default Header;

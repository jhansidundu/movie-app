import classes from "./Card.module.css";
const Card = (props) => {
  const customClass = props.class ? props.class : "";
  return (
    <div className={`${classes.card}  ${customClass}`}>{props.children}</div>
  );
};

export default Card;

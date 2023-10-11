import classes from "./KeyValue.module.css";
function KeyValue({ label, value }) {
  return (
    <div className={classes.grid}>
      <p className={classes.label}>{label}</p>
      <span>{value}</span>
    </div>
  );
}
export default KeyValue;

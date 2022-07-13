import classes from './SpinningLoader.module.css';

function SpinningLoader() {
  return (
    <div className={classes.colList}>
      <div className={classes.loaderContainer}>
        <div className={classes.loader}></div>
      </div>
    </div>
  );
}

export default SpinningLoader;

import { Outlet } from "react-router";
import styles from "./TodoApp.module.scss";
function TodeApp() {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
}
export default TodeApp;

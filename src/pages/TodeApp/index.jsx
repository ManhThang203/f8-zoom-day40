// React
import { Outlet } from "react-router";
// Scss
import styles from "./TodeApp.module.scss";
function TodeApp() {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
}
export default TodeApp;

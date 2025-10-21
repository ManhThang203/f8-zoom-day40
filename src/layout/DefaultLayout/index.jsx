// React-router
import { Outlet } from "react-router";
// Layout
import Header from "@/layout/DefaultLayout/components/Header";
// Scss
import styles from "./DefaultLayout.module.scss";
function DefaultLayout() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
export default DefaultLayout;

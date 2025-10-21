// React-router
import { NavLink } from "react-router";
// Scss
import styles from "./Navigation.module.scss";

function Navigation() {
  const navItem = [
    {
      to: "/",
      lable: "Home",
    },
    {
      to: "/todo-app",
      lable: "Todo App",
    },
  ];

  return (
    <div className={styles.navItem}>
      <ul className={styles.wrapper}>
        {navItem.map((item) => (
          <li key={item.lable} className={styles.item}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {item.lable}
            </NavLink>
          </li>
        ))}
        <li className={styles.item}>
          <a href="./redux.html" target="blank">
            Redux Demo
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Navigation;

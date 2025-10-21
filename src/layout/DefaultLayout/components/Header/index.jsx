// Layout
import Navigation from "@/layout/DefaultLayout/components/Navigation";
// Scss
import styles from "./Header.module.scss";
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <Navigation />
      </div>
    </div>
  );
}
export default Header;

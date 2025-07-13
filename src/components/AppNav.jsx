import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import Logo from "./Logo";

function AppNav() {
  return (
    <>
      <Logo />
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="cities">Cities</NavLink>
          </li>
          <li>
            <NavLink to="countries">Countries</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AppNav;

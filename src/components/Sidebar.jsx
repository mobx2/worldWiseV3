import styles from "./Sidebar.module.css";

import AppNav from "./AppNav";
import Footer from "./SidebarFooter";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;

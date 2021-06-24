import React from "react"
import styles from "./Menu.module.scss"

const Menu: React.FC = ({ children }) => {
  return (<div className={`${styles.menu}`}>{children}</div>);
};

export default Menu;
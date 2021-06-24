import React from "react"
import styles from "./Menu.module.scss";

const MenuItem: React.FC = ({ children }) => {
  return (<div className={styles.item}>{children}</div>);
};

export default MenuItem;
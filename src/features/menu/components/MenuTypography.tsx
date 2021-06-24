import React from "react"
import styles from "./Menu.module.scss"
import classNames from 'classnames';

const MenuTypography: React.FC<{ statusClass?: any }> = ({ statusClass, children }) => {
  return <div
    className={classNames(styles.text, statusClass ? statusClass(styles) : styles.defaultColor)}>{children}</div>
};

export default MenuTypography;    
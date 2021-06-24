import React from "react"
import styles from "./FilterMenu.module.scss"
import { Status } from "../../model/DashboardModel";


const CheckIcon: React.FC<{ color: string }> = (props) => {
  return <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.65 7.3375C3.4 7.5875 3 7.5875 2.7 7.3375L0.15 4.7875C-0.05 4.5375 -0.05 4.1375 0.15 3.8375C0.35 3.5875 0.8 3.5875 1.1 3.8375L3.15 5.8875L8.9 0.1875C9.15 -0.0625 9.55 -0.0625 9.85 0.1875C10.15 0.4375 10.1 0.8375 9.85 1.1375L3.65 7.3375Z"
      fill={props.color}/>
  </svg>
};

const FilterIcon: React.FC<{ checkIconColor: string, status?: number, isSelected: boolean, onClickHandler: () => void }> = (props) => {
  const backGroundColorStyle = props.status !== undefined ? Status[props.status].toLowerCase() : styles.noBackground;

  return (<div className={`${styles.filterIcon} ${backGroundColorStyle}`} onClick={props.onClickHandler}>
    {props.isSelected ?
      (<div className={styles.filterChecked}>
        <CheckIcon color={props.checkIconColor}/>
      </div>)
      : null}
  </div>)
};

export default FilterIcon;
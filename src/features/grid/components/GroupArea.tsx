import React from "react"
import styles from "../Grid.module.scss"
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { group } from "../slices/gridSlice";

const GroupArea: React.FC<{ cellId: string, onTop: boolean }> = ({ cellId, onTop }) => {
  const dispatch = useDispatch();


  return (<div className={classNames(styles.groupElement, {[styles.onTop]: onTop})}
               onMouseUp={() => {
                 dispatch(group({ cellId }));
               }}></div>)
};

export default GroupArea;
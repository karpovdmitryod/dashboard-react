import React from "react"
import styles from "../Grid.module.scss"
import classNames from "classnames";
import ChangeOrderElement from "./СhangeOrderArea";
import GroupArea from "./GroupArea";

const CellPlaceholder: React.FC<{ cellId: string, isDragging: boolean }> = ({ cellId, isDragging }) => {

  return (<div className={classNames(
    styles.cellPlaceHolder, styles.onTop, styles.border
  )}>
    <ChangeOrderElement cellId={cellId} onTop={true}/>
    <GroupArea cellId={cellId} onTop={true}/>
  </div>)
};

export default CellPlaceholder;    
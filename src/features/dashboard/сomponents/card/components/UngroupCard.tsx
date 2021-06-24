import * as React from "react";
import { UngroupCardIcon } from "./CardIcons";
import styles from "./CardHeader.module.scss";
import { useDispatch } from "react-redux";
import { ungroup } from "app/commonAction";

const UngroupCard: React.FC = () => {
  const dispatch = useDispatch<typeof ungroup>();
  const clickHandler = () => {
    console.log('clicking');
    dispatch("", [], "");
  };

  return (
    <div onClick={clickHandler} className={styles.icon} non-draggable="true">
      <UngroupCardIcon/>
    </div>
  )
};

export default UngroupCard;
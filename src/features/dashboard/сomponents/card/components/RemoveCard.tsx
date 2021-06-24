import * as React from "react";
import { RemoveCardIcon } from "./CardIcons";
import styles from "./CardHeader.module.scss"
import { useDispatch } from "react-redux";
import { actions } from "features/views/viewsSlice";

const RemoveCard: React.FC<{ cardId: string }> = ({ cardId }) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(actions.removeCardFromView({
      cardId
    }));
  };

  return (
    <div onClick={clickHandler} className={styles.icon} non-draggable="true">
      <RemoveCardIcon/>
    </div>
  )
};

export default RemoveCard;
import * as React from "react";
import styles from "./CardHeader.module.scss";
import RemoveCard from "./RemoveCard";
import UngroupCard from "./UngroupCard";

const CardHeader: React.FC<{ id: string, name: string, content?: string[] }> = ({ id, name, content }) => {
  return (
    <div className={styles.cardHeader}>
      {content ? <UngroupCard/> : <RemoveCard cardId={id}/>}
      <div className={styles.cardName}>{name}</div>
    </div>
  )
};

export default CardHeader;
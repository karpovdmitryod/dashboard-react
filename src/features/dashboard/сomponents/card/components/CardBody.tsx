import * as React from "react";
import { Status } from "model/DashboardModel";
import styles from "./CardBody.module.scss";
import { useStatusClass } from "features/common/Hooks";

const CardBody: React.FC<{ status: Status, timeStamp: string }> = ({ status, timeStamp }) => {
  const statusClass = useStatusClass(status);
  return (<div className={styles.cardBody}>
    <div className={`${styles.cardStatus} ${statusClass}`}>{Status[status]} {timeStamp}</div>
  </div>);
};

export default CardBody;
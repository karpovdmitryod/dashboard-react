import { DragAndDropGrid } from "features/grid/DragAndDropGrid";
import React from "react";
import styles from "./Dashboard.module.scss";
import { useInitModel } from "../../app/appInit";

const Dashboard = () => {

  useInitModel();

  return (
    <div className={styles.dashboard}>
      <DragAndDropGrid/>
    </div>
  );
};

export default Dashboard;

import { DragAndDropGrid } from "features/grid/DragAndDropGrid";
import React from "react";
import styles from "./Dashboard.module.scss";
import { useInitModel } from "../../app/appInit";
import DashboardMenu from "../menu/DashboardMenu";

const Dashboard = () => {

  useInitModel();

  return (
    <div className={styles.dashboard}>
      <DashboardMenu/>
      <DragAndDropGrid/>
    </div>
  )
    ;
};

export default Dashboard;

import * as React from "react";
import KpiList from "../../kpi/KpiList";
import styles from "./CardFooter.module.scss";

import { KPI } from "model/DashboardModel";


const CardFooter: React.FC<{ id: string, kpis: KPI[] }> = ({ id, kpis }) => {

  return (
    <div className={styles.cardFooter}>
      <KpiList kpis={kpis} ciId={id}/>
    </div>
  )
};

export default CardFooter;
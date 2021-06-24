import { KpiState } from "model/DashboardModel";
import React from "react";
import { AvailabilityIcon, PerformanceIcon, SystemIcon } from "./Icons";
import DashboardItemKpi from "./Kpi";
import styles from "./KpiList.module.css";

const icons = [AvailabilityIcon, PerformanceIcon, SystemIcon];

interface Props {
  kpis: Array<KpiState>;
  ciId: string;
}
const KpiList: React.FC<Props> = ({ kpis, ciId }) => {

  return (
    <div className={`${styles.kpiList}`}>
      {kpis.map((kpi, index) => (
        <DashboardItemKpi
          kpi={kpi}
          kpiIndex={index}
          ciId={ciId}
          key={`${index}`}
        >
          {icons[index]}
        </DashboardItemKpi>
      ))}
    </div>
  );
};

export default KpiList;

import { useStatusClass, useStatusColor } from 'features/common/Hooks';
import { KPI } from 'model/DashboardModel';
import React, { useEffect, useRef } from 'react';
import styles from './Kpi.module.scss';
import { useDispatch } from "react-redux";
import { selectKpi } from "../../dashboardSlice";

type KpiProps = {
  kpi: KPI;
  kpiIndex: number;
  ciId: string;
};

const Kpi: React.FC<KpiProps> = (props: any) => {

  const { kpiIndex, ciId } = props;
  const dispatch = useDispatch();
  const kpiRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: any) => {
    event.stopPropagation();
    console.log('click to kpi');
    dispatch(selectKpi({ cardId: ciId, kpiIndex }))
  };

  useEffect(() => {
    if (!kpiRef.current) {
      return
    }

    kpiRef.current.addEventListener('click', handleClick);
  }, []);


  const isKpiSelected = () => {
    return props.kpi.isActive;
  };

  const statusClass = useStatusClass(props.kpi.status);
  const statusColor = useStatusColor(props.kpi.status);

  const iconColor = isKpiSelected() ? '#242C2E' : statusColor;

  return (
    <div non-draggable="true" ref={kpiRef}
         className={`${styles.kpi} ${statusClass} ${isKpiSelected() ? styles.selected : ''}`}
    >
      {props.children()(iconColor)}
    </div>
  );
};

export default Kpi;

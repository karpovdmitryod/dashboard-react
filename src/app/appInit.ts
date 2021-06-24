import { CI, DEFAULT_FILTERS, Status } from "../model/DashboardModel";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadInitialState } from "./commonAction";
import { RootState } from "./store";

const cis: Array<CI> = [
  {
    id: nanoid(),
    name: "Business Application",
    timeStamp: "19/02/40",
    status: Status.Critical,
    kpis: [],
  },
  {
    id: nanoid(),
    name: "Business Application1",
    timeStamp: "19/02/41",
    status: Status.Critical,
    kpis: [],
  },
  {
    id: nanoid(),
    name: "Business Application2",
    timeStamp: "19/02/40",
    status: Status.Critical,
    kpis: [],
  },
  {
    id: nanoid(),
    name: "Business Application3",
    timeStamp: "19/02/40",
    status: Status.Critical,
    kpis: [],
  },
];

const kpis = [
  {
    name: "Availability",
    status: Status.Success,
    isActive: true,
  },
  {
    name: "Performance",
    status: Status.Critical,
    isActive: false,
  },
  {
    name: "System",
    status: Status.Warning,
    isActive: false,
  },
];

const prepareNormalizedModel = () => {
  const kpisPerCi = cis.map((ci) => {
    const enrichedWithId = kpis.map((kpi) => {
      return { ...kpi, id: uuidv4() };
    });

    return [ { ...ci, kpis: enrichedWithId }, enrichedWithId ];
  });

  const normalizedKpis: any = kpisPerCi.flatMap((item: any) => item[1]);
  const normalizedCis: Array<CI> = kpisPerCi.map((item: any) => item[0]);

  return { cis: normalizedCis, kpis: normalizedKpis };
};

export const useInitModel = () => {
  const dispatch = useDispatch();
  const isGridInit = useSelector((state: RootState) => state.grid.coordinates !== undefined);

  useEffect(() => {
    if (!isGridInit) {
      return;
    }

    const { cis } = prepareNormalizedModel();
    dispatch(
      loadInitialState(
        {
          id: nanoid(),
          name: "Default view",
          isDefaultView: true,
          content: [],
          filter: DEFAULT_FILTERS,
        },
        cis
      )
    );
  }, [ isGridInit ]);
};
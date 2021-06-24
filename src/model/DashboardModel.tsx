export type KPI = {
  id: string;
  name: "Availability" | "Performance" | "System";
  status: Status;
  isActive: boolean;
};
export type KpiState = KPI;

export enum Status {
  Success,
  Warning,
  Critical,
  Unknown,
}

export type CommonState = {
  id: string;
  name: string;
  status: Status;
  timeStamp: string;
};

export type CI = CommonState & {
  kpis: KpiState[];
};

export type Group = CI & {
  content: string[];
};

export type CardState = {
  isFlipped: boolean;
  isHovered: boolean;
  isVisible: boolean;
  index: number;
} & (Group | CI);

export type Filter = Status[];

export type View = {
  id: string;
  name: string;
  isDefaultView: boolean;
  content: string[];
  filter: Filter;
};

export type DashboardState = {
  view: View,
  filter: Filter,
  cards: CardState[]
};

export const DEFAULT_FILTERS = [
  Status.Success,
  Status.Unknown,
  Status.Critical,
  Status.Warning,
];

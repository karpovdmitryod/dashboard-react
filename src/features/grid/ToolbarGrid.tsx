import React, { CSSProperties } from "react";

type GridProps = {
  columnGap?: number;
  id?: string;
};

type ColumnProps = {
  columnOffset?: number;
  columnSize: number;
  row?: number;
  memoize?: boolean;
};

export const GridItem: React.FC<ColumnProps> = React.memo(({
                                                             columnOffset,
                                                             columnSize,
                                                             row,
                                                             children,
                                                           }) => {
  const position = columnOffset
    ? `${columnOffset}/${columnSize} span`
    : `span ${columnSize}`;

  const columnStyle: CSSProperties = {
    gridColumn: position,
    gridRow: row,
  };

  return <div style={columnStyle}>{children}</div>;
}, (currentProps: ColumnProps, previousProps: ColumnProps) => {
  return currentProps.memoize ?? true;
});

export const DashboardGrid: React.FC<GridProps> = (props) => {
  const gridStyle: CSSProperties = {
    display: "grid",
    columnGap: 20,
    rowGap: 20,
    marginLeft: "150px",
    marginRight: "150px",
    gridTemplateRows: "minmax(204px, 1fr)",
    gridTemplateColumns: "repeat(12,minmax(10px,1fr))",
    alignItems: "center",
  };

  return (
    <div style={gridStyle} id={props.id}>
      {props.children}
    </div>
  );
};

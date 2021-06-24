export type ChangeOrderPayload = {
  targetCardId: string,
  sourceCardId: string
}

export type DragInitialPosition = {
  cellId: string
  mouseOrigin: Position;
}

export type CardHovered = DragInitialPosition;

export type GridInitPayload = { cells: Cell[] } & { gridCoordinates: Position };

export type Position = { x: number; y: number };

export type Status = "Dragging" | "Dropping" | "Static" | "Hovered";

export type Cells = {
  [cellId: string]: Cell
}

export type Cell = {
  id: string,
  readonly position: Position,
  translation: Position,
  content: Array<string>,
  status: Status,
}

export type GridState = {
  draggingCell: Cell | undefined,
  draggingMouseOffset: Position | undefined,
  cells: Cells;
  cellWidth: number;
  cellHeight: number;
  cellGutter: number;
  coordinates: Position | undefined;
};







import {
  createSlice, current,
  PayloadAction,
  SliceCaseReducers
} from "@reduxjs/toolkit";
import {
  DragInitialPosition,
  GridInitPayload,
  Position, GridState, Cells
} from "../GridModel";

import {
  InitialStatePayload,
  isInitialStateAction,
} from "../../../app/commonAction";

export type GroupPayload = {
  cellId: string
}

export type ChangeOrderPayload = {
  cellId: string
}


export const initialStateReducer = (
  state: GridState,
  action: PayloadAction<InitialStatePayload>
) => {

  const { cis } = action.payload;

  cis.forEach((ci, index) => {
    const freeCell = Object.values(state.cells).find(cell => cell.content.length === 0);

    if (!freeCell) {
      return;
    }

    freeCell.content.push(ci.name);
  });
};

const gridSlice = createSlice<GridState, SliceCaseReducers<GridState>, "grid">({
    name: "grid",
    initialState: {
      draggingCell: undefined,
      draggingMouseOffset: undefined,
      cells: {} as Cells,
      cellWidth: 170,
      cellHeight: 94,
      cellGutter: 20,
      coordinates: undefined,
    },
    reducers: {
      group: (grid: GridState, group: PayloadAction<GroupPayload>) => {
        if (!grid.draggingCell) {
          return;
        }

        grid.cells[group.payload.cellId].content.unshift(...grid.draggingCell.content);

        grid.cells[grid.draggingCell.id].content = [];
        grid.cells[grid.draggingCell.id].translation = grid.cells[grid.draggingCell.id].position;
        grid.cells[grid.draggingCell.id].status = "Static";

        grid.draggingCell = undefined;
        grid.draggingMouseOffset = undefined;
      },
      changePosition: (grid: GridState, changeOrder: PayloadAction<ChangeOrderPayload>) => {
        if (!grid.draggingCell) {
          return;
        }

        grid.cells[grid.draggingCell.id].translation = grid.cells[changeOrder.payload.cellId].position;
        grid.cells[grid.draggingCell.id].status = "Static";

        const cellHasContent = () => grid.cells[changeOrder.payload.cellId].content.length > 0

        if (cellHasContent()) {
          grid.cells[changeOrder.payload.cellId].translation = grid.draggingCell.position;
        }

        grid.draggingCell = undefined;
        grid.draggingMouseOffset = undefined;
      },
      initGrid: (grid, loadCoordinates: PayloadAction<GridInitPayload>) => {
        const { cells, gridCoordinates } = loadCoordinates.payload;

        grid.coordinates = gridCoordinates;

        cells.forEach(cell => {
          grid.cells[cell.id] = cell;
        });
      },
      dragStarted: (grid, action: PayloadAction<DragInitialPosition>) => {
        const { mouseOrigin, cellId } = action.payload;

        const draggingCell = grid.cells[cellId];

        if (!draggingCell || !grid.coordinates) {
          return;
        }

        grid.draggingMouseOffset = {
          x: mouseOrigin.x - grid.coordinates?.x - draggingCell.translation.x,
          y: mouseOrigin.y - grid.coordinates?.y - draggingCell.translation.y,
        };

        grid.draggingCell = draggingCell;
        draggingCell.status = "Dragging";
      },
      dragStopped: (grid) => {

      },
      dragInProgress: (grid, updateDragAndDrop: PayloadAction<Position>) => {
        const { draggingCell, coordinates, draggingMouseOffset } = grid;

        if (!draggingCell || !coordinates || !draggingMouseOffset) {
          return grid;
        }

        const mousePosition = updateDragAndDrop.payload;

        const newTranslation = {
          x: mousePosition.x - coordinates.x - draggingMouseOffset.x,
          y: mousePosition.y - coordinates.y - draggingMouseOffset.y,
        };

        const throttle = () => newTranslation.x === grid.cells[draggingCell.id].position.x &&
          newTranslation.y === grid.cells[draggingCell.id].position.y;

        if (throttle()) {
          return;
        }

        grid.cells[draggingCell.id].translation = newTranslation;
      },
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(isInitialStateAction, initialStateReducer)
    },
  })
;

export const {
  dragInProgress,
  dragStarted,
  dragStopped,
  initGrid,
  elementMounted,
  mountRef,
  hovered,
  unHovered,
  group,
  changePosition
} = gridSlice.actions;
export const { reducer: grid } = gridSlice;

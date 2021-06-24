import { createSelector } from "@reduxjs/toolkit";
import createCachedSelector from "re-reselect";
import { RootState } from "../../app/store";
import { Cell } from "./GridModel";



export const getGridContent = createSelector((state: RootState) => Object.values(state.grid.cells), (cells) => cells);

export const isCellDragging = createSelector((state: RootState) => state.grid.draggingCell,
  (draggingCell: Cell | undefined) => !!draggingCell);

export const selectElementTransition = createCachedSelector(
  (state: RootState, cellId: string) => state.grid.cells[cellId],
  (cell) => {
    const { status, translation } = cell;

    switch (status) {
      case "Dragging": {
        return {
          cell,
          styles: {
            cursor: "-webkit-grabbing",
            transform: `translate(${translation.x}px, ${translation.y}px)`,
            transition: "none",
          }
        };
      }
      case "Static": {
        return {
          cell,
          styles: {
            cursor: "-webkit-grab",
            transform: `translate(${translation.x}px, ${translation.y}px)`,
            transition: "transform 1000ms",
          }
        };
      }
      default: {
        return {
          cell,
          styles: {
            cursor: "-webkit-grabbing",
            transform: `translate(${translation.x}px, ${translation.y}px)`,
            transition: "transform 500ms",
          }
        };
      }
    }
  }
)((state: RootState, cardId) => cardId);

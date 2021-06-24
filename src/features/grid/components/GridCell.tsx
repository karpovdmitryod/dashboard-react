import React from "react"
import styles from "../Grid.module.scss"
import { useGridRef } from "../Hooks";
import classNames from "classnames";
import { useSelector } from "react-redux";
import CellPlaceholder from "./CellPlaceholder";
import { Card } from "../../dashboard/сomponents/card/Card";
import { isCellDragging } from "../gridSelectors";
import UngroupArea from "./UngroupArea";

const GridCell: React.FC<{ cellId: string, index: number }> = ({ cellId, index }) => {
  const { cell, ref, isHovered } = useGridRef(cellId);
  const isOtherCellDragging = useSelector(isCellDragging);
  const isThisCellDragging = cell.status === "Dragging";
  const isDragging = !isThisCellDragging && isOtherCellDragging;
  const showPlaceHolder = isHovered && isDragging;

  //useWhyDidYouUpdate("cell", { index, cellId, cell, ref, isOtherCellDragging, isThisCellDragging, showPlaceHolder });
  //console.log(showPlaceHolder, index);
  return (
    <div className={classNames(styles.gridElement, {
      [styles.onTop]: isThisCellDragging,
      [styles.disablePointerEvent]: isThisCellDragging,

    })} ref={ref}>
      {showPlaceHolder ? <CellPlaceholder cellId={cellId} isDragging={isDragging}/> : null}
      {cell.content.length > 1 ? <UngroupArea cellId={cellId}/> : null}
      <div className={classNames(styles.contentWrapper, { [styles.faded]: isHovered && isOtherCellDragging })}>
        {cell.content.map((cardId, index) =>
          <Card cardId={cardId} key={index} additionalStyling={{ 'zIndex': 1 * (cell.content.length - index) }}/>)}
      </div>
    </div>
  )
};

export default GridCell;
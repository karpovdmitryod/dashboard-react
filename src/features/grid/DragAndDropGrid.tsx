import React from "react";
import styles from "./Grid.module.scss";
import { useInitGrid, useElementDimensions, useWhyDidYouUpdate } from "./Hooks";
import { useDispatch, useSelector } from "react-redux";
import GridItemRenderer from "./components/GridCell";
import { dragInProgress } from "./slices/gridSlice";
import { getGridContent, isCellDragging } from "./gridSelectors";

export const DragAndDropGrid: React.FC = () => {
  const [ ref, gridDimensions ] = useElementDimensions();
  const dispatch = useDispatch();
  const gridContent = useSelector(getGridContent);

  useInitGrid(gridDimensions);

  const handleMouseMove = React.useCallback(
    ({ clientX: x, clientY: y }) => {

      dispatch(dragInProgress({ x, y }));
    }, []);

  return (
    <div
      ref={ref}
      className={styles.grid}
      onMouseMove={handleMouseMove}
    >
      {Object.values(gridContent).map((cell, index) => {
        return (
          <GridItemRenderer cellId={cell.id} index={index} key={index}/>
        );
      })}
    </div>
  );
};

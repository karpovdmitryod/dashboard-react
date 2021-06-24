import React, { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import {
  dragInProgress,
  dragStarted,
  dragStopped,
  initGrid,
  hovered,
  unHovered
} from "./slices/gridSlice";
import { nanoid } from "nanoid";
import { Cell, Position } from "./GridModel";
import { selectElementTransition } from "./gridSelectors";

export function useWhyDidYouUpdate(name: any, props: any) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef<any>();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          // @ts-ignore
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        // eslint-disable-next-line
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

export const useGridRef = (cellId: string): { cell: Cell, ref: RefObject<HTMLDivElement>, isHovered: boolean } => {
  const dispatch = useDispatch();

  const elementRef = useRef<HTMLDivElement>(null);
  const [ isHovered, setHovered ] = useState(false);

  const { cell, styles } = useSelector((state: RootState) => selectElementTransition(state, cellId));

  const handleMouseEnter = React.useCallback(
    (event: MouseEvent) => {
      setHovered(true);
    },
    []
  );

  const handleMouseLeave = React.useCallback(
    (event: MouseEvent) => {
      setHovered(false);
    },
    []
  );

  const handleMouseDown = React.useCallback(
    (event: MouseEvent) => {
      console.log('drag started');
      dispatch(dragStarted({
        mouseOrigin: { x: event.clientX, y: event.clientY },
        cellId
      }));
    },
    []
  );

  const handleMouseUp = React.useCallback(
    (event: MouseEvent) => {

      dispatch(dragStopped({
        mouseOrigin: { x: event.clientX, y: event.clientY },
      }));
    },
    []
  );

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    elementRef.current.style.transform = styles.transform;
    elementRef.current.style.transition = styles.transition;
    elementRef.current.style.cursor = styles.cursor;

  }, [ styles ]);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    elementRef.current.addEventListener('mouseenter', handleMouseEnter);
    elementRef.current.addEventListener('mouseleave', handleMouseLeave);
    elementRef.current.addEventListener('mousedown', handleMouseDown);
    elementRef.current.addEventListener('mouseup', handleMouseUp);

    //elementRef.current.addEventListener('mousemove', handleMouseMove);


    return () => {
      elementRef.current?.addEventListener('mouseenter', handleMouseEnter);
      elementRef.current?.addEventListener('mouseleave', handleMouseLeave);
      elementRef.current?.removeEventListener('click', handleMouseDown);
      elementRef.current?.removeEventListener('mouseup', handleMouseUp);
      //elementRef.current?.removeEventListener('mousemove', handleMouseMove);
    }
  }, [ elementRef.current ]);

  return { cell, ref: elementRef, isHovered };
};

export const useElementDimensions = (): [ RefObject<HTMLDivElement>, DOMRect | undefined ] => {
  const [ nodeDimensions, setNodeDimensions ] = useState<DOMRect>();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    setNodeDimensions(elementRef.current.getBoundingClientRect());
  }, []);

  return [ elementRef, nodeDimensions ];
};


export const useInitGrid = (gridDimensions: DOMRect | undefined): void => {

  const dispatch = useDispatch();

  const { cellGutter, cellWidth, cellHeight } = useSelector((state: RootState) => state.grid);

  useEffect(() => {
    if (!gridDimensions) {
      return;
    }

    const columns = Math.floor(gridDimensions.width / (cellWidth + cellGutter));
    const rows = Math.floor(gridDimensions.height / (cellHeight + cellGutter));

    const gridSize = columns * rows;

    const gridCoordinates = {
      x: gridDimensions.x,
      y: gridDimensions.y
    };

    const cells = [ ...Array(gridSize) ].map((value, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;

      const originPosition = {
        x: column * (cellWidth + cellGutter),
        y: row * (cellHeight + cellGutter),
      } as Position;

      return {
        id: nanoid(),
        position: originPosition,
        translation: originPosition,
        content: [] as string[],
        status: "Static"

      } as Cell;
    });

    dispatch(initGrid({ cells, gridCoordinates }));
  }, [ gridDimensions ]);


};

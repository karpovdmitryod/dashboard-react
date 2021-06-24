import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  isAddToGroupAction,
  isInitialStateAction,
  isNewGroupAction, isUngroupAction,
} from "app/commonAction";

import {
  addToGroupReducer,
  dashboardItemAdapter,
  dashboardSelectors,
  initialStateReducer,
  newGroupReducer, ungroupReducer
} from "./dashboardSliceReducers";

export type SelectKpiPayload = {
  cardId: string;
  kpiIndex: number;
};

const dashboardSlice = createSlice({
  name: "cards",
  initialState: dashboardItemAdapter.getInitialState(),

  extraReducers: (builder) => {
    builder
      .addMatcher(isInitialStateAction, initialStateReducer)
      .addMatcher(isNewGroupAction, newGroupReducer)
      .addMatcher(isAddToGroupAction, addToGroupReducer)
      .addMatcher(isUngroupAction, ungroupReducer);
  },
  reducers: {
    changeCells: (state, action: PayloadAction<{
      sourceCardId: string,
      targetCardId: string,
      targetCellIndex: number,
      sourceCellIndex: number
    }>) => {
      const { sourceCardId, targetCardId, targetCellIndex, sourceCellIndex } = action.payload;

      dashboardItemAdapter.updateMany(state, [ {
        id: sourceCardId,
        changes: {
          index: targetCellIndex
        }
      }, {
        id: targetCardId,
        changes: {
          index: sourceCellIndex
        }
      } ]);


    },
    selectKpi: (state, action: PayloadAction<SelectKpiPayload>) => {
      const { cardId, kpiIndex } = action.payload;
      const item = dashboardSelectors.selectById(state, cardId);
      const updatedKpis = item?.kpis.map((kpi, index) => {
        return { ...kpi, isActive: index === kpiIndex };
      });

      if (updatedKpis) {
        dashboardItemAdapter.updateOne(state, {
          id: cardId,
          changes: { kpis: updatedKpis, status: updatedKpis[kpiIndex].status }
        })
      }
    }
  },
});

export const { changeCells, selectKpi } = dashboardSlice.actions;
export default dashboardSlice.reducer;

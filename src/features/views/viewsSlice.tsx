import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
  Selector,
  Update
} from "@reduxjs/toolkit";
import {
  AddToGroupPayload,
  InitialStatePayload,
  isAddToGroupAction,
  isInitialStateAction,
  isNewGroupAction,
  isUngroupAction,
  NewGroupPayload,
  UngroupCardsPayload
} from "app/commonAction";
import { DEFAULT_FILTERS, Filter, View } from "model/DashboardModel";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";

const viewEntityAdapter = createEntityAdapter<View>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

type NewViewPayload = View;
export const viewSelectors = viewEntityAdapter.getSelectors();

export const selectDefaultView: Selector<RootState, View | undefined> = (state) => {
  const defaultViewId = state.views.defaultViewId;

  return viewSelectors.selectById(state.views, defaultViewId);
};

export const selectCurrentView: Selector<RootState, View | undefined> = (state) => {
  const currentViewId = state.views.currentViewId;

  return viewSelectors.selectById(state.views, currentViewId);
};

export type UpdateViewContentPayload = {
  cardId: string;
}

const defaultViewReducer = (
  state: EntityState<View> & { currentViewId: string, defaultViewId: string },
  action: PayloadAction<InitialStatePayload>
) => {
  const { cis, view } = action.payload;

  view.content = cis.map((ci) => ci.id);

  state.currentViewId = view.id;
  state.defaultViewId = view.id;

  viewEntityAdapter.addOne(state, view);
};

const addToGroupReducer = (
  state: EntityState<View>,
  action: PayloadAction<AddToGroupPayload>
) => {
  const { viewId, cardToAddId } = action.payload;
  const viewContent = viewSelectors.selectById(state, viewId)?.content;
  if (viewContent) {
    viewEntityAdapter.updateOne(state, {
      id: viewId,
      changes: {
        content: viewContent.filter((id) => id !== cardToAddId),
      },
    });
  }
};

const ungroupCardsReducer = (state: EntityState<View>,
                             action: PayloadAction<UngroupCardsPayload>
) => {
  const { viewId, content, groupId } = action.payload;
  const view = viewSelectors.selectById(state, viewId);
  if (!view) {
    return;
  }

  viewEntityAdapter.updateOne(state, {
    id: viewId,
    changes: {
      content: view.content.filter(content => content !== groupId).concat(...content)
    }
  });
};

const groupCardsReducer = (
  state: EntityState<View>,
  action: PayloadAction<NewGroupPayload>
) => {
  const { viewId, groupId, cardsToGroup } = action.payload;
  const currentViewContent = viewSelectors.selectById(state, viewId)?.content;

  const newGroupIndex = currentViewContent?.findIndex(
    (id) => id === cardsToGroup[0]
  );
  const filteredContent = currentViewContent?.filter(
    (id) => !cardsToGroup.includes(id)
  );

  if (filteredContent) {
    newGroupIndex !== undefined
      ? filteredContent.splice(newGroupIndex, 0, groupId)
      : filteredContent.push(groupId);

    viewEntityAdapter.updateOne(state, {
      id: viewId,
      changes: { content: filteredContent },
    });
  }
};

export const viewContentById = createSelector(
  (state: RootState, viewId: string) => viewSelectors.selectById(state.views, viewId),
  (view: View | undefined) => view?.content ?? []
);

export const currentView = createSelector(
  (state: RootState) => state.views,
  (viewsState): View => viewSelectors.selectById(viewsState, viewsState.currentViewId) as View
);

export const viewsNames = createSelector(
  (state: RootState) => viewSelectors.selectAll(state.views),
  (views) => views.map(view => ({
    id: view.id,
    name: view.name,
    isDefaultView: view.isDefaultView
  }))
);

export const viewsSlice = createSlice({
  name: "views",
  initialState: viewEntityAdapter.getInitialState({
    currentViewId: "",
    defaultViewId: "",
  }),
  reducers: {
    addNewView: {
      reducer: (state, action: PayloadAction<NewViewPayload>) => viewEntityAdapter.addOne(state, action),
      prepare: ({ name, content, filter }: { name: string, content?: string[], filter?: Filter }) => {
        return {
          payload: {
            id: nanoid(),
            name,
            isDefaultView: false,
            content: content ?? [],
            filter: filter ?? DEFAULT_FILTERS
          },
        };
      }
    },
    updateFilter: (state, action: PayloadAction<Update<View>>) => {
      viewEntityAdapter.updateOne(state, action);
    },
    addCardToView: (state, action: PayloadAction<UpdateViewContentPayload>) => {
      const { cardId: cardToAdd } = action.payload;

      const newViewContent = viewSelectors.selectById(state, state.currentViewId)?.content.concat(cardToAdd);

      viewEntityAdapter.updateOne(state, {
        id: state.currentViewId,
        changes: {
          content: newViewContent
        },
      });
    },
    removeCardFromView: (state, action: PayloadAction<UpdateViewContentPayload>) => {
      const { cardId: cardIdToRemove } = action.payload;
      const newViewContent = viewSelectors.selectById(state, state.currentViewId)?.content.filter((id) => id !== cardIdToRemove) ?? [];

      if (state.currentViewId === state.defaultViewId) {
        const newViewId = nanoid();

        viewEntityAdapter.addOne(state, {
          id: newViewId,
          name: `New view ${viewSelectors.selectTotal(state) + 1}`,
          content: newViewContent,
          filter: DEFAULT_FILTERS,
          isDefaultView: false
        });

        state.currentViewId = newViewId;

      } else {
        viewEntityAdapter.updateOne(state, {
          id: state.currentViewId,
          changes: {
            content: newViewContent
          },
        });
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isInitialStateAction, defaultViewReducer)
      .addMatcher(isNewGroupAction, groupCardsReducer)
      .addMatcher(isAddToGroupAction, addToGroupReducer)
      .addMatcher(isUngroupAction, ungroupCardsReducer);

  },
});

export const { reducer: views } = viewsSlice;
export const { actions } = viewsSlice;


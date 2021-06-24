import { createSelector, EntityState, Selector } from "@reduxjs/toolkit";
import { selectCurrentView, selectDefaultView } from "../views/viewsSlice";
import { CardState, DashboardState, View } from "../../model/DashboardModel";
import { dashboardSelectors } from "./dashboardSliceReducers";
import { RootState } from "../../app/store";


const selectCardsAsEntities: Selector<RootState, EntityState<CardState>> = (
  state
) => state.cards;


const viewContentCombiner = (view: View | undefined, entities: EntityState<CardState>): DashboardState | undefined => {
  const isNotUndefined = (item: CardState | undefined): item is CardState => {
    return item !== undefined;
  };

  if (!view) {
    return undefined;
  }

  const { content: ciIds, filter } = view;

  return {
    filter,
    cards: ciIds.map(id => dashboardSelectors.selectById(entities, id))
      .filter(isNotUndefined)
      .filter(card => filter.includes(card.status)),
    view
  };
};

export const currentViewContentSelector = createSelector(
  [ selectCurrentView, selectCardsAsEntities ],
  viewContentCombiner);

export const defaultViewContentSelector = createSelector(
  [ selectDefaultView, selectCardsAsEntities ],
  viewContentCombiner);

export const currentViewCardIdsSelector = createSelector([ selectCurrentView, selectCardsAsEntities ], (view, cards) => {
  const isNotUndefined = (item: CardState | undefined): item is CardState => {
    return item !== undefined;
  };

  if (!view) {
    return undefined;
  }

  const { content: ciIds, filter, id: viewId } = view;

  return {
    viewId,
    cards: ciIds.map(id => dashboardSelectors.selectById(cards, id))
      .filter(isNotUndefined)
      .filter(card => filter.includes(card.status))
      .map(card => ({ id: card.id, index: card.index }))
  };
});

const selectCards: Selector<RootState, CardState[]> = (state) =>
  dashboardSelectors.selectAll(state.cards);

export const groupsIdsSelector = createSelector(selectCards, (cards) => {
    return cards.filter((card) => "content" in card).map((card) => card.id);
  }
);
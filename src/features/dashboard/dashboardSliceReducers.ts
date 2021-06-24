import { createEntityAdapter, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { CardState, CI, Group } from "../../model/DashboardModel";
import { AddToGroupPayload, InitialStatePayload, NewGroupPayload, UngroupCardsPayload } from "../../app/commonAction";

export const dashboardItemAdapter = createEntityAdapter<CardState>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => (a.index < b.index ? -1 : 1),
});

export const dashboardSelectors = dashboardItemAdapter.getSelectors();

export const initialStateReducer = (
  state: EntityState<CardState>,
  action: PayloadAction<InitialStatePayload>
) => {
  const { cis } = action.payload;

  const dashboardState: CardState[] = cis.map((ci: CI, index: number) => {
    return {
      ...ci,
      id: ci.name,
      status: ci.kpis[0].status,
      isFlipped: false,
      isHovered: false,
      isVisible: true,
      index,
    };
  });

  dashboardItemAdapter.addMany(state, dashboardState);
};

const createNewGroup = (
  groupId: string,
  sourceCard: CI,
  targetCard: CI
): Group => {
  return {
    id: groupId,
    name: "new Group",
    content: [ sourceCard.id, targetCard.id ],
    kpis: sourceCard.kpis.map((_) => _),
    status: sourceCard.status,
    timeStamp: sourceCard.timeStamp,
  };
};

export const newGroupReducer = (
  state: EntityState<CardState>,
  action: PayloadAction<NewGroupPayload>
) => {
  const { groupId, cardsToGroup } = action.payload;

  const sourceCard = dashboardSelectors.selectById(state, cardsToGroup[0]);
  const targetCard = dashboardSelectors.selectById(state, cardsToGroup[1]);

  if (sourceCard && targetCard) {
    const newGroup = createNewGroup(groupId, sourceCard, targetCard);
    const newGroupCard = {
      ...newGroup,
      isFlipped: false,
      isVisible: true,
      isHovered: false,
      index: targetCard.index,
    };

    dashboardItemAdapter.addOne(state, newGroupCard);
  }
};

export const addToGroupReducer = (
  state: EntityState<CardState>,
  action: PayloadAction<AddToGroupPayload>
) => {
  const { groupId, cardToAddId } = action.payload;
  const group = dashboardSelectors.selectById(state, groupId) as Group;

  if (group) {
    dashboardItemAdapter.updateOne(state, {
      id: groupId,
      changes: { content: [ ...group.content, cardToAddId ] },
    });
  }
};

export const ungroupReducer = (state: EntityState<CardState>,
                        action: PayloadAction<UngroupCardsPayload>) => {
  const { groupId } = action.payload;
  dashboardItemAdapter.removeOne(state, groupId);
};
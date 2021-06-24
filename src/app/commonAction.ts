import { AnyAction, createAction, PayloadAction } from "@reduxjs/toolkit";
import { CI, View } from "model/DashboardModel";
import { nanoid } from "nanoid";

export type NewGroupPayload = {
  groupId: string;
  viewId: string;
  cardsToGroup: string[];
};

export type AddToGroupPayload = {
  groupId: string;
  viewId: string;
  cardToAddId: string;
};

export type UngroupCardsPayload = {
  groupId: string;
  viewId: string;
  content: string[];
};


export type InitialStatePayload = {
  view: View;
  cis: CI[];
};

export const loadInitialState = createAction(
  "loadInitialState",
  (view: View, cis: CI[]) => ({
    payload: {
      view,
      cis,
    },
  })
);

export const newGroup = createAction<(viewId: string, cardsToGroup: string[]) => { ["payload"]: NewGroupPayload },
  "newGroup">("newGroup", (viewId: string, cardsToGroup: string[]) => {
  return {
    payload: {
      groupId: nanoid(),
      viewId,
      cardsToGroup,
    },
  };
});

export const addToGroup = createAction(
  "addToGroup",
  (viewId: string, groupId: string, cardToAddId: string) => ({
    payload: {
      viewId,
      groupId,
      cardToAddId,
    },
  })
);

export const ungroup = createAction<(viewId: string, content:string[], groupId:string) => {["payload"]: UngroupCardsPayload}>(
  "ungroup",
  (viewId: string, content: string[], groupId: string ) => ({
    payload: {
      viewId,
      content,
      groupId
    },
  })
);

export const isInitialStateAction = (
  action: AnyAction
): action is PayloadAction<InitialStatePayload> =>
  action.type === "loadInitialState";

export const isNewGroupAction = (
  action: AnyAction
): action is PayloadAction<NewGroupPayload> => action.type === "newGroup";

export const isAddToGroupAction = (
  action: AnyAction
): action is PayloadAction<AddToGroupPayload> => action.type === "addToGroup";

export const isUngroupAction = (
  action: AnyAction
): action is PayloadAction<UngroupCardsPayload> => action.type === "ungroup";

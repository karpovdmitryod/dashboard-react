import * as React from "react";

import styles from "./Card.module.scss";
import CardHeader from "./components/CardHeader";
import CardBody from "./components/CardBody";
import CardFooter from "./components/CardFooter";
import { useStatusClass } from "features/common/Hooks";

import classNames from "classnames";
import { Status } from "../../../../model/DashboardModel";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelectors } from "../../dashboardSliceReducers";
import { RootState } from "app/store";

import { useGridRef } from "../../../grid/Hooks";


const backGroundColor = (status: Status | undefined): string => {
  switch (status) {
    case Status.Success:
      return "#222924";
    case Status.Warning:
      return "#383129";
    case Status.Critical:
      return "#342B2D";
    case Status.Unknown:
      return "#242C2E";
    default:
      return "#242C2E";
  }
};

export const Card: React.FC<{ cardId: string, additionalStyling?: { [name: string]: string | number; } }> = ({
                                                                                                      cardId,
                                                                                                      additionalStyling,
                                                                                                      children
                                                                                                    }) => {
  const cardState = useSelector((state: RootState) => {
    return dashboardSelectors.selectById(state.cards, cardId);
  });
  const statusClass = useStatusClass(cardState?.status);

  const cardDynamicStyles = {
    "background": backGroundColor(cardState?.status),
    ...additionalStyling
  } as React.CSSProperties;

  if (!cardState) {
    return null;
  }

  return (
    <div className={classNames(styles.card, statusClass, styles.cardAppearence)}
         style={cardDynamicStyles}>
      <CardHeader {...cardState} />
      <CardBody {...cardState} />
      <CardFooter {...cardState}/>
    </div>
  )
};



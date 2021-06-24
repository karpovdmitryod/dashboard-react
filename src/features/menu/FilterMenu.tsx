import React from "react"
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";
import MenuTypography from "./components/MenuTypography";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";

import FilterIcon from "./FilterIcon";
import classNames from 'classnames';
import { Status } from "model/DashboardModel";
import { currentViewContentSelector, defaultViewContentSelector } from "features/dashboard/dashboardSliceSelectors";
import { actions } from "features/views/viewsSlice";
import { SaveNewLayout } from "./SaveNewLayout";


const FilterMenu = () => {
  const dispatch = useDispatch();

  const defaultViewState = useSelector(defaultViewContentSelector);
  const currentViewState = useSelector(currentViewContentSelector);

  if (!defaultViewState || !currentViewState) {
    return null;
  }

  const { cards: allCards } = defaultViewState;
  const { cards: currentCards, view: { id: viewId } } = currentViewState;


  const statusClass = (status: Status) => (styles: any) => {
    return classNames(
      { [`${styles['warningTextColor']}`]: status === Status.Warning },
      { [`${styles['criticalTextColor']}`]: status === Status.Critical },
      { [`${styles['unknownTextColor']}`]: status === Status.Unknown },
      { [`${styles['successTextColor']}`]: status === Status.Success },
    )
  };

  return (<Menu>
    <MenuItem><Filter/></MenuItem>
    {allCards?.map((card, index) => {
      const isSelected = currentCards?.includes(card);

      const filterIconsProps = {
        checkIconColor: "#30444E",
        isSelected,
        onClickHandler: () => {
          const payload = { viewId, cardId: card.id };
          return isSelected ?
            dispatch(actions.removeCardFromView(payload)) :
            dispatch(actions.addCardToView(payload))
        }
      };
      return (
        <MenuItem key={index}>
          <FilterIcon {...filterIconsProps} />
          <MenuTypography
            key={index}
            statusClass={statusClass(card.status)}>
            {card.name}
          </MenuTypography>

        </MenuItem>
      )
    })}
    <MenuItem>
      <SaveNewLayout/>
    </MenuItem>
  </Menu>)
};

export default FilterMenu;
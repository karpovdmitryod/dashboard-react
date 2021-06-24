import React, { useState } from "react"
import styles from "./DashboardMenu.module.scss"
import LayoutMenu from "./LayoutMenu";
import FilterMenu from "./FilterMenu";
import { useSelector } from "react-redux";
import { viewSelectors, viewsNames } from "../views/viewsSlice";
import { RootState } from "../../app/store";
import { View } from "../../model/DashboardModel";

type MenuState = {
  showFilterMenu: boolean;
  showLayoutMenu: boolean;
  showInputField: boolean;
}
const DashboardMenu = () => {

  const [ menuState, setMenuState ] = useState<MenuState>({
    showFilterMenu: false,
    showLayoutMenu: false,
    showInputField: false
  });

  const views = useSelector(viewsNames);
  const currentView = useSelector((state: RootState) => (viewSelectors.selectById(state.views, state.views.currentViewId) as View));

  const menuClickHandler = ({ showFilterMenu = false, showLayoutMenu = false, showInputField = false }) => {
    return () => {
      setMenuState({ showInputField, showFilterMenu, showLayoutMenu });
    }
  };

  return (
      <div className={styles.dashboardMenu}>
        <div className={styles.layoutMenu}>
          <div
            onClick={menuClickHandler({
              showLayoutMenu: !menuState.showLayoutMenu,
            })}>
            Select layout
          </div>
          {menuState.showLayoutMenu ? <LayoutMenu views={views}/> : null}
        </div>


        <div className={styles.separator}>{'>'}</div>
        <div className={styles.filterMenu}>
          <div
            onClick={menuClickHandler({
              showFilterMenu: !menuState.showFilterMenu,
            })}>
            {currentView?.name}
          </div>
          {menuState.showFilterMenu ? <FilterMenu/> : null}
        </div>
      </div>
  )
};

export default DashboardMenu;
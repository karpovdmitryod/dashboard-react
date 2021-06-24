import React from "react"
import MenuItem from "./components/MenuItem";
import MenuTypography from "./components/MenuTypography";
import Menu from "./components/Menu";
import { DeleteLayoutIcon, EditLayoutIcon } from "./LayoutIcons";
import styles from "./LayoutMenu.module.scss";

const LayoutMenu: React.FC<{ views: { id: string, name: string, isDefaultView: boolean }[] }> = ({ views }) => {

  return (<Menu>{views.map((view, index) => {
    return (
      <MenuItem key={index}>
        <MenuTypography>
          {view.name}
        </MenuTypography>
        {!view.isDefaultView ? (
          <div className={styles.layoutMenuIconsHolder}>
            <EditLayoutIcon/>
            <DeleteLayoutIcon/>
          </div>
        ) : null}


      </MenuItem>
    )
  })}</Menu>)
};
export default LayoutMenu;
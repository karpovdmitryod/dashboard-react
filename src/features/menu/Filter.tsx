import React from "react"
import styles from "./FilterMenu.module.scss"
import { Status, View } from "../../model/DashboardModel";
import FilterIcon from "./FilterIcon";
import { useDispatch, useSelector } from "react-redux";
import { currentView, actions } from "../views/viewsSlice";

const { updateFilter } = actions;

const Filter = () => {
    const { filter: viewFilter, id } = useSelector(currentView);
    const dispatch = useDispatch();

    return (<div className={styles.filter}>
      {
        Object.keys(Status)
          .filter((key: any) => isNaN(Number(Status[key])))
          .map((statusAsString: string, index) => {
            const statusAsNumber = Number(statusAsString);
            const isSelected = viewFilter.includes(statusAsNumber);

            const filterProps = {
              status: statusAsNumber,
              isSelected: isSelected,
              checkIconColor: "white",
              onClickHandler: () => {
                dispatch(updateFilter({
                  id,
                  changes: {
                    filter: isSelected
                      ? viewFilter.filter(status => status !== statusAsNumber)
                      : viewFilter.concat(statusAsNumber)
                  }
                }))
              }
            };

            return (
              <FilterIcon {...filterProps} key={index}/>
            )
          })
      }
    </div>)
  }
;
export default Filter;
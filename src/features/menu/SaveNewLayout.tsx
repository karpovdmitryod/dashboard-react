import React, { useState } from "react"
import styles from "./SaveNewLayout.module.scss";
import MenuTypography from "./components/MenuTypography";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectCurrentView } from "../views/viewsSlice";

export const SaveNewLayout = () => {
  const [ nameState, setNameState ] = useState("");
  const dispatch = useDispatch();
  const currentView = useSelector(selectCurrentView);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actions.addNewView({
      name: nameState, content: currentView?.content, filter: currentView?.filter
    }));
    setNameState("");
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setNameState(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className={styles.inputContainer}>
        <input type="text" onChange={changeHandler} value={nameState}/>
        <label><MenuTypography>Save new layout</MenuTypography></label>
      </span>
    </form>)
};
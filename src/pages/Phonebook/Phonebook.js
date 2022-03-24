import React from "react";
import styles from "./Phonebook.module.scss";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import {ContentHeader} from "../../components/components";
import Department from "./components/Department/Department";
import { useSelector } from "react-redux";

const Phonebook = () => {
  const { loading } = useSelector(({ phonebook }) => phonebook);

  if (loading) {
    return <div> LOADING </div>;
  }

  return (
    <div className={styles.phonebook}>
      <ContentHeader>
        <HeaderBlock />
      </ContentHeader>

      <div className={`${styles.body} body`}>
        <div className="container">
          <Department />
        </div>
      </div>
    </div>
  );
};

export default Phonebook;
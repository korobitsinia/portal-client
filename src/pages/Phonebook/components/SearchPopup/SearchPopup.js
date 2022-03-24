import React, { useEffect } from "react";
import { Input, Modal } from "../../../../components/components";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchValue,
  downloadAllPeople,
  setActiveDepartment,
} from "../../../../redux/phonebook/actions";
import { arraySearch } from "../../../../helpers/halpersFunctions";
import styles from "./SearchPopup.module.scss";

const SearchPopup = ({ close }) => {
  const dispatch = useDispatch();
  const {
    search: { value },
    allPeople,
  } = useSelector(({ phonebook }) => phonebook);

  useEffect(() => {
    dispatch(downloadAllPeople());
    return () => {
      dispatch(changeSearchValue({ value: "" }));
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(changeSearchValue({ value: e.target.value }));
  };

  const handleSelectPerson = (person) => {
    dispatch(changeSearchValue({ selectedId: person.id }));
    dispatch(setActiveDepartment(person.dep));
    close();
  };

  return (
    <Modal close={close} title={"Поиск"} width={1100}>
      <div className={styles.search}>
        <div className={styles.header}>
          <Input
            placeholder="Начните печатать для поиска"
            value={value}
            onChange={handleSearch}
            className={styles.input}
          />
        </div>
        <div className={styles.block}>
          {arraySearch(allPeople, value).length ? (
            arraySearch(allPeople, value).map((person) => (
              <div
                className={styles.row}
                key={person.id + person.name}
                onClick={() => handleSelectPerson(person)}
              >
                <span>{person.name}</span>
                <span>{person.num_ip}</span>
                <span>{person.num_city}</span>
                <span>{person.num_work}</span>
                <span>{person.num_reserve}</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>
              Поиск не дал результатов. <br /> Проверьтие правильность
              введенного запроса
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchPopup;

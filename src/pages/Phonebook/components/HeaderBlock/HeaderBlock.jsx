import React, { useEffect, useRef, useState } from "react";
import styles from "./HeaderBlock.module.scss";
import arrow from "../../../../assets/img/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadDepartmentData,
  setActiveDepartment,
} from "../../../../redux/phonebook/actions";
import { Button } from "../../../../components/components";
import EditorPersonPopup from "../EditorPersonPopup/EditorPersonPopup";
import SearchPopup from "../SearchPopup/SearchPopup";

const HeaderBlock = () => {
  const {
    phonebook: { activeDepartmentId, departments },
    authentication: {
      access: { phonebook: accessLevel },
    },
  } = useSelector((state) => state);
  const activeDepartment = departments[activeDepartmentId - 1];

  const [submenu, setSubmenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState(false);
  const subRef = useRef(null);

  const handleOutsideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(subRef.current)) {
      setSubmenu(false);
    }
  };

  const handleSubmenuToggle = () => {
    setSubmenu((prev) => !prev);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(downloadDepartmentData(activeDepartmentId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSelectedDepartment = (id) => {
    dispatch(setActiveDepartment(id));
    const downloadDelay = 600000;
    const departmentTimestampNow = departments[id - 1].timestamp;
    const timeDifference = Date.now() - departmentTimestampNow;
    if (departmentTimestampNow === 0) {
      console.log(
        `downloaded department ${id}, department timestamp = ${departmentTimestampNow} `
      );
      dispatch(downloadDepartmentData(id));
    } else if (timeDifference > downloadDelay) {
      console.log(
        `downloaded department ${id}, timeDifference = ${timeDifference}`
      );
      dispatch(downloadDepartmentData(id));
    } else {
      console.log(`department ${id}, timeDifference = ${timeDifference}`);
    }
  };

  const handleModalToggle = () => {
    setModal((value) => !value);
  };

  const handleSearchToggle = () => {
    setSearch((value) => !value);
  };

  return (
    <div className={styles.toolbar}>
      <ul className={styles.submenu} onClick={handleSubmenuToggle} ref={subRef}>
        <div className={styles.title}>{activeDepartment.name}</div>
        <img src={arrow} alt={"arrow"} className={submenu ? styles.up : null} />

        {submenu && (
          <div className={styles.list}>
            {departments.map((department) => (
              <li
                key={department.id}
                className={
                  activeDepartmentId === department.id ? styles.active : null
                }
                onClick={() => handleSelectedDepartment(department.id)}
              >
                {department.name}
              </li>
            ))}
          </div>
        )}
      </ul>
      <div className={styles.search}>
        <Button
          yellow
          type="button"
          title={"Поиск сотрудника"}
          onClick={handleSearchToggle}
        />
        {accessLevel > 1 && (
          <Button
            red
            type="button"
            title={"Добавить"}
            onClick={handleModalToggle}
          />
        )}
      </div>

      {modal && <EditorPersonPopup close={handleModalToggle} />}
      {search && <SearchPopup close={handleSearchToggle} />}
    </div>
  );
};

export default HeaderBlock;

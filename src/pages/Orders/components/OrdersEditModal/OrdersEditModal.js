import React from "react";
import Modal from "../../../../components/Modal/Modal";
import { Button, Input } from "../../../../components/components";
import styles from "./OrdersEditModal.module.scss";
import { fieldsToObj } from "../../../../helpers/halpersFunctions";
import { useSelector } from "react-redux";

const OrdersEditModal = ({ close, data }) => {
  const { id, deadline, incoming_num, executor, text } = data;

  const {
    authentication: {
      access: { orders },
    },
    authentication: { token },
  } = useSelector((state) => state);
  console.log(orders, token);
  const submit = (e) => {
    e.preventDefault();
    const newString = fieldsToObj(e);
    newString.incoming_num =
      newString.incoming_type + ";" + newString.incoming_num;
    delete newString.incoming_type;
    if (id) {
      newString.id = id;
      return console.log(newString);
    } else {
      return console.log(newString);
    }
  };

  return (
    <Modal close={close} title={"Изменение задачи"} width={550}>
      <form className={styles.form} onSubmit={submit}>
        <label htmlFor="deadline">Время выполнения до</label>
        <Input
          type="date"
          id="deadline"
          defaultValue={deadline.split("T")[0]}
          centre
        />

        <label htmlFor="incoming_type">Тип задачи</label>
        <select id="incoming_type" defaultValue={incoming_num.split(";")[0]}>
          <option value={"Распоряжение Росгвардии"}>
            {"Распоряжение Росгвардии"}
          </option>
          <option value={"СЭД"}>{"СЭД"}</option>
          <option value={"Приказ ФГКУ ЦУС"}>{"Приказ ФГКУ ЦУС"}</option>
          <option value={"Резолюция начальника учреждения"}>
            {"Резолюция начальника учреждения"}
          </option>
        </select>

        <label htmlFor="incoming_num">Номер документа</label>
        <Input
          id="incoming_num"
          defaultValue={incoming_num.split(";")[1]}
          centre
        />

        <label htmlFor="executor">Ответственный за выолнение</label>
        <Input id="executor" defaultValue={executor} centre />

        <label htmlFor="text">Текст задачи</label>
        <textarea id="text" defaultValue={text}></textarea>

        <div className={styles.row}>
          <Button type={"submit"} title="Изменить" yellow />
          <Button type={"submit"} title="Добавить" yellow />
          <Button type={"button"} title="Удалить" red />
        </div>
      </form>
    </Modal>
  );
};

export default OrdersEditModal;

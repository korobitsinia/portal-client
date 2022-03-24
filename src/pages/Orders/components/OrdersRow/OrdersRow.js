import React, { useState } from "react";
import OrdersEditModal from "../OrdersEditModal/OrdersEditModal";
import styles from "./OrdersRow.module.scss";

const OrdersRow = ({ data }) => {
  const {deadline, incoming_num, executor, text } = data;

  const [modal, setModal] = useState(false);
  const dateFormat = (str) => {
    return `
      ${new Date(str).getDate()}.${String(
      new Date(str).getMonth() + 1
    ).padStart(2, "0")}.${new Date(str).getFullYear()}
      `;
  };

  const handleModalOpen = () => {
    setModal((v) => true);
  };
  const handleModalClose = (e) => {
    e.stopPropagation();
    setModal((v) => false);
  };
  let time = dateFormat(deadline);
  
  return (
    <div
      className={styles.row}
      onClick={handleModalOpen}
    >
      <div>{executor}</div>
      <div>{time}</div>
      <div>{incoming_num}</div>
      <div>{text}</div>

      {modal ? (
        <OrdersEditModal close={handleModalClose} data={data}  />
      ) : null}
    </div>
  );
};

export default OrdersRow;

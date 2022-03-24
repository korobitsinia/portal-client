import React from "react";
import OrdersRow from "../OrdersRow/OrdersRow";
import styles from "./OrdersBlock.module.scss";

const OrdersBlock = ({ title, orders }) => {
  if (orders.length < 1) {
    return <></>;
  }
  return (
    <div className={styles.section}>
      <div className={styles.title}>{title}.</div>
      <div className={styles.rows}>
        {orders.map((order) => {
          return <OrdersRow key={order.id} data={order} />;
        })}
      </div>
    </div>
  );
};

export default OrdersBlock;

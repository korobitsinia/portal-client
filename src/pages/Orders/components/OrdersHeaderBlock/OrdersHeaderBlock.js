import React from "react";
import styles from "./OrdersHeaderBlock.module.scss";
import Button from "../../../../components/Button/Button";

const OrdersHeaderBlock = (props) => {


  
  return (
    <div className={styles.OrdersHeaderBlock}>
      <div className={styles.block}>
        <Button
          type={"button"}
          title={"Архив"}
          yellow
          style={{ marginRight: "1rem" }}
        />
        <Button type={"button"} title={"Добавить"} red />
      </div>
    </div>
  );
};
export default OrdersHeaderBlock;

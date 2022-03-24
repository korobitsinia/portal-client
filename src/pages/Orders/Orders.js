import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewOrder,
  downloadActiveOrders,
  updateOrder,
  deleteOrder,
  completeOrder,
  downloadArchiveOrders,
  returnFromArchive,
} from "../../redux/orders/actions";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import styles from "./Orders.module.scss";
import OrdersHeaderBlock from "./components/OrdersHeaderBlock/OrdersHeaderBlock";
import OrdersBlock from "./components/OrderdsBlock/OrdersBlock";
import orders from "../../redux/orders/reducer";

const Orders = () => {
  const dispatch = useDispatch();
  const { authentication, orders } = useSelector((state) => state);

  const [archiveVisible, setArchiveVisible] = useState(false);

  useEffect(() => {
    dispatch(downloadActiveOrders());
  }, []);

  // const qwe = () => {
  // dispatch(
  //   createNewOrder(
  //     {
  //       deadline: "14.04.2022",
  //       incoming_num: "1adfgh5 ",
  //       executor: "vaasdfsya",
  //       text: "ahzsdfg  fggdj sdfjh gsd hdyjk dg",
  //     },
  //     authentication.token
  //   )
  // );
  // dispatch(
  //   updateOrder(
  //     {
  //       id:6,
  //       deadline: "14.04.2022",
  //       incoming_num: "1adfgh5 ",
  //       executor: "vaasdfsya",
  //       text: "CHANGED",
  //     },
  //     authentication.token
  //   )
  // );
  // dispatch(deleteOrder(1, authentication.token));
  // dispatch(
  //   completeOrder({ id: 2, outgoing_num: "124 43463" }, authentication.token)
  // );

  // dispatch(downloadArchiveOrders());
  // dispatch(returnFromArchive({id:5}, authentication.token))
  // };

  return (
    <div className={styles.orders}>
      <ContentHeader>
        <OrdersHeaderBlock />
      </ContentHeader>

      <div className={styles.body}>
        <div className="container">
          {!archiveVisible &&
            orders.partsOfOrders.map(({ id, name, orders }) => {
              return <OrdersBlock key={id} title={name} orders={orders} />;
            })}
            {archiveVisible && 
            (<div>ARHIVE COMPONENT</div>)}
            <input type={'date'} onChange={(e)=>console.log(e.target.value)}/>
        </div>
      </div>
    </div>
  );
};
export default Orders;

const initialState = {
  partsOfOrders: [
    {
      id: 0,
      name: "Срок выполнения: менее трех дней",
      startDay: 0,
      endDay: 3,
      orders: [],
    },
    {
      id: 1,
      name: "Срок выполнения: менее десяти дней",
      startDay: 3,
      endDay: 10,
      orders: [],
    },
    {
      id: 2,
      name: "Срок выполнения: менее месяца",
      startDay: 10,
      endDay: 31,
      orders: [],
    },
    {
      id: 3,
      name: "Срок выполнения: 365 дней",
      startDay: 31,
      endDay: 365,
      orders: [],
    },
  ],
  defaultPartId: 0,
  loading: false,
  allOrders: [],
  archive: [],
};

const timeToDeadline = (deadline) => {
  let dateA = new Date(deadline);
  let dateB = new Date();
  return (dateA - dateB) / 1000 / 60 / 60 / 24
};

const orders = (state = initialState, action) => {
  
  const clearOrders = () => {
    return state.partsOfOrders.map((part) => {
      part.orders.length = 0;
    });
  };

  switch (action.type) {
    case "ORDERS_SET_ACTIVE_ORDERS":
      clearOrders();
      let partsOfOrdersCopy = [...state.partsOfOrders];
      action.payload.forEach((order) => {
        order.timeLeft = timeToDeadline(order.deadline);
        partsOfOrdersCopy.forEach((part) => {
          if (part.startDay <= order.timeLeft && part.endDay > order.timeLeft) {
            part.orders.push(order);
          }
        });
      });

      return {
        ...state,
        partsOfOrders: partsOfOrdersCopy,
        allOrders: action.payload,
      };

    case "ORDERS_SET_ARCHIVE_ORDERS":
      return { ...state, archive: action.payload };

    default:
      return state;
  }
};

export default orders;

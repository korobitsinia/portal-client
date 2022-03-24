import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import "./Notification.css";

const Notification = () => {
  const { responses } = useSelector(({ responseLog }) => responseLog);
  const lastMessage = responses[responses.length - 1]
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [responses]);

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000);
  }, [visible]);

  if (lastMessage) {
    return (
      <Transition in={visible} timeout={500} mountOnEnter unmountOnExit>
        {(state) => (
          <div className={`notification ${state}`}>
            <div>{lastMessage.message}</div>
          </div>
        )}
      </Transition>
    );
  } else {
    return <></>;
  }
};
export default Notification;

import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

let timeoutId; // track the timer

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState("");

  const triggerNotification = (message, seconds) => {
    setNotification(message);

    clearTimeout(timeoutId); // cancel any existing timer first
    timeoutId = setTimeout(() => {
      setNotification("");
    }, seconds * 1000);
  };

  return (
    <NotificationContext.Provider value={{ notification, triggerNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

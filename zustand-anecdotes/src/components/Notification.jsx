import useNotificationStore from "../stores/notificationStore";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 10,
};

const Notification = () => {
  const message = useNotificationStore((state) => state.message);

  return message === null ? null : <div style={style}>{message}</div>;
};

export default Notification;

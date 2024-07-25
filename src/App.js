import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsQuery,
} from "./features/notifications/notificationsSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  // Trigger initial fetch of notifications and keep the websocket open to receive updates
  useGetNotificationsQuery();
  const notificationsMetadata = useSelector(selectNotificationsMetadata);
  const numUnreadNotifications = notificationsMetadata.filter(
    (n) => !n.read
  ).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket());
  };

  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    );
  }

  return (
    <div>
      <nav>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/counter">Counter</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </nav>
      <br />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;

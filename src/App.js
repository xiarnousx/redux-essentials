import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import {
  fetchNotifications,
  selectAllNotifications,
} from "./features/notifications/notificationsSlice";

const App = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  const unreadNotificationsBadge = (
    <span className="badge">{numUnreadNotifications}</span>
  );

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

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

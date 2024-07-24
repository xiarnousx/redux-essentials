import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import PostsList from "./features/posts/PostsList";
import CounterApp from "./CounterApp";
import App from "./App";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NotificationsList from "./features/notifications/NotificationsList";

import { store } from "./app/store";
import { fetchUsers } from "./features/users/usersSlice";

import { worker } from "./api/server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route exact path="/counter" element={<CounterApp />} />
      <Route exact path="/posts" element={<PostsList />} />
      <Route exact path="/posts/:postId" element={<SinglePostPage />} />
      <Route exact path="/posts/edit/:postId" element={<EditPostForm />} />
      <Route exact path="/users" element={<UsersList />} />
      <Route exact path="/users/:userId" element={<UserPage />} />
      <Route exact path="/notifications" element={<NotificationsList />} />
    </Route>
  )
);

const container = document.getElementById("root");
const root = createRoot(container);

async function start() {
  await worker.start({ onUnhandledRequest: "bypass" });
  store.dispatch(fetchUsers());
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

start();

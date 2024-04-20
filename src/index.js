import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import Home from "./components/Home";
import "./styles/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>page</div>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

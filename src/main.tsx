import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import "./index.css";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: `"Poppins", sans-serif`,
          },
          components: {
            Pagination: {
              itemActiveBg: "#ABE7B2",
              itemBg: "#FFFFFF",
              colorPrimary: "#1B1B1B",
              colorPrimaryHover: "#23B133",
              colorPrimaryBorder: "#ABE7B2",
              fontWeightStrong: 700,
            },
            Input: {
              controlHeight: 48,
              inputFontSize: 16,
              borderRadius: 2,
            },
            Select: {
              controlHeight: 48,
              optionHeight: 34,
              fontSize: 16,
            },
            Table: {
              borderRadius: 200,
            },
          },
        }}
      >
        <RouterProvider router={Routes} />
        <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);

import { createContext, useState, useReducer } from "react";
import Routers from "./Router";

import { reducer, initialState } from "./Utils/reducer.js";
import { ConfigProvider, theme } from "antd";
import vi_VN from "antd/lib/locale/vi_VN.js";

import "animate.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "./index.css";
import "./App.css";

const Context = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const config = {
    token: {
      colorBgBase: isDarkMode ? "#000000" : "#fff",
      colorPrimary: "#ec3237",
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    components: {
      Button: {
        colorLink: "#ec3237",
        colorLinkHover: "#eb3237cc",
      },
    },
  };
  return (
    <Context.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        openModal,
        setOpenModal,
        state,
        dispatch,
      }}
    >
      <ConfigProvider locale={vi_VN} theme={config}>
        <Routers />
      </ConfigProvider>
    </Context.Provider>
  );
};

export { Context, App };

import { createContext, useState } from "react";
import Routers from "./Router";

import { ConfigProvider, theme } from "antd";
import vi_VN from "antd/lib/locale/vi_VN.js";

import "animate.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "./index.css";
import "./App.css";
import dayjs from "dayjs";
import "dayjs/locale/vi.js";
import updateLocale from "dayjs/plugin/updateLocale.js";

dayjs.extend(updateLocale);
dayjs.updateLocale("vi", {
  monthsShort: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
});
const Context = createContext();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [success, setSuccess] = useState(false);

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
        success,
        setSuccess,
      }}
    >
      <ConfigProvider locale={vi_VN} theme={config}>
        <Routers />
      </ConfigProvider>
    </Context.Provider>
  );
};

export { Context, App };

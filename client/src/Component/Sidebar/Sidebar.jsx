import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import logo from "../../assets/image/logo-mixue-compressed.jpg";
import { Context } from "../../App.jsx";
import { AiFillBook } from "react-icons/ai";
import { FaBook, FaBookBookmark } from "react-icons/fa6";
import {
  MoonFilled,
  SunFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import Tippy from "@tippyjs/react";
const navs = [
  {
    icon: <AiFillBook />,
    display: "Toàn bộ",
    path: "/all",
  },
  {
    icon: <FaBook />,
    display: "Vay mượn",
    path: "/borrow",
  },
  {
    icon: <FaBookBookmark />,
    display: "Cho vay",
    path: "/loan",
  },
];
const Sidebar = () => {
  const { isDarkMode, setIsDarkMode } = useContext(Context);
  const [showSidebar, setShowSidebar] = useState(false);
  const handleChange = (checked) => {
    setIsDarkMode(checked);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div>
      {showSidebar && (
        <div
          className="fixed z-[99] inset-0 bg-[#00000084] duration-300 transition-all"
          onClick={handleSidebar}
        ></div>
      )}
      <aside
        className={`xl:sidebar sidebar-hidden ${
          showSidebar && "sidebar-show"
        } transition-transform duration-300 h-[calc(100%-2.5rem)] border border-defaultBorder dark:border-defaultBorderDark dark:bg-gray rounded-xl shadow-xl`}
      >
        <div className="relative h-full">
          <div className="my-4 h-[calc(100%-2rem)] w-24 flex flex-col justify-between">
            <div className="mx-auto">
              <figure className="w-[56px] h-[56px] rounded-full border border-solid border-defaultBorder flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={logo}
                />
              </figure>
            </div>
            <div>
              <ul className="flex flex-col gap-2">
                {navs.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive
                            ? "bg-separator dark:bg-defaultBorderDark flex flex-col items-center gap-2 px-6 py-2 border-r-4 border-primaryColor transition-all duration-[500ms]"
                            : "hover:bg-layoutBackground dark:hover:bg-separatorDark flex flex-col items-center gap-2 px-6 py-2 border-r-4 border-transparent"
                        }
                      >
                        <span className="dark:text-textDark text-[1.2rem] text-secondaryText">
                          {item.icon}
                        </span>
                        <span className="dark:text-textDark text-[0.85rem] font-medium text-secondaryText w-max animate__animated animate__fadeIn">
                          {item.display}
                        </span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="px-6 flex items-center gap-3">
              <Tippy
                placement="top"
                content={`${isDarkMode ? "Tối" : "Sáng"}`}
                theme={isDarkMode ? "dark" : "light"}
              >
                <Switch
                  size="medium"
                  className="bg-defaultBorder"
                  onChange={handleChange}
                  checked={isDarkMode}
                  checkedChildren={<MoonFilled />}
                  unCheckedChildren={<SunFilled />}
                  defaultChecked
                />
              </Tippy>
            </div>
          </div>
        </div>
        <div
          className="bg-white p-2 xl:hidden shadow-xl rounded-md cursor-pointer absolute top-6 translate-x-24 dark:bg-gray border border-defaultBorder dark:border-defaultBorderDark dark:text-textDark"
          onClick={handleSidebar}
        >
          {showSidebar ? (
            <MenuFoldOutlined style={{ fontSize: 26 }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: 26 }} />
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

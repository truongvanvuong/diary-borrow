import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../../App.jsx";

import { PlusOutlined } from "@ant-design/icons";
import Tippy from "@tippyjs/react";
const HeadingPage = ({ title }) => {
  const { isDarkMode, setOpenModal, dispatch } = useContext(Context);
  const handleOpenModal = () => {
    dispatch({
      type: "add",
      payload: {
        title: "Thêm dữ liệu",
        btnText: "Thêm",
      },
    });
    setOpenModal(true);
  };
  return (
    <div className="px-5 flex gap-1 justify-between">
      <h1 className="font-bold text-[1.1rem] md:text-[1.5rem]  md:pb-1 border-b-2 border-primaryColor w-max dark:text-textHeaddingDark">
        {title}
      </h1>
      <div>
        <Tippy content="Ghi Thêm" theme={isDarkMode ? "dark" : "light"}>
          <div
            className="w-10 h-10 md:w-12 md:h-12 border border-defaultBorder dark:border-defaultBorderDark shadow-sm rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleOpenModal}
          >
            <PlusOutlined className="text-secondaryText font-light dark:text-secondaryTextDark text-[1rem] md:text-[1.2rem]" />
          </div>
        </Tippy>
      </div>
    </div>
  );
};

HeadingPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadingPage;

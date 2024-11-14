import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App.jsx";
import axios from "axios";
import { Popconfirm } from "antd";

import {
  PlusOutlined,
  DeleteFilled,
  QuestionOutlined,
} from "@ant-design/icons";
import Tippy from "@tippyjs/react";

import Modal from "../Modal";
import message from "../../Utils/message.js";
import { BASE_URL } from "../../config.js";

const HeadingPage = ({ title, refresh, selectedRowKeys }) => {
  const [deleteConut, setDeleteCount] = useState(0);
  const { isDarkMode } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    setDeleteCount(selectedRowKeys.length);
  }, [selectedRowKeys.length]);

  const confirmDeletes = async () => {
    const response = await axios.delete(`${BASE_URL}/delete-diaries`, {
      data: { selectedRowKeys },
    });
    const { data } = response;
    console.log(data);
    if (data.success) {
      setDeleteCount(0);
      setTimeout(() => {
        message("success", `Đã xóa ${data.deleteCount} bản ghi nhật ký`);
      }, 1000);
      refresh();
    } else {
      setTimeout(() => {
        message("error", "Lỗi, dữ liệu chưa được xóa");
      }, 1000);
    }
  };

  return (
    <div className="px-5 flex gap-1 items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-[1.1rem] md:text-[1.5rem] pb-2 border-b-2 border-primaryColor w-max dark:text-textHeaddingDark">
          {title}
        </h1>
        {hasSelected && (
          <div className="cursor-pointer animate__animated animate__fadeIn">
            <Popconfirm
              icon={<QuestionOutlined className="!text-primaryColor" />}
              title="Xác nhận xóa"
              placement="bottomRight"
              description={`Bạn chắc chắn muốn xóa ${deleteConut} bản ghi đã chọn?`}
              onConfirm={confirmDeletes}
              okText="OK"
              cancelText="Hủy"
            >
              <DeleteFilled className="dark:text-textDark text-[22px] text-secondaryText" />
              <span>({deleteConut})</span>
            </Popconfirm>
          </div>
        )}
      </div>
      <div>
        <Tippy
          content="Ghi Thêm"
          theme={isDarkMode ? "dark" : "light"}
          touch="hold"
        >
          <div
            className="w-10 h-10 md:w-12 md:h-12 border border-defaultBorder dark:border-defaultBorderDark shadow-sm rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleOpenModal}
          >
            <PlusOutlined className="text-secondaryText font-light dark:text-secondaryTextDark text-[1rem] md:text-[1.2rem]" />
          </div>
        </Tippy>
      </div>
      <Modal
        refresh={refresh}
        mode="add"
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Thêm dữ liệu"
      />
    </div>
  );
};

HeadingPage.propTypes = {
  selectedRowKeys: PropTypes.array,
  title: PropTypes.string.isRequired,
  refresh: PropTypes.func,
};

export default HeadingPage;

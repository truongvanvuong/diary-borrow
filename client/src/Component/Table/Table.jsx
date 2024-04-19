import { useState, useContext } from "react";

import { Table as TableAntd, Switch, Popconfirm } from "antd";
import {
  SyncOutlined,
  QuestionOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import axios from "axios";

import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import formatDate from "../../Utils/formattedDate.js";
import { Context } from "../../App.jsx";
import message from "../../Utils/message.js";

const columns = [
  {
    title: "Tên cửa hàng",
    dataIndex: "storeName",
  },
  {
    title: "Hình thức",
    dataIndex: "types",
  },
  {
    title: "Vật phẩm",
    dataIndex: "item",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
    width: 100,
  },
  {
    title: "Đơn vị",
    dataIndex: "unit",
  },
  {
    title: "Ngày vay",
    dataIndex: "BorrowingDate",
  },
  {
    title: "Ngày trả",
    dataIndex: "returnDate",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    filters: [
      {
        text: "Chưa trả",
        value: false,
      },
      {
        text: "Đã trả",
        value: true,
      },
    ],
    onFilter: (value, record) => record.status.props.returned === value,
  },
  {
    title: "Hành động",
    dataIndex: "aciton",
    align: "center",
  },
];

const Table = ({ data, loading }) => {
  const ActionColumn = ({ id }) => {
    const { setOpenModal, dispatch } = useContext(Context);
    const handleOpenModal = (_id) => {
      dispatch({
        type: "update",
        payload: {
          title: "Cập nhật dữ liệu",
          btnText: "Cập nhật",
          id: _id,
        },
      });
      setOpenModal(true);
    };

    const confirm = async (e) => {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      const { data } = response;
      if (data.success) {
        setTimeout(() => {
          message("success", "Đã xóa thành công");
        }, 500);
      } else {
        setTimeout(() => {
          message("error", "Lỗi, dữ liệu chưa được xóa");
        }, 500);
      }
    };
    const cancel = (e) => {};
    return (
      <div className="flex items-center gap-3 justify-center text-[20px] text-secondaryText">
        <Tippy content="Chỉnh sửa" placement="top">
          <div className="cursor-pointer" onClick={() => handleOpenModal(id)}>
            <AiFillEdit className=" dark:text-textDark" />
          </div>
        </Tippy>
        <Tippy content="Xóa" placement="top">
          <div>
            <Popconfirm
              icon={<QuestionOutlined className="!text-primaryColor" />}
              title="Xác nhận xóa"
              placement="topRight"
              description="Bạn chắc chắn xóa dữ liệu hiện tại?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="OK"
              cancelText="Hủy"
            >
              <div className="cursor-pointer">
                <AiFillDelete className=" dark:text-textDark" />
              </div>
            </Popconfirm>
          </div>
        </Tippy>
      </div>
    );
  };
  const StatusColumn = ({ returned, id }) => {
    const [checked, setChecked] = useState(returned);
    const handleUpdateStatus = (checked) => {
      setChecked(checked);
    };
    const confirm = async (e) => {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        returned: checked,
      });

      const { data } = response;
      if (data.success) {
        setTimeout(() => {
          message("success", "Trạng thái đã được thay đổi");
        }, 1000);
      } else {
        setTimeout(() => {
          message("error", "Trạng thái chưa được thay đổi");
        }, 1000);
      }
    };
    const cancel = (e) => {
      setChecked(!checked);
    };
    return (
      <div className="flex items-center gap-4 justify-between">
        <span>{checked ? "Đã trả" : "Chưa trả"}</span>
        <Popconfirm
          icon={<SyncOutlined className="!text-primaryColor" />}
          title="Thay đổi trạng thái"
          placement="top"
          description="Sau khi xác nhận sẽ thay đổi trạng thái hiện tại"
          onConfirm={confirm}
          onCancel={cancel}
          okText="OK"
          cancelText="Hủy"
        >
          <Switch
            size="medium"
            className="bg-defaultBorder"
            onChange={handleUpdateStatus}
            checked={checked}
          />
        </Popconfirm>
      </div>
    );
  };
  const dataSource = data.map((item) => ({
    key: item._id,
    storeName: item.storeName,
    types: item.loan ? "Cho vay" : "Vay mượn",
    item: item.item,
    quantity: item.quantity,
    unit: item.unit,
    status: <StatusColumn returned={item.returned} id={item._id} />,
    BorrowingDate: item.loanDate
      ? formatDate(item.loanDate)
      : formatDate(item.createdAt),
    returnDate: item.returned
      ? item.returnDate
        ? formatDate(item.returnDate)
        : formatDate(item.updatedAt)
      : "Chưa trả lại",
    aciton: <ActionColumn id={item._id} />,
  }));
  return (
    <div className="px-5 my-5">
      <TableAntd
        loading={{
          indicator: (
            <LoadingOutlined
              style={{
                fontSize: 36,
              }}
            />
          ),
          spinning: loading,
        }}
        bordered
        size="large"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: "calc(100vh - 15rem)",
          x: "max-content",
        }}
      />
    </div>
  );
};
export default Table;

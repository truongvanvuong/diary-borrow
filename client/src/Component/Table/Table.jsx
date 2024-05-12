import { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";

import {
  Table as TableAntd,
  Switch,
  Popconfirm,
  Button,
  Input,
  Space,
} from "antd";
import {
  SyncOutlined,
  QuestionOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import axios from "axios";

import { BASE_URL } from "../../config.js";
import formatDate from "../../Utils/formattedDate.js";
import message from "../../Utils/message.js";
import Modal from "../Modal";

import { Context } from "../../App.jsx";

const Table = ({ data }) => {
  const [dataItem, setDataItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const { setSuccess } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder="Nhập từ khóa"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Bỏ tìm kiếm
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text),
  });

  const ActionColumn = ({ id }) => {
    const handleOpenModal = async (_id) => {
      setLoadingModal(true);
      setOpenModal(true);
      try {
        const res = await axios.get(`${BASE_URL}/${_id}`);
        const result = res.data;
        setDataItem(result.data);
        setLoadingModal(false);
      } catch (error) {
        setError(error.message);
      }
    };

    const confirm = async (e) => {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      const { data } = response;
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          message("success", "Đã xóa thành công");
        }, 1000);
      } else {
        setTimeout(() => {
          message("error", "Lỗi, dữ liệu chưa được xóa");
        }, 1000);
      }
    };
    const cancel = (e) => {};
    return (
      <div className="flex items-center gap-3 justify-center text-[20px] text-secondaryText">
        <Tippy content="Chỉnh sửa" placement="top" touch="hold">
          <div className="cursor-pointer" onClick={() => handleOpenModal(id)}>
            <AiFillEdit className=" dark:text-textDark" />
          </div>
        </Tippy>
        <Tippy content="Xóa" placement="top" touch="hold">
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
        setSuccess(true);
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
  const columns = [
    {
      title: "Tên cửa hàng",
      dataIndex: "storeName",
      ...getColumnSearchProps("storeName"),
    },
    {
      title: "Hình thức",
      dataIndex: "types",
    },
    {
      title: "Vật phẩm",
      dataIndex: "item",
      ...getColumnSearchProps("item"),
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
  const dataSource = data?.map((item) => ({
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
      <Modal
        action="update"
        openModal={openModal}
        setOpenModal={setOpenModal}
        dataItem={dataItem}
        loading={loadingModal}
        title="Cập nhật dữ liệu"
      />
    </div>
  );
};
Table.propTypes = {
  data: PropTypes.array,
};
export default Table;

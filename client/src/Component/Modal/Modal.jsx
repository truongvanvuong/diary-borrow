import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import {
  Modal as ModalAntd,
  DatePicker,
  Radio,
  Select,
  Switch,
  Spin,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN.js";

import message from "../../Utils/message.js";
import { Input } from "../../Component";
import Tippy from "@tippyjs/react";

import { BASE_URL } from "../../config.js";

import dayjs from "dayjs";

const selectOption = [
  {
    value: "Gói",
    label: "Gói",
  },
  {
    value: "Hộp",
    label: "Hộp",
  },
  {
    value: "Dây",
    label: "Dây",
  },
  {
    value: "Kg",
    label: "Kg",
  },
  {
    value: "Túi",
    label: "Túi",
  },
  {
    value: "Chai",
    label: "Chai",
  },
  {
    value: "Thùng",
    label: "Thùng",
  },
];
const Modal = ({
  openModal,
  setOpenModal,
  mode,
  title,
  loading,
  dataItem,
  refresh,
}) => {
  const currentDate = dayjs();
  const [valueRadio, setValueRadio] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    item: "",
    quantity: "",
    unit: "",
    loanDate: currentDate,
    returnDate: null,
    returned: false,
    loan: false,
    borrow: false,
  });
  useEffect(() => {
    if (dataItem) {
      setValueRadio(dataItem.loan ? "loan" : dataItem.borrow ? "borrow" : null);
      setChecked(dataItem.returned);
      setFormData({
        storeName: dataItem.storeName || "",
        item: dataItem.item || "",
        quantity: (dataItem?.quantity || "").toString(),
        unit: dataItem.unit || "",
        loanDate: dataItem.loanDate || currentDate,
        returnDate: dataItem.returnDate || currentDate,
        returned: dataItem.returned || false,
        loan: dataItem.loan || false,
        borrow: dataItem.borrow || false,
      });
    }
  }, [dataItem]);

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
    switch (e.target.value) {
      case "loan":
        setFormData((prev) => ({ ...prev, loan: true, borrow: false }));
        setErrors((prev) => ({ ...prev, loan: false }));
        break;
      case "borrow":
        setFormData((prev) => ({ ...prev, loan: false, borrow: true }));
        setErrors((prev) => ({ ...prev, borrow: false }));
        break;
      default:
        throw new Error("Error: " + e.target.value);
    }
  };

  const onChangSwitch = (checked) => {
    setChecked(checked);
    setFormData((prev) => ({
      ...prev,
      returned: checked,
      returnDate: checked ? formData.returnDate || currentDate : null,
    }));
  };
  const onChangeLoanDate = (date) => {
    setFormData((prev) => ({ ...prev, loanDate: date }));
  };
  const onChangeReturnDate = (date) => {
    setFormData((prev) => ({ ...prev, returnDate: date }));
  };

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, [e.target.id]: false }));
    }
  };
  const handleCancel = () => {
    setFormData({
      storeName: "",
      item: "",
      quantity: "",
      returned: false,
      unit: "",
      loanDate: currentDate,
      returnDate: null,
      loan: false,
      borrow: false,
    });
    setValueRadio("");
    setOpenModal(false);
    setConfirmLoading(false);
    setErrors({});
  };
  const handleOk = async () => {
    const newErrors = {
      storeName: !formData.storeName ? "Nhập tên cửa hàng" : null,
      item: !formData.item ? "Nhập vật phẩm" : null,
      quantity:
        formData.quantity === ""
          ? "Nhập số lượng"
          : formData.quantity === "0"
          ? "Số lượng không thể bằng 0"
          : null,
      unit: !formData.unit ? true : null,
      loan: formData.borrow ? null : !formData.loan ? true : null,
      borrow: formData.loan ? null : !formData.borrow ? true : null,
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);

    if (!hasError) {
      setConfirmLoading(true);
      try {
        const response = await axios({
          method: `${mode === "add" ? "post" : "put"}`,
          url: `${
            mode === "add" ? BASE_URL + "/" : BASE_URL + "/" + dataItem._id
          }`,
          data: formData,
        });
        const { data } = response;
        if (data.success) {
          setTimeout(() => {
            setConfirmLoading(false);
            setOpenModal(false);
            message(
              "success",
              `Dữ liệu đã được ${mode === "add" ? "Thêm" : "Cập nhật"}`
            );
          }, 1000);
          refresh();
          handleCancel();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeSelect = (value) => {
    setErrors((prev) => ({ ...prev, unit: false }));
    setFormData((prev) => ({ ...prev, unit: value }));
  };
  const disabledLoanDate = (current) => {
    // Không thể chọn các ngày sau ngày trả
    return (
      mode !== "add" && checked && dayjs(current).isAfter(formData.returnDate)
    );
  };

  const disabledReturnDate = (current) => {
    // Không thể chọn các ngày trước ngày vay
    return dayjs(current).isBefore(formData.loanDate);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <ModalAntd
      width={800}
      centered
      title={
        <h1 className="text-[1.2rem] md:text-[1.6rem] font-medium text-center dark:text-textHeaddingDark ">
          {title}
        </h1>
      }
      open={openModal}
      onOk={handleOk}
      okText="OK"
      cancelText="Hủy"
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {loading ? (
        <div className="h-[350px] flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex-col flex md:flex-row w-full gap-10 md:p-2 animate__animated animate__fadeIn">
          <div className="md:w-1/2 w-full flex flex-col gap-8 justify-between">
            <div>
              <label
                className="dark:text-textDark text-[0.9rem] md:text-[1rem]"
                htmlFor="storeName"
              >
                Tên cửa hàng
              </label>
              <Input
                id="storeName"
                type="text"
                onChange={handleOnChange}
                value={formData.storeName}
                messError={errors.storeName}
              />
            </div>
            <div>
              <label
                className="dark:text-textDark text-[0.9rem] md:text-[1rem]"
                htmlFor="item"
              >
                Vật phẩm
              </label>
              <Input
                id="item"
                type="text"
                value={formData.item}
                onChange={handleOnChange}
                messError={errors.item}
              />
            </div>
            <div>
              <label
                className="dark:text-textDark text-[0.9rem] md:text-[1rem]"
                htmlFor="quantity"
              >
                Số lượng
              </label>
              <Input
                id="quantity"
                type="number"
                onChange={handleOnChange}
                min="0"
                value={formData.quantity}
                messError={errors.quantity}
              />
            </div>
            {mode == "update" && (
              <div>
                <label
                  className="dark:text-textDark text-[0.9rem] md:text-[1rem]"
                  htmlFor="status"
                >
                  Trạng thái
                </label>
                <div className="flex items-center gap-4 justify-between mt-4">
                  <label htmlFor="status" className="dark:text-textDark">
                    {checked ? "Đã trả" : "Chưa trả"}
                  </label>
                  <Switch
                    id="status"
                    size="medium"
                    className="bg-defaultBorder"
                    checked={checked}
                    onChange={onChangSwitch}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-8 justify-between">
            <div>
              <div className="flex justify-between ">
                <label
                  className="dark:text-textDark text-[0.9rem] md:text-[1rem]"
                  htmlFor="unit"
                >
                  Đơn vị
                </label>
                <Select
                  popupClassName="dark:bg-gray"
                  showSearch
                  placeholder="Chọn đơn vị"
                  value={formData.unit === "" ? null : formData.unit}
                  optionFilterProp="children"
                  onChange={onChangeSelect}
                  filterOption={filterOption}
                  options={selectOption}
                />
              </div>
              {errors.unit && (
                <p className="mt-2 text-red-600 text-[0.9rem] animate__animated animate__fadeIn">
                  Chọn đơn vị
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="dark:text-textDark text-[0.9rem] md:text-[1rem]"
                htmlFor="loan-date"
              >
                Thời gian vay
              </label>
              <DatePicker
                disabledDate={disabledLoanDate}
                value={formData.loanDate ? dayjs(formData.loanDate) : null}
                locale={locale}
                id="loan-date"
                className="mt-4 focus:border-primaryColor dark:bg-gray dark:text-textDark dark:border-defaultBorderDark"
                placeholder="Chọn ngày"
                format={{
                  format: "DD-MM-YYYY",
                }}
                onChange={onChangeLoanDate}
              />
            </div>
            <div>
              <label className="dark:text-textDark text-[0.9rem] md:text-[1rem] cursor-pointer hover:opacity-90">
                Hình thức
              </label>
              <div className="mt-4">
                <Radio.Group
                  onChange={onChangeRadio}
                  className="flex justify-between"
                  value={valueRadio}
                >
                  <Radio value="loan" className="dark:text-textDark">
                    Cho vay
                  </Radio>
                  <Radio value="borrow" className="dark:text-textDark">
                    Vay mượn
                  </Radio>
                </Radio.Group>
                {errors.loan && errors.borrow && (
                  <p className="mt-2 text-red-600 text-[0.9rem] animate__animated animate__fadeIn">
                    Hãy lựa chọn hình thức
                  </p>
                )}
              </div>
            </div>
            {mode === "update" && (
              <Tippy
                content="Vật phẩm chưa trả lại không thể thay đổi ngày trả"
                onShow={() => (!checked ? true : false)}
              >
                <div
                  className={`transition-opacity duration-300 p-2 ${
                    !checked && "relative"
                  }`}
                >
                  {!checked && (
                    <div className="absolute inset-0 bg-[#f5f5f5] dark:bg-secondaryTextDark dark:bg-[#393939] rounded-lg opacity-50 z-10"></div>
                  )}
                  <div
                    className={`flex flex-col ${
                      !checked && "pointer-events-none"
                    }`}
                  >
                    <label
                      className="dark:text-textDark  text-[0.9rem] md:text-[1rem]"
                      htmlFor="return-date"
                    >
                      Thời gian trả
                    </label>
                    <DatePicker
                      disabledDate={disabledReturnDate}
                      value={
                        checked && formData.returnDate
                          ? dayjs(formData.returnDate)
                          : null
                      }
                      locale={locale}
                      id="return-date"
                      className="mt-4 focus:border-primaryColor dark:bg-gray dark:text-textDark dark:border-defaultBorderDark"
                      placeholder="Chọn ngày"
                      format={{
                        format: "DD-MM-YYYY",
                        type: "mask",
                      }}
                      onChange={onChangeReturnDate}
                    />
                  </div>
                </div>
              </Tippy>
            )}
          </div>
        </div>
      )}
    </ModalAntd>
  );
};

Modal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  mode: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  dataItem: PropTypes.object,
  refresh: PropTypes.func,
};
export default Modal;

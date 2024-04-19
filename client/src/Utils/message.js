import { message } from "antd";
const Message = (type, content) => {
  message.open({
    className: "text-white text-[1rem] font-medium",
    type: type,
    content: content,
    duration: 2,
  });
};
export default Message;

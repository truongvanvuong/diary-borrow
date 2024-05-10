import { Sidebar, Modal } from "../Component";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full dark:bg-dark p-5">
      <div className="flex xl:gap-5 h-full w-full">
        <Sidebar />
        <main className="w-full h-full">
          <div className="border border-defaultBorder w-full h-[calc(100vh-2.5rem)] shadow-xl dark:border-defaultBorderDark dark:bg-gray rounded-xl">
            <div className="py-6">{children}</div>
          </div>
        </main>
      </div>
      <Modal />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;

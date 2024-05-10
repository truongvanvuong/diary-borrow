import { HeadingPage, Table } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { Spin } from "antd";

const Borrow = () => {
  const { data, loading } = useFetch(`${BASE_URL}/borrow`);
  return (
    <div>
      <HeadingPage title="Danh sách vay mượn" />
      <div>
        {loading ? (
          <div className="mt-8 text-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table data={data} />
        )}
      </div>
    </div>
  );
};

export default Borrow;

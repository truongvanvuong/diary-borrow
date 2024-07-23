import { HeadingPage, Table } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { Spin } from "antd";

const Borrow = () => {
  const { data, loading, refresh } = useFetch(`${BASE_URL}/borrow`);
  return (
    <div>
      <HeadingPage title="Danh sách vay mượn" refresh={refresh} />
      <div>
        {loading ? (
          <div className="mt-8 text-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table data={data} refresh={refresh} />
        )}
      </div>
    </div>
  );
};

export default Borrow;

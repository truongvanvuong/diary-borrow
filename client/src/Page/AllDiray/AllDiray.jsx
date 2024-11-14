import useFetch from "../../Hook/useFetch.js";
import { useState } from "react";
import { BASE_URL } from "../../config.js";
import { HeadingPage, Table } from "../../Component/index.js";
import { Spin } from "antd";
const AllDiray = () => {
  const { data, loading, refresh } = useFetch(`${BASE_URL}/`);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <div>
      <HeadingPage
        title="Toàn bộ "
        refresh={refresh}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <div>
        {loading ? (
          <div className="mt-8 text-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            data={data}
            refresh={refresh}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        )}
      </div>
    </div>
  );
};

export default AllDiray;

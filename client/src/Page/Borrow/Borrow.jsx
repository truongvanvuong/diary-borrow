import { HeadingPage, Table } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { Spin } from "antd";

const Borrow = () => {
  const { data, loading, refresh } = useFetch(`${BASE_URL}/borrow`);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <div>
      <HeadingPage
        title="Danh sách vay mượn"
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

export default Borrow;

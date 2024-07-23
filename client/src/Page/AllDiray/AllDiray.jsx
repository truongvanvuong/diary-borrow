import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { HeadingPage, Table } from "../../Component/index.js";
import { Spin } from "antd";
const AllDiray = () => {
  const { data, loading, refresh } = useFetch(`${BASE_URL}/`);

  return (
    <div>
      <HeadingPage title="Toàn bộ " refresh={refresh} />
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

export default AllDiray;

import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { HeadingPage, Table } from "../../Component/index.js";
import { Spin } from "antd";
const AllDiray = () => {
  const { data, loading } = useFetch(`${BASE_URL}/`);

  return (
    <div>
      <HeadingPage title="Toàn bộ " />
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

export default AllDiray;

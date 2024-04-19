import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { HeadingPage, Table } from "../../Component/index.js";

const AllDiray = () => {
  const { data, loading } = useFetch(`${BASE_URL}/`);
  return (
    <div>
      <HeadingPage title="Toàn bộ " />
      <div>
        <Table data={data} loading={loading} />
      </div>
    </div>
  );
};

export default AllDiray;

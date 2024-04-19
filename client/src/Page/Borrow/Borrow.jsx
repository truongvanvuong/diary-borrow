import { HeadingPage, Table } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";

const Borrow = () => {
  const { data, loading } = useFetch(`${BASE_URL}/borrow`);
  return (
    <div>
      <HeadingPage title="Danh sách vay mượn" />
      <div>
        <div>
          <Table data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Borrow;

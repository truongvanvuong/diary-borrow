import { HeadingPage, Table } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";

const Loan = () => {
  const { data, loading } = useFetch(`${BASE_URL}/loan`);
  return (
    <div>
      <HeadingPage title="Danh sách cho mượn" />
      <div>
        <div>
          <Table data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Loan;

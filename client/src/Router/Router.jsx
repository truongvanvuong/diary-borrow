import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../Layout";
import { AllDiray, Borrow, Loan } from "../Page";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/all" />} />
      <Route
        path="/all"
        element={
          <Layout>
            <AllDiray />
          </Layout>
        }
      />
      <Route
        path="/borrow"
        element={
          <Layout>
            <Borrow />
          </Layout>
        }
      />
      <Route
        path="/loan"
        element={
          <Layout>
            <Loan />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Routers;

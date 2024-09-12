import React from "react";
import Table from "../../Component/Table"; // หรือ path ที่ถูกต้องของคอมโพเนนต์ Table

const FinancialRecordTable = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Financial Records</h1>
      <Table />
    </div>
  );
};

export default FinancialRecordTable;

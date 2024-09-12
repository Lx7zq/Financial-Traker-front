import React from "react";
import { useUser } from "@clerk/nextjs";
import { useFinancialRecords } from "../../contexts/financial.context";
import FinancialRecordTable from "./FinancialRecordTable";
import Addbutton from "./Addbutton";

const dashbord = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-16">
      <div className="text-center text-3xl md:text-4xl md:leading-snug font-bold my-2">
        Welcome {user?.firstName} ! Here are your finances:
      </div>
      <Addbutton />
      <div className="mt-10">
        <FinancialRecordTable />
      </div>
    </div>
  );
};

export default dashbord;

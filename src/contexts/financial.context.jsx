import { createContext, useContext, useEffect, useState } from "react";
import FinancialServices from "../Services/financial.service";
import { useUser } from "@clerk/nextjs";

export const FinancialRecordContext = createContext();

export const FinancialRecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();
  const fetchRecords = async () => {
    if (!user) return;
    try {
      const response = await FinancialServices.getAllFinancialRecordsByUserId(
        user.id
      );
      if (response.status === 200) {
        setRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const AddRecord = async (record) => {
    try {
      // เพิ่ม userId เข้าไปในข้อมูล record
      const recordWithUserId = { ...record, userId: user.id };

      const response = await FinancialServices.createFinancialRecord(
        recordWithUserId
      );

      if (response.status === 200) {
        setRecords((prev) => [...prev, response.data]); // append new record to previous records
      }

      return response; // ส่ง response กลับไปให้หน้าบ้าน
    } catch (error) {
      // Log the error details
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }

      throw error; // โยนข้อผิดพลาดกลับไปให้หน้าบ้านจัดการ
    }
  };

  const updateRecord = async (id, newRecord) => {
    try {
      const response = await FinancialServices.updateFinancialRecord(
        id,
        newRecord
      );
      if (response.status === 200) {
        setRecords((prev) =>
          prev.map((record) => (record.id === id ? newRecord : record))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await FinancialServices.deleteFinancialRecord(id);
      if (response.status === 200 || response.status === 204) {
        setRecords((prev) => prev.filter((record) => record.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, AddRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => useContext(FinancialRecordContext);

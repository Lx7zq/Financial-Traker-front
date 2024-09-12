import api from "./api";
const FINANCIAL_API_URL = import.meta.env.VITE_FINANCIAL_API_URL;
console.log(FINANCIAL_API_URL);

//get all financial record
const getAllFinancialRecords = async () => {
  return await api.get(`${FINANCIAL_API_URL}`);
};
//get all financial record by userId
const getAllFinancialRecordsByUserId = async (userId) => {
  return await api.get(`${FINANCIAL_API_URL}/user/${userId}`);
};

//get financial record by id
const getFinancialRecordsById = async (id) => {
  return await api.get(`${FINANCIAL_API_URL}/${id}`);
};

//create a new record
const createFinancialRecord = async (record) => {
  return await api.post(`${FINANCIAL_API_URL}`, record);
};

//update a record
const updateFinancialRecord = async (id, record) => {
  return await api.put(`${FINANCIAL_API_URL}/${id}`, record);
};

//delete a record
const deleteFinancialRecord = async (id) => {
  return await api.delete(`${FINANCIAL_API_URL}/${id}`);
};

const FinancialServices = {
  getAllFinancialRecords,
  getAllFinancialRecordsByUserId,
  getFinancialRecordsById,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
};

export default FinancialServices;

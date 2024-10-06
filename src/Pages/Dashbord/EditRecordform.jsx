import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFinancialRecords } from "../../contexts/financial.context";

const EditRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { records, updateRecord } = useFinancialRecords();

  if (!records || !updateRecord) {
    console.error(
      "Financial records or updateRecord function is not available"
    );
    return <div>Loading...</div>;
  }

  const [record, setRecord] = useState(null);

  useEffect(() => {
    if (id && records.length > 0) {
      const foundRecord = records.find((record) => record.Id === parseInt(id));
      if (foundRecord) {
        setRecord(foundRecord);
      } else {
        console.error("Record not found");
      }
    }
  }, [id, records]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecord = {
      ...record,
      amount: parseFloat(record.amount), // Ensure 'amount' is sent as a decimal
      date: new Date(record.date).toISOString(), // Ensure date is formatted correctly
    };

    try {
      await updateRecord(record.Id, updatedRecord);
      navigate("/");
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Edit Financial Record
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category of Entry */}
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="category"
            value={record.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={record.date.slice(0, 10)}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            value={record.description}
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            value={record.amount}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={record.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-group mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecord;

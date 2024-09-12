import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { useFinancialRecords } from "../../contexts/financial.context"; // นำเข้าคอนเท็กซ์

const EditRecord = () => {
  const { id } = useParams();
  const { fetchRecords, updateRecord } = useFinancialRecords(); // รับฟังก์ชันจาก Context
  const [financial, setFinancial] = useState({
    category: "",
    date: "",
    description: "",
    amount: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const response = await fetchRecords(id); // เรียกใช้ฟังก์ชันจาก Context
        if (response.status === 200) {
          setFinancial(response.data);
        } else {
          throw new Error("Failed to fetch record");
        }
      } catch (error) {
        console.error("Error fetching record:", error);
        Swal.fire({
          icon: "error",
          title: "Fetch Failed",
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [id, fetchRecords]); // เพิ่ม `fetchRecord` ใน dependencies
  //test

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancial({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRecord(id, financial); // เรียกใช้ฟังก์ชันจาก Context
      if (response.status === 200) {
        Swal.fire({
          title: "Record Updated",
          text: response.data.message || "Record updated successfully",
          icon: "success",
        });
        navigate("/");
      } else {
        throw new Error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating record:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Edit Financial Record
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="category"
            value={financial.category || ""}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={financial.date || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            value={financial.description || ""}
            onChange={handleChange}
          />
        </div>

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
            value={financial.amount || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={financial.paymentMethod || ""}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

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

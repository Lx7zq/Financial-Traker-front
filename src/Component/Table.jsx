import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../contexts/financial.context"; // นำเข้า context

function Table() {
  const navigate = useNavigate(); // ใช้สำหรับการนำทาง
  const { user } = useUser(); // ดึงข้อมูลของผู้ใช้ที่ล็อกอิน
  const { records, fetchRecords, deleteRecord } = useFinancialRecords(); // ใช้ context

  useEffect(() => {
    if (user) {
      fetchRecords(); // เรียกใช้ฟังก์ชัน fetchRecords จาก context
    }
  }, [user, fetchRecords]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือ?",
      text: "คุณจะไม่สามารถกู้คืนสิ่งนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบมัน!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRecord(id); // เรียกใช้ฟังก์ชัน deleteRecord จาก context
        Swal.fire("ลบแล้ว!", "เรคคอร์ดของคุณถูกลบแล้ว.", "success");
      } catch (error) {
        console.error("ข้อผิดพลาด:", error);
        Swal.fire(
          "ล้มเหลว!",
          `ไม่สามารถลบเรคคอร์ดได้. ${error.message}`,
          "error"
        );
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // นำทางไปยังหน้าที่แก้ไข
  };

  return (
    <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "#",
              "Category",
              "Date",
              "Description",
              "Amount",
              "Payment Method",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record, index) => (
            <tr key={record.Id || index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.paymentMethod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleEdit(record.Id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.Id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

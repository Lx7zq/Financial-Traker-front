import React, { useState } from "react";
import AddRecord from "./AddRecrodform"; // แก้ไขชื่อไฟล์เป็น AddRecordForm

const AddButton = () => {
  // State to manage form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Button to open/close the form */}
      <button
        onClick={toggleForm}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        Add Record
      </button>

      {/* Conditionally render the form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <AddRecord />
            {/* Button to close the form */}
            <button
              onClick={toggleForm}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;

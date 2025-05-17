// import { useState } from "react";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";
import { useNavigate } from "react-router-dom";

import {
  addBudget,
  deleteBudget,
  updateBudget,
} from "@/services/BudgetService";
import { getAllCategory } from "@/services/CategoryService";
import { CircleX } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import MoneyInput from "../ui/MoneyInput";

export default function BudgetForm({ onClose, onSuccess, initialBudget }) {
  const { userId } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(
    initialBudget || {
      userId: userId,
      categoryId: "",
      budgetName: "",
      amountLimit: "",
      startDate: "",
      endDate: "",
      status: "1",
    }
  );

  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const res = await getAllCategory(userId);
      if (res) {
       
        const expense = res.filter(
          (item) => item.categoryType === "expense"
        );
        setCategory(expense);
      }
    };
    fetch();
  }, [userId]);

  const handleChangeBudget = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };
  const handleCategoryChange = (e) => {
    const selectedCategory = category.find(
      (item) => item.id === Number(e.target.value)
    );

    setBudget({
      ...budget,
      categoryId: e.target.value,
      budgetName: selectedCategory ? selectedCategory.categoryName : "",
    });
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (budget.id) {
        response = await updateBudget(budget.id, budget);
      } else {
        response = await addBudget(budget);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn xóa ngân sách  này không")) return;
    try {
      const response = await deleteBudget(budget.id);
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      navigate("/budget");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0   flex items-center justify-center bg-gray-900 bg-opacity-50  z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-200 relative border border-purple-600">
        {/* Thông tin chung */}

        <div className="">
          <div className="flex gap-2 ">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Chọn danh mục</label>
              <select
                className="w-full p-2 border rounded-md"
                value={budget.categoryId}
                onChange={handleCategoryChange}
              >
                <option>danh mục</option>
                {category.length > 0 ? (
                  category.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.categoryName}
                    </option>
                  ))
                ) : (
                  <option value="">Không có danh mục</option>
                )}
              </select>
            </div>
            <div className="flex-1">
              <MoneyInput
                name="amountLimit"
                value={budget.amountLimit}
                onChange={handleChangeBudget}
              />
            </div>
          </div>
        </div>
        {/* ngày */}
        <div className="">
          <div className="flex gap-2 ">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Ngày bắt đầu</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                name="startDate"
                value={budget.startDate}
                onChange={handleChangeBudget}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Ngày kết thúc</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                name="endDate"
                value={budget.endDate}
                onChange={handleChangeBudget}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Lưu
          </button>
          {budget.id && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Xóa ngân sách
            </button>
          )}

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>
      </div>
    </div>
  );
}

BudgetForm.propTypes = {
  initialBudget: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

import ICONS from "../Icons";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import { getAllCategory } from "@/services/CategoryService";
import { CircleX } from "lucide-react";
import PropTypes from "prop-types";
import { addCategory, deleteCategory, updateCategory } from "@/services/CategoryService";


export default function CategoryForm({ onClose, onSuccess, initialCategory }) {
  const { userId } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(
    initialCategory || {
      userId: userId,
      categoryName: "",
      categoryType: "expense",
      description: "",
      icon: "",
    }
  );
  
  const [selectedIcon, setSelectedIcon] = useState("");
  const handleChangeCategory = (e) => {
    setCategories({
      ...categories,
      [e.target.name]: e.target.value,
    });
  };
  const handleIconClick = (iconName) => {
    setCategories({
      ...categories,
      icon:iconName
    })
    setSelectedIcon(iconName);
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (categories.id) {
        response = await updateCategory(categories.id,userId, categories);
      } else {
        response = await addCategory(categories);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn xóa danh mục  này không")) return;
    try {
      const response = await deleteCategory(categories.id,userId);
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      navigate("/catalog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0   flex items-center justify-center bg-gray-900 bg-opacity-50  z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-200 relative border border-purple-600">
        <div className="">
          <h1 className="font-semibold">Thêm danh mục</h1>

          <div className="flex gap-2 mt-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Tên danh mục</label>
              <input
                className="w-full p-2 border rounded-md"
                name="categoryName"
                value={categories.categoryName}
                onChange={handleChangeCategory}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Chọn danh mục</label>
              <select
                className="w-full p-2 border rounded-md"
                name="categoryType"
                value={categories.categoryType}
                onChange={handleChangeCategory}
              >
                <option value="expense">Chi tiêu</option>
                <option value="income">Thu nhập</option>
              </select>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex gap-2 ">
          <div className="flex-1 mb-4 w-[50px]">
        <label className="text-sm text-gray-600">Chọn Icon</label>
        {/* Container cho các icon */}
        <div className="overflow-y-auto py-2 max-h-[300px]">
          <div className="grid grid-cols-5 gap-4">
            {Object.keys(ICONS).map((iconName) => (
              <div
                key={iconName}
                className={`flex items-center  justify-center  cursor-pointer rounded 
                  ${selectedIcon === iconName ? "border-2 border-green-700" : ""}`}
                onClick={() => handleIconClick(iconName)}
              >
               {ICONS[iconName].icon}
              </div>
            ))}
          </div>
        </div>
        {selectedIcon && (
          <div className="mt-4 flex space-x-2">
            <p className="text-sm text-gray-600">Đã chọn: {selectedIcon}</p>
            <div className="flex items-center justify-center">
              {ICONS[selectedIcon].icon}
            </div>
          </div>
        )}
      </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Mô tả</label>
              <textarea
                type="text"
                rows="5"
                className="w-full p-2 border rounded-md"
                name="description"
                value={categories.description}
                onChange={handleChangeCategory}
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
          {categories.id && (
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

CategoryForm.propTypes = {
  initialCategory: PropTypes.object,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

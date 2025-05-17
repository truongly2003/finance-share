import { useEffect, useState } from "react";
import { deleteCategory, getAllCategory } from "@/services/CategoryService";
import ICONS from "../Icons";
import { PlusCircle, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import AddCategory from "../CategoryForm";
function CategorySelector({ onSelectCategory, selectedCategoryId }) {
  const [activeTab, setActiveTab] = useState("income");
  const [categories, setCategories] = useState([]);
  const [isModalAddCategory, setIsModalAddCategory] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  console.log(categories);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getAllCategory();
    setCategories(response.data);
  };

  const handleRightClick = (e, category) => {
    e.preventDefault();
    const menuWidth = 150;
    const menuHeight = 50;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > screenWidth) x -= menuWidth;
    if (y + menuHeight > screenHeight) y -= menuHeight;

    setContextMenu({ x, y, category });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenu &&
        !event.target.closest(".context-menu") &&
        !event.target.closest(".delete-category-button")
      ) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const handleDeleteCategory = async () => {
    if (!contextMenu?.category) return;

    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa "${contextMenu.category.categoryName}"?`
      )
    ) {
      await deleteCategory(contextMenu.category.id);
      fetchCategories();
      setContextMenu(null);
    }
  };
  useEffect(() => {
    if (selectedCategoryId && categories.length > 0) {
      const selectedCategory = categories.find(
        (c) => c.id === selectedCategoryId
      );
      if (selectedCategory) {
        setActiveTab(selectedCategory.categoryType);
      }
    }
  }, [selectedCategoryId, categories]);

  const handleSelectCategory = (item) => {
    onSelectCategory && onSelectCategory(item);
  };

  return (
    <div className="">
      {/* tabs */}
      <div className="flex rounded-sm p-2 border-black-500 border mt-2">
        {["expense", "income", "transfer"].map((type) => {
          return (
            <button
              key={type}
              className={`flex-1 p-2 text-center font-semibold ${
                activeTab === type
                  ? "bg-black text-white rounded-lg"
                  : "text-black"
              }`}
              onClick={() => setActiveTab(type)}
            >
              {type === "expense"
                ? "Chi tiêu"
                : type === "income"
                ? "Thu nhập"
                : "Chuyển khoản"}
            </button>
          );
        })}
      </div>

      {/* categories */}
      <div className="overflow-x-auto w-full h-[200px]">
        <div className="flex flex-wrap gap-4 p-4">
          {categories
            .filter((item) => item.categoryType === activeTab)
            .map((item, index) => {
              const iconData = ICONS[item.icon] || {
                icon: "?",
                color: "bg-gray-400",
              };
              const isSelected = selectedCategoryId === item.id;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center w-20 cursor-pointer transition-all `}
                  onClick={() => handleSelectCategory(item)}
                  onContextMenu={(e) => handleRightClick(e, item)}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                      isSelected ? "bg-green-600 text-white" : "bg-gray-200"
                    } `}
                  >
                    {iconData.icon}
                  </div>
                  <p className="text-xs text-center mt-1">
                    {item.categoryName}
                  </p>
                </div>
              );
            })}
          <div
            className="flex flex-col items-center  w-20 cursor-pointer transition-all"
            onClick={() => setIsModalAddCategory(true)}
          >
            <div className="w-14 h-14 rounded-full flex bg-orange-400 items-center justify-center text-2xl">
              <PlusCircle />
            </div>
            <p className="text-xs text-center mt-1">Thêm</p>
          </div>
        </div>
      </div>
      {/* Hiển thị menu xóa khi click chuột phải */}
      {contextMenu && (
        <div
          className="absolute bg-white shadow-md rounded p-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="flex items-center text-red-600 p-2 hover:bg-gray-200 rounded w-full delete-category-button"
            onClick={handleDeleteCategory}
          >
            <Trash2 className="mr-2" /> xóa danh mục
          </button>
        </div>
      )}
      {isModalAddCategory && (
        <AddCategory
          onClose={() => setIsModalAddCategory(false)}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
}

CategorySelector.propTypes = {
  onSelectCategory: PropTypes.func,
  selectedCategoryId: PropTypes.number,
};

export default CategorySelector;

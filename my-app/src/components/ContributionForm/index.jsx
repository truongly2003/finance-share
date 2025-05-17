import { useState } from "react";
import { CircleX } from "lucide-react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  addContribute,
  deleteContribute,
  updateContribute,
} from "@/services/Goal-Contribute";
import MoneyInput from "../ui/MoneyInput";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";
import useWallet from "@/context/useWallet";
import useBalance from "@/context/useBalance"
const ContributionForm = ({ onClose, onSuccess, initialContribute }) => {
  const { refreshBalance } = useBalance();
  const {  fetchWallets } = useWallet();
  // walletId
  const {userId}=useAuth()
  const { notify}=useNotification()
  const { id } = useParams();
  const [contribute, setContribute] = useState(
    initialContribute || {
      goalId: id,
      userId: userId,
      amount: "",
      contributionDate: new Date().toISOString().split("T")[0],
      description: "",
    }
  );
  const handChangeContribute = (e) => {
    setContribute({
      ...contribute,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      let response;
      if (contribute.id) {
        response = await updateContribute(contribute.id, contribute);
      } else {
        response = await addContribute(contribute);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      fetchWallets();
      refreshBalance();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn xóa ngân sách  này không")) return;
    try {
      const response = await deleteContribute(contribute.id);
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      fetchWallets();
      refreshBalance();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50  z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[900px] relative border border-purple-600">
        {/* Thông tin chung */}
        <div className="">
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              {/* <label className="text-sm text-gray-600">Số tiền</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                name="amount"
                value={contribute.amount}
                onChange={handChangeContribute}
              /> */}
              <MoneyInput  name="amount"
                value={contribute.amount}
                onChange={handChangeContribute}/>
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Ngày</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                name="contributionDate"
                value={contribute.contributionDate}
                onChange={handChangeContribute}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <label className="text-sm text-gray-600 h-[100px]">
                Lưu ý (tùy chọn)
              </label>
              <textarea
                rows="5"
                className="w-full border rounded"
                placeholder="Nhập nội dung tại đây..."
                name="description"
                value={contribute.description}
                onChange={handChangeContribute}
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
          {contribute.id && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Xóa đóng góp
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
};
ContributionForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  initialContribute: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};
export default ContributionForm;

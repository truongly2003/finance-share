import { CircleX } from "lucide-react";

import useAuth from "@/context/useAuth";
import { useState } from "react";
import MoneyInput from "../ui/MoneyInput";
import PropTypes from "prop-types";
import {
  addWallet,
  deleteWallet,
  updateWallet,
} from "@/services/WalletService";
import useNotification from "@/context/useNotification";
import useBalance from "@/context/useBalance";
function WalletForm({ initialWallet, onClose, onSuccess }) {
  const { refreshBalance } = useBalance();
  const { userId } = useAuth();
  const { notify } = useNotification();
  const [wallet, setWallet] = useState(
    initialWallet || {
      userId: userId,
      walletName: "",
      walletType: "0",
      currency: "",
      balance: "",
    }
  );
  
  const handleChangeWallet = (e) => {
    setWallet({
      ...wallet,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCurrency = (e) => {
    setWallet({
      ...wallet,
      currency: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      let response;
      if (wallet.id) {
        response = await updateWallet(wallet.id, wallet);
      } else {
        response = await addWallet(wallet);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      refreshBalance();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn xóa ví này không")) return;
    try {
      const response = await deleteWallet(wallet.id);
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      refreshBalance();
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
              <MoneyInput
                name="balance"
                value={wallet.balance}
                onChange={handleChangeWallet}
              />
            </div>
          </div>
        </div>
        {/* ngày */}
        <div className="">
          <div className="flex gap-2 ">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Tên ví</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="walletName"
                value={wallet.walletName}
                onChange={handleChangeWallet}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Chọn đơn vị tiền</label>
              <select
                className="w-full p-2 border rounded-md"
                value={wallet.currency}
                onChange={handleChangeCurrency}
              >
                <option>Đơn vị tiền</option>
                <option>VND</option>
              </select>
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
          {wallet.id && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
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

WalletForm.propTypes = {
  initialWallet: PropTypes.object,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default WalletForm;

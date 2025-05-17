import { useState } from "react";

import PropTypes from "prop-types";
import useNotification from "@/context/useNotification";
import { transferWallet } from "@/services/WalletService";
import MoneyInput from "@/components/ui/MoneyInput";
function TransferForm({ fromWalletId, wallets, onClose, onSuccess }) {

  const [toWalletId, setToWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const { notify } = useNotification();
  const handleTransfer = async () => {
    if (!toWalletId || !amount) {
      notify("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    try {
      await transferWallet({
        fromWalletId: fromWalletId,
        toWalletId: toWalletId,
        amount: parseFloat(amount),
      });
      notify("Chuyển tiền thành công!", "success");
      onSuccess(); 
      onClose();
    } catch (err) {
      notify(err?.response?.data?.message || "Lỗi chuyển tiền", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Chuyển tiền</h2>

        <div className="mb-2">
          <label className="text-sm">Ví đích</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={toWalletId}
            onChange={(e) => setToWalletId(e.target.value)}
          >
            <option value="">-- Chọn ví đích --</option>
            {wallets
              .filter((w) => w.id !== fromWalletId)
              .map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.walletName}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-2">
         
          <MoneyInput
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleTransfer}
          >
            Chuyển
          </button>
        </div>
      </div>
    </div>
  );
}
TransferForm.propTypes = {
  fromWalletId: PropTypes.number.isRequired,
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      walletName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
export default TransferForm;

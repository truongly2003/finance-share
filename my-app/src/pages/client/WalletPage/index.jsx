import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useWallet from "@/context/useWallet";
import useBalance from "@/context/useBalance";
import WalletForm from "@/components/WalletForm";
import TransferForm from "./TransferForm";

function WalletPage() {
  const { wallets, setDefaultWallet, walletId, fetchWallets } = useWallet();
  const { balance } = useBalance();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showFormWallet, setShowFormWallet] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const handleSetDefaultWallet = (walletId) => {
    setDefaultWallet(walletId);
    setOpenMenuId(null);
  };
  const [transferWalletId, setTransferWalletId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="min-h-screen ">
      <div className="  mt-4">
        <div className="">
          {/* Tiêu đề và tổng số dư */}
          <div className="mb-6 ">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-purple-600">Total Balance</p>
              <div className="flex justify-between">
                <p className="text-3xl font-semibold">
                  {/* {balance.toLocaleString("vi-VN")} VND */}
                  {isVisible
                    ? `${balance.toLocaleString("vi-VN")} đ`
                    : "••••••••"}
                </p>
                <button onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? <Eye size={24} /> : <EyeOff size={24} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-purple-600">
              My Wallets
            </h2>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={() => {
                setShowFormWallet(true);
                setEditingWallet(null);
              }}
            >
              Create New Wallet
            </button>
          </div>
          {/* Danh sách ví */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="bg-white p-4 rounded-lg gap-3 border shadow hover:shadow-md transition-shadow relative flex items-center"
              >
                   <div className="bg-purple-300 p-2 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 7c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2H2V7zm0 4h20v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6zm14 2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2z" />
            </svg>
          </div>
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      walletId === wallet.id ? "text-purple-500" : "text-gray-300"
                    }`}
                  >
                    {wallet.walletName}
                    {walletId === wallet.id && (
                      <span className="ml-2 text-green-500 text-xs">
                        [Default]
                      </span>
                    )}
                  </p>
                  <p className="text-purple-500 text-xl">
                    {wallet.balance.toLocaleString("vi-VN")} {wallet.currency}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(wallet.id)}
                    className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
                  >
                    ⋮
                  </button>
                  {openMenuId === wallet.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSetDefaultWallet(wallet.id)}
                        disabled={walletId === wallet.id}
                      >
                        {walletId === wallet.id
                          ? "Đã là mặc định"
                          : "Đặt làm ví mặc định"}
                      </button>

                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setTransferWalletId(wallet.id);
                          setOpenMenuId(null);
                        }}
                      >
                        Chuyển tiền
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setEditingWallet(wallet);
                          setShowFormWallet(true);
                        }}
                      >
                        Chi tiết
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showFormWallet && (
        <WalletForm
          onClose={() => setShowFormWallet(false)}
          onSuccess={fetchWallets}
          initialWallet={editingWallet}
        />
      )}

      {transferWalletId && (
        <TransferForm
          fromWalletId={transferWalletId}
          wallets={wallets}
          onClose={() => setTransferWalletId(null)}
          onSuccess={fetchWallets}
        />
      )}
    </div>
  );
}

export default WalletPage;

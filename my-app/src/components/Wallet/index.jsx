import useWallet from "@/context/useWallet";
import { Link } from "react-router-dom";

function WalletCard() {
  const { wallets } = useWallet();
  return (
    <div className="">
    
      <div className="  rounded-xl">
        <div className="mb-3 flex justify-between content-center">
          <h2 className="text-black font-semibold text-lg ">My Wallet</h2>
          <Link to="/wallet" className="text-sm font-medium text-white">
            All wallet
          </Link>
        </div>
        <div className="border border-purple-400 rounded-xl flex items-center space-x-4 p-4">
          <div className="bg-purple-300 p-2 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 7c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2H2V7zm0 4h20v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6zm14 2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2z" />
            </svg>
          </div>
          <div>
            {wallets
              .filter((wallet) => wallet.walletType === "1")
              .map((wallet, index) => (
                <div key={index} className="">
                  <p className="text-black font-medium">{wallet.walletName}</p>
                  <p className="text-black  text-lg font-semibold">
                    {wallet.balance.toLocaleString("vi-VN")} {wallet.currency}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletCard;

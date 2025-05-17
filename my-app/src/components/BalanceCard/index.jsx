import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useBalance from "@/context/useBalance";

function BalanceCard() {
  const { balance } = useBalance();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex justify-between items-center p-4 border-2  bg-white rounded-lg max-w-sm">
      <div>
        <p className="text-gray-500 text-sm">Tổng số dư</p>
        <p className="text-blue-600 text-2xl font-bold">
          {isVisible ? `${balance.toLocaleString("vi-VN")} đ` : "••••••••"}
        </p>
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <Eye size={24} /> : <EyeOff size={24} />}
      </button>
    </div>
  );
}

export default BalanceCard;

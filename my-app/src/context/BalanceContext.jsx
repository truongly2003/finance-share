import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import useAuth from "./useAuth";
import { getBalance } from "@/services/Overview";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  
  const { userId } = useAuth();
  const [balance, setBalance] = useState(0);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const balanceResponse = await getBalance(userId);
      setBalance(balanceResponse.totalBalance || 0);
    } catch (error) {
      console.error("Lỗi khi lấy số dư:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BalanceContext.Provider value={{ balance, refreshBalance: fetchData }}>
      {children}
    </BalanceContext.Provider>
  );
};

BalanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BalanceContext;

import { useContext } from "react";
import BalanceContext from "./BalanceContext"
const useBalance=()=>{
    return useContext(BalanceContext)
}
export default useBalance;
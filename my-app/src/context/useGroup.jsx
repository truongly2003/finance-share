import { useContext } from "react";
import GroupContext from "./GroupContext";

const useGroup=()=>{
    return useContext(GroupContext)
}
export default useGroup
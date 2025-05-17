import { getGroupById } from "@/services/GroupService";
import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
const GroupContext = createContext();
export const GroupProvider = ({ children }) => {
  const url=window.location.pathname
  const parts=url.split("/")
  const id=parts[parts.length-1]
  
  const [group, setGroup] = useState({
    groupName: "",
    icon: "",
  });
  const fetCh = useCallback(async () => {
    try {
      const response = await getGroupById(id);
      if (response.data) {
        setGroup(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetCh();
  }, [fetCh]);
  return (
    <GroupContext.Provider value={{ group }}>
      {children}
    </GroupContext.Provider>
  );
};
export default GroupContext;

GroupProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

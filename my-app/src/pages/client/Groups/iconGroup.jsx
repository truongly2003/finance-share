import {
  FaUsers,
  FaUserFriends,
  FaUserPlus,
  FaHandshake,
  FaPeopleCarry,
  FaComments,
  FaFire,
  FaHeart,
  FaStar,
  FaTrophy,
  FaQuestion,
} from "react-icons/fa";

const iconMap = {
  FaUsers: FaUsers,
  FaUserFriends: FaUserFriends,
  FaUserPlus: FaUserPlus,
  FaHandshake: FaHandshake,
  FaPeopleCarry: FaPeopleCarry,
  FaComments: FaComments,
  FaFire: FaFire,
  FaHeart: FaHeart,
  FaStar: FaStar,
  FaTrophy: FaTrophy,
  Other:FaQuestion,
};

export const getIcon = (iconName) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className="text-4xl text-purple-500" /> : null;
};
export const iconList = Object.keys(iconMap);

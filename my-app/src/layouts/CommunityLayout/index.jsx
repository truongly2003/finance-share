import PropTypes from "prop-types";
import Header from "../DefaultLayout/Header";
import { NavLink } from "react-router-dom";
import { BarChart2, DollarSign, PieChart, Target, Users } from "lucide-react";

function CommunityLayout({ children }) {
  const navItems = [
    { to: "/community", label: "Post", Icon: BarChart2 },
    { to: "/my-profile", label: "My Profile", Icon: BarChart2 },
    { to: "/friend", label: "Friend", Icon: DollarSign },
    { to: "/message", label: "Message", Icon: PieChart },
    { to: "/save-post", label: "Saved Posts", Icon: Target },
    { to: "/create-post", label: "Create Post", Icon: Users },
  ];
  return (
    <div className="bg-gray-100 min-h-screen p=2 ">
      <div className="sticky top-0 z-20 bg-white ">
        <Header />
      </div>
      <div className="w-full p-4">
        <div className="fixed  w-52 border rounded-lg bg-white shadow text-black  p-4 ">
          <div className="">
            <nav className="min-h-screen">
              <ul className="">
                {navItems.map(({ to, label, Icon }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 rounded-lg mb-2 transition-colors duration-200 ${
                          isActive
                            ? "bg-purple-300 text-black"
                            : "hover:bg-purple-300 hover:text-black"
                        }`
                      }
                      end={to === "/overview"}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex-1 ml-52 ">{children}</div>
      </div>
    </div>
  );
}
CommunityLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CommunityLayout;

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  BarChart2,
  DollarSign,
  PieChart,
  Target,
  Settings2,
} from "lucide-react";
import Header from "../Header";
import WalletCard from "@/components/Wallet";

function TransactionLayout({ children }) {
  const navItems = [
    { to: "/finance/overview", label: "Tổng quan", Icon: BarChart2 },
    { to: "/finance", label: "Giao dịch", Icon: DollarSign },
    { to: "/finance/budget", label: "Ngân sách", Icon: PieChart },
    { to: "/finance/goal", label: "Mục tiêu", Icon: Target },
    // { to: "/groups", label: "Groups", Icon: Users },
    { to: "/finance/setting", label: "Cài đặt", Icon: Settings2 },
  ];

  return (
    <div className=" min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-20 flex items-center">
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4">
          <Header isShow={false} />
        </div>
      </header>
      {/* Sidebar - Fixed */}
     

      {/* Main Content */}
      <div className="flex pt-16 max-w-6xl mx-auto gap-6 px-4">
        {/* Header - Fixed */}
        <aside className="w-64 bg-white shadow-md overflow-y-auto px-4 py-4 h-fit sticky top-20">
          <div className="h-full py-6 px-4">
            {/* <div className="flex items-center space-x-3 mb-8">
              <NavLink
                to="/"
                className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-lg"
              >
                F
              </NavLink>
              <h1 className="text-xl font-semibold text-gray-800">
                Smart Spending
              </h1>
            </div> */}
            <div className="mb-6">
              <WalletCard />
            </div>

            <nav className="flex flex-col space-y-3">
              {navItems.map(({ to, label, Icon }) => (
                <NavLink
                  end
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg  transition-colors duration-200 ${
                      isActive
                        ? "text-primary-600 bg-blue-50"
                        : "hover:bg-purple-100 text-gray-700"
                    }`
                  }
                  // end={to === "/overview"}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-8 text-sm text-gray-500">
              © {new Date().getFullYear()} Smart Spending
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1  py-4">{children}</main>
      </div>
      
    </div>
  );
}

TransactionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionLayout;

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { BarChart2, DollarSign, PieChart, Target,Settings2 } from "lucide-react";
import Header from "../DefaultLayout/Header";
import WalletCard from "@/components/Wallet";

function TransactionLayout({ children }) {
  const navItems = [
    { to: "/overview", label: "Overview", Icon: BarChart2 },
    { to: "/transaction", label: "Transactions", Icon: DollarSign },
    { to: "/budget", label: "Budgets", Icon: PieChart },
    { to: "/goal", label: "Goals", Icon: Target },
    // { to: "/groups", label: "Groups", Icon: Users },
    { to: "/setting", label: "Setting", Icon: Settings2 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed */}
      <div className="fixed top-0 left-0 w-80 bg-white shadow text-black h-screen p-6 flex flex-col ">
        {/* <h2 className="text-2xl text-purple-500 font-bold mb-8">Smart Money</h2> */}
        <div className="mb-6">
          <WalletCard />
        </div>
        <nav className="min-h-screen">
          <ul>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-80">
        {/* Header - Fixed */}
        <div className="fixed top-0 left-[320px]  right-0 bg-white shadow-md z-10">
          <Header />
        </div>

        {/* Content Area */}
        <div className="min-h-screen">
        <div className="pt-16 bg-white flex-1 overflow-y-auto ">
          {children}
        </div>
        </div>
        
      </div>
    </div>
  );
}

TransactionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionLayout;
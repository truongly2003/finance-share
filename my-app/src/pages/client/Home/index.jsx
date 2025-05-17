import { Link } from "react-router-dom";
import {
  Wallet,
  CreditCard,
  PiggyBank,
  ChartBar,
  Bell,
  Lightbulb,
} from "lucide-react";
import bg from "@assets/bg_1.jpeg";
const Home = () => {
  return (
    <div className="bg-gray-100 text-[#333] min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-5 md:mt-12 min-h-[calc(100vh-170px)]">
        {/* Hero Content */}
        <div className="w-full md:w-1/2 md:mb-0 text-center md:text-left">
          <span className="inline-block bg-purple-500 text-white px-4 py-1 rounded-full text-sm mb-5">
          Smart Finance
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-purple-500">
          Manage Your Spending Smarter
          </h1>
          <p className="text-[#666] text-base mb-8 max-w-md mx-auto md:mx-0">
          Take control of your finances with our intuitive app to track expenses, set budgets, 
          and achieve your financial goals with ease.
          </p>
          <Link
            to="/login"
            className="inline-block bg-purple-500 text-white px-8 py-3 rounded-full text-base  "
          >
           Experience Now
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={bg}
            alt="Person managing finances"
            className="w-3/4 md:w-4/5 mx-auto md:ml-auto relative z-10"
          />

          {/* Decorative Elements */}
          <div className="hidden md:block absolute w-[300px] h-[300px] bg-purple-500 rounded-full -bottom-12 -left-12 z-[1]"></div>
          <div className="hidden md:block absolute w-[400px] h-[400px] bg-purple-500 rounded-full -top-24 -right-24 z-[1]"></div>

          {/* Card */}
          <div className="absolute md:top-1/2 md:-translate-y-1/2 md:left-0 w-[200px] bg-white p-5 rounded-xl shadow-lg z-[3] mt-5 md:mt-0 mx-auto md:mx-0">
            <div className="h-1 bg-[#f0f0f0] mb-2 rounded"></div>
            <div className="h-1 bg-[#f0f0f0] mb-2 rounded"></div>
            <div className="h-1 bg-[#f0f0f0] mb-2 rounded"></div>
            <div className="flex gap-2 mt-3">
              <div className="w-3 h-3 bg-[#a3d5e6] rounded-full"></div>
              <div className="w-3 h-3 bg-[#a3d5e6] rounded-full"></div>
              <div className="w-3 h-3 bg-[#a3d5e6] rounded-full"></div>
            </div>
          </div>

          <div className="hidden md:block absolute w-[100px] h-[100px] bg-[#f7d794] top-[20%] left-[20%] z-[2]"></div>
        </div>
      </section>
      {/* Why Manage Expenses Section */}
      <section className="max-w-6xl mx-auto p-5 py-12 ">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-purple-500">
            Why should you manage your expenses?
            </h2>
          </div>
          <Link
            to="/login"
            className="bg-purple-500 text-white px-6 py-2 rounded-full text-base  transition-colors hidden md:block"
          >
            Experience Now
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Hiểu rõ dòng tiền */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="text-[#1e90ff]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Understand cash flow</h3>
            <p className="text-[#666] text-sm">
            Know where your money goes, how much you spend every day.
            </p>
          </div>

          {/* Card 2: Tiết kiệm hiệu quả */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="text-[#1e90ff]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Effective savings</h3>
            <p className="text-[#666] text-sm">
            Cut unnecessary expenses and save for the future.
            </p>
          </div>

          {/* Card 3: Lập kế hoạch thông minh */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBar className="text-[#1e90ff]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
            Smart planning
            </h3>
            <p className="text-[#666] text-sm">
            Set financial goals and track them to achieve them. 
            </p>
          </div>

          {/* Card 4: Giảm căng thẳng */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-[#e6f0fa] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-[#1e90ff]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Reduce stress</h3>
            <p className="text-[#666] text-sm">
            Good financial management helps you feel more secure in life.
            </p>
          </div>
        </div>
      </section>
      {/* Solutions Section */}
      <section className="max-w-6xl mx-auto p-5 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl text-purple-500 md:text-4xl font-bold mt-2">
              Discovery and Solution
            </h2>
          </div>
          <Link
            to="/login"
            className="bg-purple-500 text-white px-6 py-2 rounded-full text-base  hidden md:block"
          >
            Experience
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Expense Tracking Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Spending</h3>
            <p className="text-[#666] mb-4">
            Record, categorize and track expenses
            </p>
            <Link
              to="/transaction"
              className="inline-block bg-[#e6f0fa] text-[#1e90ff] px-4 py-2 rounded-full text-sm hover:bg-[#d1e3fa] transition-colors"
            >
              Experience Now
            </Link>
          </div>

          {/* Savings Goals Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank />
            </div>
            <h3 className="text-xl font-semibold mb-2">Savings Goals</h3>
            <p className="text-[#666] mb-4">
              Create goals and track progress easily
            </p>
            <Link
              to="/goal"
              className="inline-block bg-[#e6f0fa] text-[#1e90ff] px-4 py-2 rounded-full text-sm hover:bg-[#d1e3fa] transition-colors"
            >
              Experience Now
            </Link>
          </div>

          {/* Budgeting Tools Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet />
            </div>
            <h3 className="text-xl font-semibold mb-2">Budgets</h3>
            <p className="text-[#666] mb-4">
              Set a budget, Track progerss and save
              
            </p>
            <Link
              to="/budget"
              className="inline-block bg-[#e6f0fa] text-[#1e90ff] px-4 py-2 rounded-full text-sm hover:bg-[#d1e3fa] transition-colors"
            >
             Experience Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

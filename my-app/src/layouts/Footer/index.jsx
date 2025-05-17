import { Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className=" bg-purple-200  py-8">
      {/* Phần thông tin liên hệ */}
      <div className="flex justify-around items-center  ">
        <div className="flex items-center space-x-3">
          <MapPin />
          <div>
            <p className="text-[#333]">Address</p>
            <p>2003 SGU</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone />
          <div>
            <p className="text-[#333]">Phone</p>
            <p>444-666-22222</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Mail />
          <div>
            <p className="text-[#333]"> Mail</p>
            <p>info@smart.com</p>
          </div>
        </div>
      </div>

      {/* Phần Menu và Dịch vụ */}
      <div className="flex justify-around py-8">
        {/* Menu */}
        <div>
          {" "}
          <h3 className="text-xl font-bold text-purple-600">
            Smart Spending Management
          </h3>
        </div>
        <div>
          <ul className="mt-2 flex flex-row space-x-4">
            <li>
              <Link href="#" className="">
                Abount
              </Link>
            </li>
            <li>
              <Link href="#" className="">
                Transaction
              </Link>
            </li>
            <li>
              <Link href="#" className="">
                Connect
              </Link>
            </li>
            <li>
              <Link href="#" className="">
                All
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Phần bản quyền và chính sách */}
      <div className="flex justify-between items-center border-t border-gray-700 pt-6 px-8">
        <p className="text-[#333]">
          L2003 Smart Spending Management. All rights reserved.
        </p>
        <div className="space-x-4">
          <a
            href="#"
            className="text-[#333] hover:text-[#f7d794] transition-colors"
          >
            Clause
          </a>
          <a
            href="#"
            className="text-[#333] hover:text-[#f7d794] transition-colors"
          >
            Usage policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

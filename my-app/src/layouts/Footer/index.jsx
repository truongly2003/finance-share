import { Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r bg-white text-gray-800 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        {/* Phần trên: Thông tin liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-300 pb-6">
          <div className="flex items-start space-x-3">
            <MapPin className="text-purple-600 w-6 h-6" />
            <div>
              <p className="font-semibold">Địa chỉ</p>
              <p>2003 SGU, TP. Hồ Chí Minh</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="text-purple-600 w-6 h-6" />
            <div>
              <p className="font-semibold">Số điện thoại</p>
              <p>+84 444 666 2222</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="text-purple-600 w-6 h-6" />
            <div>
              <p className="font-semibold">Email</p>
              <p>Truong@smart.com</p>
            </div>
          </div>
        </div>

        {/* Phần giữa: Logo và Menu */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-6 md:space-y-0">
          <h3 className="text-2xl font-bold text-purple-700">
            Quản lý chi tiêu thông minh
          </h3>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link
                to="#"
                className="hover:text-purple-600 transition-colors duration-200"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-purple-600 transition-colors duration-200"
              >
                Giao dịch
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-purple-600 transition-colors duration-200"
              >
                Kết nối
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-purple-600 transition-colors duration-200"
              >
                Tất cả
              </Link>
            </li>
          </ul>
        </div>

        {/* Phần dưới: Bản quyền và Chính sách */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-300 pt-4 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Smart Spending Management. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a
              href="#"
              className="hover:text-purple-600 transition-colors duration-200"
            >
              Điều khoản
            </a>
            <a
              href="#"
              className="hover:text-purple-600 transition-colors duration-200"
            >
              Chính sách sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

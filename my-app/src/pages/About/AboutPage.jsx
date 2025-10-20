import { useState } from "react";
import {
  Users,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Lightbulb,
  Heart,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(null);

  const missionCards = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Quản Lý Thông Minh",
      description:
        "Giúp bạn theo dõi thu chi một cách dễ dàng, trực quan với các công cụ thông minh và báo cáo chi tiết.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Chia Sẻ Minh Bạch",
      description:
        "Tạo điều kiện chia sẻ chi phí trong nhóm, gia đình một cách công bằng và minh bạch.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Phân Tích Sâu Sắc",
      description:
        "Cung cấp thống kê, biểu đồ chi tiết giúp bạn hiểu rõ thói quen chi tiêu và đưa ra quyết định tài chính đúng đắn.",
    },
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Đơn Giản",
      desc: "Giao diện thân thiện, dễ sử dụng cho mọi đối tượng",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Bảo Mật",
      desc: "Bảo vệ thông tin tài chính của bạn ở mức cao nhất",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Nhanh Chóng",
      desc: "Xử lý giao dịch và đồng bộ dữ liệu tức thì",
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Đổi Mới",
      desc: "Liên tục cải tiến và phát triển tính năng mới",
    },
  ];

  const stats = [
    { number: "50K+", label: "Người Dùng" },
    { number: "1M+", label: "Giao Dịch" },
    { number: "100K+", label: "Nhóm Chia Sẻ" },
    { number: "4.8★", label: "Đánh Giá" },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Về Chúng Tôi
          </h1>
          <p className="text-base opacity-95 max-w-3xl mx-auto">
            MoneyShare - Nền tảng quản lý tài chính thông minh, giúp bạn kiểm
            soát chi tiêu và đạt được mục tiêu tài chính của mình
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-[#666] text-base  max-w-3xl mx-auto">
              MoneyShare được sinh ra với sứ mệnh mang đến giải pháp quản lý tài
              chính dễ dàng, minh bạch và hiệu quả cho mọi người
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white mb-6">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-3xl p-12 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-5xl md:text-6xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg md:text-xl opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveValue(index)}
                onMouseLeave={() => setActiveValue(null)}
                className={`text-center p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                  activeValue === index
                    ? "bg-purple-50 shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}
              >
                <div
                  className={`inline-block mb-6 transition-colors duration-300 ${
                    activeValue === index ? "text-purple-600" : "text-gray-400"
                  }`}
                >
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Đội Ngũ Của Chúng Tôi
              </h2>
              <p className="text-base text-[#666] max-w-3xl mx-auto leading-relaxed">
                Một nhóm các chuyên gia đam mê công nghệ và tài chính, cam kết
                mang đến trải nghiệm tốt nhất cho người dùng. Chúng tôi làm việc
                không ngừng nghỉ để biến MoneyShare thành công cụ quản lý tài
                chính tốt nhất tại Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Bắt Đầu Hành Trình Tài Chính
            </h2>
            <p className="text-base text-[#666] mb-8">
              Tham gia cùng hàng nghìn người dùng đã tin tưởng MoneyShare
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-10 py-4 rounded-full text-base font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Đăng Ký Ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

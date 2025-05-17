import PropTypes from "prop-types";
import Header from "./Header";
// import Sidebar from "./SideBar";
import { AlignJustify } from "lucide-react";
import Footer from "../Footer";
function DefaultLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="sticky top-0 z-20 bg-white ">
        <Header icon={AlignJustify} />
      </div>
      <div className="w-full">
        <div className="">
          <div className="w-full">{children}</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;

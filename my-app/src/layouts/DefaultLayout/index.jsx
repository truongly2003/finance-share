import PropTypes from "prop-types";
import Header from "../Header";
// import Sidebar from "./SideBar";
import Footer from "../Footer";
function DefaultLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-20 flex items-center">
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4">
          <Header isShow={false} />
        </div>
      </header>
      <div className="  pt-16 max-w-6xl mx-auto gap-6 px-4">
        <div className="">
          <div className=" px-4 py-4">{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;

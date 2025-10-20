import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import Header from "../Header";
import Footer from "../Footer";

function CommunityLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-20 flex items-center">
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4">
          <Header isShow={false} />
        </div>
      </header>
      <div className="flex pt-16 max-w-6xl mx-auto gap-6 px-4">
        <aside className="w-64 bg-white  overflow-y-auto px-4 py-4 h-fit sticky top-20">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

CommunityLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommunityLayout;

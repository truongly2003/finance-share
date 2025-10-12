import PropTypes from "prop-types";
import Header from "./Header";

import Footer from "../Footer";

function CommunityLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen  ">
      <div className="sticky top-0 z-20 bg-white ">
        <Header />
      </div>

      <div className="w-full p-4">
        <div className="flex-1  ">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
CommunityLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CommunityLayout;

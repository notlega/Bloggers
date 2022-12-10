import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="2xl:mx-auto max-w-screen-2xl mx-6 bg-base-100">
    <Navbar />
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

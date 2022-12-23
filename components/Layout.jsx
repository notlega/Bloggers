import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="mx-6 mt-2 bg-base-100">
    <Navbar />
    <main className='mx-auto max-w-2xl mt-4'>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

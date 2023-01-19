import Link from 'next/link';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import { MdLogin, MdLogout } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import Container from './Container';

const propTypes = {
  children: PropTypes.node,
};

/**
 * Navbar is a component that displays the navbar at the top of the page
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Navbar = ({ children }) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const logOut = () => {
    const { error } = supabaseClient.auth.signOut();

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="drawer drawer-end drawer-mobile">
      <input type="checkbox" id="right-drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <Container>
          <nav className="navbar w-full sticky top-0">
            <div className="navbar py-2.5 space-x-2">
              <Link href="/" className="flex-1 self-center text-xl font-semibold whitespace-nowrap">
                Bloggers!
              </Link>
              <div className="hidden md:block input-group w-auto">
                <input type="text" className="input input-bordered w-64" placeholder="Search..." />
                <button className="btn btn-square">
                  <IoSearch className="w-fit h-fit" />
                </button>
              </div>
              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://placeimg.com/80/80/people" alt="temp_image" />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <button onClick={logOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex-none hidden md:inline-flex">
                  <Link href="/login" className="btn btn-ghost">
                    Login&nbsp;
                    <MdLogin />
                  </Link>
                </div>
              )}
              <label htmlFor="right-drawer" className="drawer-button btn btn-ghost md:hidden">
                <span className="sr-only">Open menu</span>
                <RxHamburgerMenu className="w-6 h-6" />
              </label>
            </div>
          </nav>
          {children}
        </Container>
      </div>
      <div className="drawer-side md:hidden">
        <label htmlFor="right-drawer" className="drawer-overlay" />
        <ul className="menu p-4 w-80 bg-base-100 md:hidden">
          <li>
            <div className="input-group gap-0">
              <input
                type="text"
                id="search-navbar"
                className="input input-bordered"
                placeholder="Search..."
              />
              <button className="btn btn-square">
                <IoSearch className="w-fit h-fit" />
              </button>
            </div>
          </li>
          <li>
            <Link
              href="/login"
              className="inline-flex flex-wrap items-center text-center text-md"
            >
              <MdLogin className="mt-0.5 w-fit h-5/6" />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = propTypes;

export default Navbar;

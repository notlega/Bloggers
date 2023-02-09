import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import { MdLogin, MdLogout } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import Container from '../components/Container';

const propTypes = {
  children: PropTypes.node,
};

/**
 * The default layout for the app
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  // TODO: get the profile picture from the database and not hardcode values
  const [profilePicture, setProfilePicture] = useState(
    'https://wzidvlwiavpggnktzbuk.supabase.co/storage/v1/object/public/avatar-image-bucket/default-profile-picture'
  );

  const logOut = () => {
    const { error } = supabaseClient.auth.signOut();

    if (error) {
      // TODO: handle the error and remove the console log
      console.log(error);
      return;
    }

    router.push('/');
  };

  return (
    <div className="drawer drawer-end drawer-mobile">
      <input type="checkbox" id="right-drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <Container>
          <nav className="navbar w-full sticky top-0 py-2.5 space-x-2 justify-between">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl normal-case">
                Bloggers!
              </Link>
            </div>
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
                    <img src={profilePicture} alt={profilePicture} />
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
          {user ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className="inline-flex flex-wrap items-center text-center text-md"
                >
                  <div className="object-cover">
                    <img
                      src={profilePicture}
                      alt="temp_image"
                      className="mt-0.5 w-8 h-8 rounded-full"
                    />
                  </div>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="inline-flex flex-wrap items-center text-center text-md"
                  onClick={logOut}
                >
                  <MdLogout className="mt-0.5 w-fit h-5/6" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="inline-flex flex-wrap items-center text-center text-md"
              >
                <MdLogin className="mt-0.5 w-fit h-5/6" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;

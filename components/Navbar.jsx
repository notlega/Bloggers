import Link from 'next/link';
import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import debounce from '../utils/debounce';

const Navbar = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [searchValue, setSearchValue] = useState('');

  const logOut = () => {
    const { error } = supabaseClient.auth.signOut();

    if (error) {
      console.log(error);
    }
  };

  const updateSearchValue = debounce((value) => {
    setSearchValue(value);
  }, 1000);

  const formHandler = () => {
    if (searchValue) {
      window.location.href = `/search/${searchValue}`;
    }

    setSearchValue('');
  };

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      formHandler();
    }
  };

  return (
    <nav className="navbar bg-base-100 space-x-2">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          The EDGE
        </Link>
      </div>
      <div className="flex-none gap-4">
        <label htmlFor="search-modal" className="btn btn-ghost rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3/4 w-3/4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </label>

        <input type="checkbox" id="search-modal" className="modal-toggle" />
        <label htmlFor="search-modal" className="modal">
          <label className="modal-box relative" htmlFor="">
            <div className="form-control">
              <div className="input-group justify-center">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered"
                  onKeyDown={keyDownHandler}
                  onChange={(event) => updateSearchValue(event.target.value)}
                />
                <button className="btn btn-square" onClick={formHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </label>
        </label>
      </div>
      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" alt='temp_image' />
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
        <div className="flex-none">
          <Link href="/login">
            <div className="btn btn-ghost">Login</div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

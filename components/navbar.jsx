import Link from 'next/link';
import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';

const Navbar = () => {
  const user = useUser();
  const [searchValue, setSearchValue] = React.useState('');

  const formHandler = () => {
    if (searchValue) {
      window.location.href = `/search/${searchValue}`;
    }

    setSearchValue('');
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      formHandler();
    }
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          The EDGE
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search blogs"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={keyDownHandler}
              className="input input-bordered"
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
      </div>
      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
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
              <Link href="/logout">Logout</Link>
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

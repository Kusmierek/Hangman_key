import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../store';
import { loggedIn, loginType, loggedOut } from '../slices/logginSlice';

const Navbar = () => {
  const loginState = useSelector<StateType, loginType>(
    (state) => state.persistedReducer.login
  );

  const dispatch = useDispatch();
  return (
    <nav className="bg-purple-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="" className="flex items-center">
          <img
            src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/955/original/hangman.png"
            className="h-6 mr-3 sm:h-9"
            alt="hang-man logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            HangMan
          </span>
        </a>
        {loginState.isLogged ? (
          <div className="flex md:order-2 space-x-3">
            <Link to="/" className="nav-el">
              <button
                type="button"
                className="nav-button "
                onClick={() => {
                  dispatch(loggedOut());
                }}
              >
                Logout
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </button>
          </div>
        ) : (
          <div className="flex md:order-2 space-x-3">
            <Link to="/sign-up" className="nav-el">
              <button type="button" className="nav-button ">
                Sign Up
              </button>
            </Link>
            <Link to="/login" className="nav-el">
              <button type="button" className="nav-button ">
                Login
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </button>
          </div>
        )}

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <Link to="/" className="nav-el">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="nav-el">
                Play
              </Link>
            </li>
            <li>
              <a href="#" className="nav-el">
                Top Scorers
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

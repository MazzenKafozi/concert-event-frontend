import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";


interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isActive = (path: string) => location.pathname === path;

  const baseClasses = transparent
    ? "fixed w-full z-50 transition-all duration-300"
    : "bg-venue-900 shadow-lg";

  const navClasses = "text-white";

  return (
    <header
      className={`${baseClasses} ${menuOpen ? "bg-venue-900" : transparent ? "bg-transparent" : "bg-venue-900"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3 text-venue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-white">Concert Ticket Vista</h1>
                <p className="text-sm text-venue-200 hidden md:block">
                  Unforgettable live experiences
                </p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className={`flex items-center space-x-8 ${navClasses}`}>
              <li>
                <Link
                  to="/"
                  className={`hover:text-venue-200 transition ${
                    isActive("/") ? "text-venue-200 font-semibold" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className={`hover:text-venue-200 transition ${
                    isActive("/events") ? "text-venue-200 font-semibold" : ""
                  }`}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/venues"
                  className={`hover:text-venue-200 transition ${
                    isActive("/venues") ? "text-venue-200 font-semibold" : ""
                  }`}
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className={`hover:text-venue-200 transition ${
                    isActive("/booking") ? "text-venue-200 font-semibold" : ""
                  }`}
                >
                  Book Tickets
                </Link>
              </li>
              {user ? (
                <>
                  <li className="text-venue-200 font-semibold">
                    Logged in as {user.fullName}
                  </li>
                  <li>
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-black"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/signup" className="text-white hover:text-venue-200">
<li>
  <div className="flex items-center space-x-4">
    <Link to="/login" className="text-white hover:text-venue-200 transition">
      Login
    </Link>
    <Link to="/signup" className="text-white hover:text-venue-200 transition">
      Sign Up
    </Link>
  </div>
</li>


                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4 text-white">
              <li>
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </li>
              <li>
                <Link to="/events" onClick={toggleMenu}>Events</Link>
              </li>
              <li>
                <Link to="/venues" onClick={toggleMenu}>Venues</Link>
              </li>
              <li>
                <Link to="/booking" onClick={toggleMenu}>Book Tickets</Link>
              </li>
              {user ? (
                <>
                  <li className="text-venue-200 font-semibold">
                    Logged in as {user.fullName}
                  </li>
                  <li>
                    <Button
                      onClick={() => { toggleMenu(); logout(); }}
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-black"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/signup" onClick={toggleMenu}>Login / Sign Up</Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

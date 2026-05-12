import { useState } from 'react';

const navLinks = ['Home', 'Contact', 'About', 'Sign Up'];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [query, setQuery] = useState('');

  return (
    <header>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-sm text-center py-2.5 px-4">
        Summer Sale For All Fresh Products &amp; Free Express Delivery — OFF 20%!{' '}
        <a href="#" className="font-bold underline ml-1 hover:text-green-400 transition-colors">
          Shop Now
        </a>
      </div>

      {/* Main Navbar */}
      <nav className="flex items-center gap-8 px-10 py-4 border-b border-gray-200 bg-white">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-900 whitespace-nowrap min-w-[150px]">
          DailyFresh 🥦
        </div>

        {/* Links */}
        <ul className="flex gap-7 list-none m-0 p-0 flex-1">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={() => setActive(link)}
                className={`text-sm text-gray-700 no-underline pb-0.5 border-b-2 transition-colors hover:border-gray-800 hover:text-gray-900 ${
                  active === link ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 gap-2">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-48 placeholder-gray-400"
          />
          <button aria-label="Search" className="text-gray-500 hover:text-gray-800 transition-colors text-base">
            🔍
          </button>
        </div>

        {/* Icons */}
        <div className="flex gap-4">
          <button aria-label="Wishlist" className="text-xl text-gray-600 hover:text-red-500 transition-colors bg-transparent border-none">
            ♡
          </button>
          <button aria-label="Cart" className="text-xl text-gray-600 hover:text-green-600 transition-colors bg-transparent border-none">
            🛒
          </button>
        </div>
      </nav>
    </header>
  );
}

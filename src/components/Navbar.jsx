import { useState } from 'react';import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const navKeys = [
  { key: 'home',    tKey: 'home',    to: '/' },
  { key: 'contact', tKey: 'contact', to: '/contact' },
  { key: 'about',   tKey: 'about',   to: '/about' },
  { key: 'signUp',  tKey: 'signUp',  to: '/signup' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs sm:text-sm py-2.5 px-4 sm:px-10 flex items-center justify-between gap-2">
        <div className="flex-1 text-center leading-snug">
          <span className="hidden sm:inline">{t('announcement')}{' '}</span>
          <span className="sm:hidden">Sale — OFF 20%!{' '}</span>
          <a href="#" className="font-bold underline ml-1 hover:text-green-400 transition-colors whitespace-nowrap">
            {t('shopNow')}
          </a>
        </div>
        <LanguageSelector />
      </div>

      {/* Main Navbar */}
      <nav className="flex items-center gap-4 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 border-b border-gray-200 bg-white">
        {/* Logo */}
        <div className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap flex-shrink-0">
        Exclusive
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0 flex-1">
          {navKeys.map(({ key, tKey, to }) => {
            const isActive = location.pathname === to;
            return (
              <li key={key}>
                <Link
                  to={to}
                  className={`text-sm no-underline pb-0.5 border-b-2 transition-colors hover:border-gray-800 hover:text-gray-900 ${
                    isActive ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent text-gray-700'
                  }`}
                >
                  {t(tKey)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded px-3 py-2 gap-2">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-44 placeholder-gray-400"
          />
          <button aria-label="Search" className="text-gray-500 hover:text-gray-800 text-base bg-transparent border-none cursor-pointer">
            🔍
          </button>
        </div>

        {/* Mobile Search Toggle */}
        <button
          aria-label="Search"
          onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden text-xl text-gray-600 bg-transparent border-none cursor-pointer"
        >
          🔍
        </button>

        {/* Icons */}
        <div className="flex gap-3">
          <button aria-label="Wishlist" className="text-xl text-gray-600 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer">♡</button>
          <button aria-label="Cart" className="text-xl text-gray-600 hover:text-green-600 transition-colors bg-transparent border-none cursor-pointer">🛒</button>
        </div>

        {/* Hamburger */}
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
        >
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="lg:hidden px-4 py-2 border-b border-gray-200 bg-white">
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 gap-2">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="bg-transparent border-none outline-none text-sm text-gray-700 flex-1 placeholder-gray-400"
            />
            <button onClick={() => setSearchOpen(false)} className="text-gray-400 bg-transparent border-none cursor-pointer text-lg">✕</button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {navKeys.map(({ key, tKey, to }) => {
              const isActive = location.pathname === to;
              return (
                <li key={key}>
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2.5 px-2 text-sm no-underline rounded transition-colors ${
                      isActive ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t(tKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

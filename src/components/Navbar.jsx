import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../context/AuthContext';
import useAdmin from '../hooks/useAdmin';

const navLinks = [
  { key: 'home',    tKey: 'home',    to: '/' },
  { key: 'contact', tKey: 'contact', to: '/contact' },
  { key: 'about',   tKey: 'about',   to: '/about' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery]         = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const dropRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropOpen(false);
    navigate('/');
  };

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
        <Link to="/" className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap flex-shrink-0 no-underline">
          DailyFresh 🥦
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0 flex-1">
          {navLinks.map(({ key, tKey, to }) => {
            const isActive = location.pathname === to;
            return (
              <li key={key}>
                <Link to={to}
                  className={`text-sm no-underline pb-0.5 border-b-2 transition-colors hover:border-gray-800 hover:text-gray-900 ${
                    isActive ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent text-gray-700'
                  }`}>
                  {t(tKey)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex-1 md:hidden" />

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded px-3 py-2 gap-2">
          <input type="text" placeholder={t('searchPlaceholder')} value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-44 placeholder-gray-400"
          />
          <button aria-label="Search" className="text-gray-500 hover:text-gray-800 text-base bg-transparent border-none cursor-pointer">🔍</button>
        </div>

        {/* Mobile Search Toggle */}
        <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden text-xl text-gray-600 bg-transparent border-none cursor-pointer">🔍</button>

        {/* Wishlist + Cart */}
        <div className="flex gap-3">
          <button aria-label="Wishlist" className="text-xl text-gray-600 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer">♡</button>
          <button aria-label="Cart" className="text-xl text-gray-600 hover:text-green-600 transition-colors bg-transparent border-none cursor-pointer">🛒</button>
        </div>

        {/* Auth — logged in: avatar dropdown | logged out: login/signup links */}
        {user ? (
          <div className="relative hidden md:block" ref={dropRef}>
            <button onClick={() => setDropOpen(!dropOpen)}
              className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-semibold">
                  {(user.displayName || user.email || '?')[0].toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-700 max-w-[100px] truncate hidden lg:block">
                {user.displayName || user.email}
              </span>
              <span className={`text-xs text-gray-400 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {dropOpen && (
              <div className="absolute right-0 top-11 bg-white border border-gray-100 rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-900 truncate">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                {(isAdmin || !adminLoading) && user && (
                  <Link to="/admin" onClick={() => setDropOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 no-underline transition-colors border-b border-gray-100">
                    <span>📊</span> Dashboard
                  </Link>
                )}
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors bg-transparent border-none cursor-pointer">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"
              className="text-sm text-gray-700 no-underline hover:text-gray-900 transition-colors">
              {t('logIn')}
            </Link>
            <Link to="/signup"
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors no-underline">
              {t('signUp')}
            </Link>
          </div>
        )}

        {/* Hamburger */}
        <button aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1">
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="lg:hidden px-4 py-2 border-b border-gray-200 bg-white">
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 gap-2">
            <input type="text" placeholder={t('searchPlaceholder')} value={query}
              onChange={(e) => setQuery(e.target.value)} autoFocus
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
            {navLinks.map(({ key, tKey, to }) => {
              const isActive = location.pathname === to;
              return (
                <li key={key}>
                  <Link to={to} onClick={() => setMenuOpen(false)}
                    className={`block py-2.5 px-2 text-sm no-underline rounded transition-colors ${
                      isActive ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                    {t(tKey)}
                  </Link>
                </li>
              );
            })}
            {user ? (
              <li>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}
                    className="block py-2.5 px-2 text-sm text-gray-700 no-underline hover:bg-gray-50 rounded font-medium">
                    📊 Dashboard
                  </Link>
                )}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="w-full text-left py-2.5 px-2 text-sm text-red-500 bg-transparent border-none cursor-pointer">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-sm text-gray-700 no-underline hover:bg-gray-50 rounded">{t('logIn')}</Link></li>
                <li><Link to="/signup" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-sm text-red-500 font-medium no-underline hover:bg-gray-50 rounded">{t('signUp')}</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 — Brand + Subscribe */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-1">DailyFresh 🥦</h2>
            <p className="text-sm font-semibold text-white mt-5 mb-1">{t('subscribe')}</p>
            <p className="text-xs text-gray-400 mb-4">{t('subscribeDesc')}</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex items-center border border-gray-600 rounded overflow-hidden"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none min-w-0"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-transparent border-none text-white px-3 py-2.5 hover:text-gray-300 transition-colors cursor-pointer flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

          {/* Col 2 — Support */}
          <div>
            <h3 className="text-sm font-semibold mb-5 pb-2 border-b border-gray-700">{t('support')}</h3>
            <address className="not-italic text-xs text-gray-400 leading-relaxed space-y-3">
              <p>111 Bijoy Sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
              <p>
                <a href="mailto:dailyfresh@gmail.com" className="hover:text-white transition-colors no-underline text-gray-400">
                  dailyfresh@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+8801588889999" className="hover:text-white transition-colors no-underline text-gray-400">
                  +88015-88888-9999
                </a>
              </p>
            </address>
          </div>

          {/* Col 3 — Account */}
          <div>
            <h3 className="text-sm font-semibold mb-5 pb-2 border-b border-gray-700">{t('account')}</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {['myAccount', 'loginRegister', 'cart', 'wishlist', 'shop'].map((key) => (
                <li key={key}>
                  <a href="#" className="text-xs text-gray-400 no-underline hover:text-white transition-colors">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Quick Link */}
          <div>
            <h3 className="text-sm font-semibold mb-5 pb-2 border-b border-gray-700">{t('quickLink')}</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {['privacyPolicy', 'termsOfUse', 'faq', 'contact'].map((key) => (
                <li key={key}>
                  <a href="#" className="text-xs text-gray-400 no-underline hover:text-white transition-colors">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Download App */}
          <div>
            <h3 className="text-sm font-semibold mb-5 pb-2 border-b border-gray-700">{t('downloadApp')}</h3>
            <p className="text-xs text-gray-400 mb-4">{t('appSaveText')}</p>

            <div className="flex flex-col gap-3 mb-6">
              {/* Google Play */}
              <a href="#" className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2 hover:border-gray-400 transition-colors no-underline w-fit">
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none">
                  <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5c-.5.33-1.5.33-1.5-.5z" fill="#4CAF50"/>
                  <path d="M3 3.5L13.5 14 3 20.5V3.5z" fill="#81C784"/>
                  <path d="M13.5 14L17.5 12 3 20.5 13.5 14z" fill="#F44336"/>
                  <path d="M3 3.5L13.5 14 17.5 10 3 3.5z" fill="#FFEB3B"/>
                </svg>
                <div>
                  <p className="text-[9px] text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-xs text-white font-medium leading-tight">Google Play</p>
                </div>
              </a>

              {/* App Store */}
              <a href="#" className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2 hover:border-gray-400 transition-colors no-underline w-fit">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[9px] text-gray-400 leading-none">Download on the</p>
                  <p className="text-xs text-white font-medium leading-tight">App Store</p>
                </div>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition-colors no-underline"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center">
        <p className="text-xs text-gray-500">{t('copyright')}</p>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ emailPhone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.emailPhone.trim()) e.emailPhone = t('emailRequired');
    if (!form.password)          e.password   = t('passwordRequired');
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    // TODO: connect to backend
    alert('Logged in!');
  };

  const set = (field) => (ev) => {
    setForm({ ...form, [field]: ev.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-stretch shadow-lg rounded-2xl overflow-hidden">

        {/* Left — Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85"
            alt="Login"
            className="w-full h-full object-cover"
            style={{ minHeight: '520px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-transparent" />
        </div>

        {/* Right — Form */}
        <div className="w-full md:w-1/2 px-8 sm:px-12 py-14 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            {t('loginTitle')}
          </h1>
          <p className="text-sm text-gray-500 mb-8">{t('enterDetails')}</p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

            {/* Email / Phone */}
            <div>
              <input
                type="text"
                placeholder={t('emailPhonePlaceholder')}
                value={form.emailPhone}
                onChange={set('emailPhone')}
                className={`w-full border-b pb-2 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 transition-colors focus:border-gray-800 ${
                  errors.emailPhone ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.emailPhone && <p className="text-xs text-red-500 mt-1">{errors.emailPhone}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder={t('passwordPlaceholder')}
                  value={form.password}
                  onChange={set('password')}
                  className={`w-full border-b pb-2 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 transition-colors focus:border-gray-800 pr-8 ${
                    errors.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Submit + Forgot */}
            <div className="flex items-center gap-4 mt-1">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-medium px-10 py-3 rounded transition-colors duration-200"
              >
                {t('loginBtn')}
              </button>
              <a href="#" className="text-sm text-red-500 hover:text-red-600 transition-colors no-underline whitespace-nowrap">
                {t('forgotPassword')}
              </a>
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3 rounded transition-colors duration-200 bg-white cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {t('loginWithGoogle')}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {t('dontHaveAccount')}{' '}
            <Link to="/signup" className="text-gray-900 font-medium underline hover:text-red-500 transition-colors">
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

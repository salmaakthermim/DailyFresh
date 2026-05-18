import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

export default function Login() {
  const { t } = useTranslation();
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [firebaseErr, setFirebaseErr] = useState('');
  const [resetSent, setResetSent]     = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email    = t('emailRequired');
    if (!form.password)     e.password = t('passwordRequired');
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setFirebaseErr('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setFirebaseErr(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setFirebaseErr('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setFirebaseErr(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!form.email.trim()) {
      setErrors({ email: t('emailRequired') });
      return;
    }
    setLoading(true);
    try {
      await resetPassword(form.email);
      setResetSent(true);
      setFirebaseErr('');
    } catch (err) {
      setFirebaseErr(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{t('loginTitle')}</h1>
          <p className="text-sm text-gray-500 mb-8">{t('enterDetails')}</p>

          {/* Firebase error */}
          {firebaseErr && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {firebaseErr}
            </div>
          )}

          {/* Reset password success */}
          {resetSent && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
              Password reset email sent! Check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <input type="email" placeholder={t('emailPhonePlaceholder')} value={form.email} onChange={set('email')}
                className={`w-full border-b pb-2 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 transition-colors focus:border-gray-800 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder={t('passwordPlaceholder')} value={form.password} onChange={set('password')}
                  className={`w-full border-b pb-2 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 transition-colors focus:border-gray-800 pr-8 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
                  aria-label={showPass ? 'Hide password' : 'Show password'}>
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Submit + Forgot */}
            <div className="flex items-center gap-4 mt-1">
              <button type="submit" disabled={loading}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:opacity-60 text-white text-sm font-medium px-10 py-3 rounded transition-colors duration-200 cursor-pointer flex items-center gap-2">
                {loading
                  ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : t('loginBtn')}
              </button>
              <button type="button" onClick={handleForgot} disabled={loading}
                className="text-sm text-red-500 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap disabled:opacity-60">
                {t('forgotPassword')}
              </button>
            </div>

            {/* Google */}
            <button type="button" onClick={handleGoogle} disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 disabled:opacity-60 text-gray-700 text-sm font-medium py-3 rounded transition-colors duration-200 bg-white cursor-pointer">
              <GoogleIcon />
              {t('loginWithGoogle')}
            </button>
          </form>

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

function friendlyError(code) {
  const map = {
    'auth/email-already-in-use':   'This email is already registered.',
    'auth/invalid-email':          'Invalid email address.',
    'auth/weak-password':          'Password is too weak.',
    'auth/user-not-found':         'No account found with this email.',
    'auth/wrong-password':         'Incorrect password.',
    'auth/invalid-credential':     'Incorrect email or password.',
    'auth/too-many-requests':      'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user':   'Google sign-in was cancelled.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-20">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative shadow-2xl">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/30 rounded-full mix-blend-screen filter blur-[80px] z-0 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[80px] z-0 -translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 px-6 py-16 sm:py-24 sm:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Join Our Newsletter
            </h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto lg:mx-0">
              Get the latest updates on new arrivals, exclusive discounts, and special offers delivered straight to your inbox.
            </p>
            
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
               <div className="flex -space-x-4">
                 {[1,2,3,4].map(idx => (
                    <img key={idx} className="w-10 h-10 rounded-full border-2 border-gray-900 z-10 relative object-cover" src={`https://i.pravatar.cc/150?img=${idx + 20}`} alt={`User ${idx}`} />
                 ))}
               </div>
               <span className="text-sm font-medium text-gray-300">Join 10,000+ subscribers</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-1/2 w-full max-w-md bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20">
            {subscribed ? (
              <div className="text-center py-6 text-green-400 animate-pulse">
                 <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <h3 className="text-xl font-bold">Thank you for subscribing!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg shadow-red-500/30"
                >
                  Subscribe Now
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

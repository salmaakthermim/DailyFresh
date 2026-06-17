export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Verified Buyer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      content: 'Absolutely thrilled with my purchase! The quality exceeded my expectations and the delivery was incredibly fast. Highly recommended.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      avatar: 'https://i.pravatar.cc/150?img=11',
      rating: 5,
      content: 'The attention to detail in the packaging and the product itself is phenomenal. Best customer service I have experienced in a while.'
    },
    {
      id: 3,
      name: 'Emma Watson',
      role: 'Fashion Blogger',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
      content: 'Beautiful aesthetic and premium feel. It matches perfectly with my daily setup. Will definitely be coming back for more!'
    }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Loved by Thousands
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={review.id} 
              className="bg-gray-50 rounded-3xl p-8 relative hover:-translate-y-2 transition-transform duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-gray-200">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <svg key={index} className={`w-5 h-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed italic">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

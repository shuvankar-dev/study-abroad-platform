
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Sharma',
    degree: 'Masters in Germany',
    text: 'Codescholar Overseas made my study abroad dream come true. The team was supportive at every step!',
    rating: 4.5,
    avatar: 'https://ui-avatars.com/api/?name=Arjun+Sharma&background=4F46E5&color=fff'
  },
  {
    id: 2,
    name: 'Priya Patel',
    degree: 'Bachelors in Canada',
    text: 'The guidance for my visa and accommodation was excellent. Highly recommend their services!',
    rating: 4.0,
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=059669&color=fff'
  },
  {
    id: 3,
    name: 'Rahul Verma',
    degree: 'MBA in UK',
    text: 'Thanks to Codescholar Overseas, I got admission to my dream university. The process was smooth and stress-free.',
    rating: 4.5,
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=DC2626&color=fff'
  },
  {
    id: 4,
    name: 'Sneha Das',
    degree: 'Masters in Data Science',
    text: 'Professional guidance and excellent support throughout my journey. Very satisfied with their service.',
    rating: 3.5,
    avatar: 'https://ui-avatars.com/api/?name=Sneha+Das&background=7C3AED&color=fff'
  },
  {
    id: 5,
    name: 'Vikash Kumar',
    degree: 'Engineering in Australia',
    text: 'From application to visa approval, everything was handled perfectly. Great team and amazing results!',
    rating: 4.0,
    avatar: 'https://ui-avatars.com/api/?name=Vikash+Kumar&background=EA580C&color=fff'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
      </div>
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    );
  }

  return (
    <div className="flex items-center mb-3">
      {stars}
      <span className="ml-2 text-sm text-gray-600">{rating}</span>
    </div>
  );
};

export default function SuccessStories() {
  const [isPaused, setIsPaused] = useState(false);

  // Create seamless infinite loop by duplicating testimonials multiple times
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with colorful gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-blue-100 via-purple-100 to-pink-100 opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-600 mb-2">Hundreds of students trust Codescholar Overseas</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our happy clients say about us
          </h2>
          <p className="text-gray-500 text-lg">Real stories from students who achieved their dreams</p>
        </div>

        {/* Continuous Scrolling Testimonials */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className={`flex gap-6 ${isPaused ? '' : 'animate-scroll'}`}
              style={{
                width: `${infiniteTestimonials.length * 400}px`,
                animation: isPaused ? 'none' : 'scroll 60s linear infinite'
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-96"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <StarRating rating={testimonial.rating} />
                    
                    <blockquote className="text-gray-700 text-base leading-relaxed mb-6 min-h-[80px]">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.degree}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for continuous scroll animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${testimonials.length * 400}px);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </section>
  );
}

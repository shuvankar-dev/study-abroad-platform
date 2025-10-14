
import { useState } from 'react';

// Import testimonial images using Vite import URLs
const testimonialImages = [
  new URL('../assets/Testimonial/S1.png', import.meta.url).href,
  new URL('../assets/Testimonial/S2.png', import.meta.url).href,
  new URL('../assets/Testimonial/S3.png', import.meta.url).href,
  new URL('../assets/Testimonial/S4.png', import.meta.url).href,
  new URL('../assets/Testimonial/S5.png', import.meta.url).href,
  new URL('../assets/Testimonial/S6.png', import.meta.url).href,
  new URL('../assets/Testimonial/S7.png', import.meta.url).href,
  new URL('../assets/Testimonial/S8.png', import.meta.url).href,
  new URL('../assets/Testimonial/S9.png', import.meta.url).href,
  new URL('../assets/Testimonial/S10.png', import.meta.url).href,
];

const TESTIMONIALS = [
  {
    name: 'Vaibhavee Modi',
    college: 'Confederation College, Canada',
    text: 'Choosing Codescholar was a game changer when I decided to study abroad. The staff and my counselor were super friendly and every step became seamless.'
  },
  {
    name: 'Bhumika',
    college: 'University of Adelaide, Australia',
    text: 'Codescholar managed my entire journey to Australia, from university selection to visa and flights! I highly recommend them for anyone wanting to study abroad.'
  },
  {
    name: 'Amit Sharma',
    college: 'TU Munich, Germany',
    text: 'The guidance for my SOP and visa interview was spot on. I felt supported at every step.'
  },
  {
    name: 'Priya S.',
    college: 'University of Toronto, Canada',
    text: 'I got help with scholarships and accommodation. The process was smooth and stress-free.'
  },
  {
    name: 'Rahul Verma',
    college: 'University of Melbourne, Australia',
    text: 'From test prep to pre-departure, Codescholar made my dream possible.'
  },
  {
    name: 'Sneha Patel',
    college: 'University of Glasgow, UK',
    text: 'The team was always available and answered all my questions. Highly recommended!'
  },
  {
    name: 'Arjun Singh',
    college: 'ETH Zurich, Switzerland',
    text: 'Visa, accommodation, and even airport pickup—everything was taken care of.'
  },
  {
    name: 'Manoj Joshi',
    college: 'National University of Singapore',
    text: 'I was nervous about moving abroad, but Codescholar made it easy.'
  },
  {
    name: 'Siddharth Rao',
    college: 'University of Auckland, New Zealand',
    text: 'Great support for my application and settling in.'
  },
  {
    name: 'Anjali Menon',
    college: 'Harvard University, USA',
    text: 'Personalized counseling and expert advice at every step.'
  }
];

export default function SuccessStories() {
  const [idx, setIdx] = useState(0);
  const perView = 2;
  const maxIdx = Math.max(0, TESTIMONIALS.length - perView);

  const goPrev = () => setIdx(i => Math.max(0, i - 1));
  const goNext = () => setIdx(i => Math.min(maxIdx, i + 1));

  return (
    <section className="w-full bg-[#cfdceb] py-16 px-2 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center">
              Success Stories
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={goPrev} disabled={idx === 0} className={`rounded-lg px-4 py-2 bg-white text-blue-900 shadow transition disabled:opacity-50`}>
              <span className="sr-only">Previous</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={goNext} disabled={idx === maxIdx} className={`rounded-lg px-4 py-2 bg-blue-700 text-white shadow transition disabled:opacity-50`}>
              <span className="sr-only">Next</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        <div className="flex gap-8 overflow-x-hidden">
          {TESTIMONIALS.slice(idx, idx + perView).map((t, i) => {
            // Calculate the global index for the image
            const globalIdx = idx + i;
            const imgSrc = testimonialImages[globalIdx] || testimonialImages[0];
            return (
              <div key={i} className="flex-1 bg-gradient-to-br from-white to-[#f6fafd] rounded-3xl shadow-lg flex flex-col md:flex-row items-stretch overflow-hidden min-h-[320px]">
                {/* Testimonial image */}
                <div className="w-full md:w-64 h-64 md:h-auto flex-shrink-0 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={t.name + ' testimonial'}
                    className="w-full h-full object-cover object-center"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center p-8">
                  <p className="text-lg md:text-2xl text-gray-800 mb-6">{t.text}</p>
                  <div className="flex items-center gap-4">
                    {/* Avatar image (small circle, same as main image) */}
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={t.name + ' avatar'}
                        className="w-full h-full object-cover object-center"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-600">{t.college}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

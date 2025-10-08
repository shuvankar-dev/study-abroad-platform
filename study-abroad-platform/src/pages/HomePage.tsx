

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import UserBubble from '../components/UserBubble';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-1">
    <HeroSection />
    <StatsSection />
        {/* Main content section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent">
                Why Study Abroad?
              </h2>
              <p className="text-lg text-gray-700 mb-7 border-l-4 border-blue-500 pl-4 bg-blue-50/60 rounded-r-lg shadow-sm">
                Unlock global opportunities, experience new cultures, and gain a world-class education. <span className="text-blue-700 font-semibold">Our platform connects you to top universities and expert guidance every step of the way.</span>
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center text-gray-800 text-base md:text-lg font-medium">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Personalized course & country matching
                </li>
                <li className="flex items-center text-gray-800 text-base md:text-lg font-medium">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Application & visa support
                </li>
                <li className="flex items-center text-gray-800 text-base md:text-lg font-medium">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Scholarship & funding advice
                </li>
                <li className="flex items-center text-gray-800 text-base md:text-lg font-medium">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Student community & events
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-hidden flex items-center justify-center border-4 border-white">
                <img src="/whyUs.png" alt="Study Abroad" className="w-full h-full object-cover scale-105 transition-transform duration-500 hover:scale-110" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <UserBubble />
      <Footer />
    </div>
  );
};

export default HomePage;

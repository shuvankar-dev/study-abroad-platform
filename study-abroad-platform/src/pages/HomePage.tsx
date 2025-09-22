

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-1">
    <HeroSection />
    <StatsSection />
        {/* Main content section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Study Abroad?</h2>
              <p className="text-lg text-gray-700 mb-6">Unlock global opportunities, experience new cultures, and gain a world-class education. Our platform connects you to top universities and expert guidance every step of the way.</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><span className="mr-2 text-blue-600">✔</span>Personalized course & country matching</li>
                <li className="flex items-center"><span className="mr-2 text-blue-600">✔</span>Application & visa support</li>
                <li className="flex items-center"><span className="mr-2 text-blue-600">✔</span>Scholarship & funding advice</li>
                <li className="flex items-center"><span className="mr-2 text-blue-600">✔</span>Student community & events</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-2xl shadow-2xl bg-white/60 overflow-hidden flex items-center justify-center">
                <img src="/whyUs.png" alt="Study Abroad" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

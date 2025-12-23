import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ConsultationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🎉 Thank You!
            </h1>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Consultation Request Submitted Successfully!
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Your free consultation request has been received by our expert team at CodeScholar Overseas.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  📞 What happens next?
                </h3>
                <ul className="text-left text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Our certified study abroad counselors will contact you within 12-24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We'll discuss your goals and academic background in detail
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You'll receive a personalized roadmap for your study abroad journey
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Get guidance on universities, courses, and scholarship opportunities
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium text-sm">
                  ✓ Free Consultation ✓ Expert Guidance ✓ 98% Visa Success Rate
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <HomeIcon className="w-5 h-5" />
                Back to Home
              </Link>
              
              <Link
                to="/about"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all inline-flex items-center justify-center gap-2"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Learn More About Us
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Keep an eye on your phone and email. Your dream of studying abroad starts here! 🌟
              </p>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Need immediate assistance?</h4>
                <p className="text-gray-600 text-sm">
                  You can also explore our services, read success stories, or check out destination guides while you wait for our call.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <Link to="/services" className="text-blue-600 hover:underline text-sm">Our Services</Link>
                  <Link to="/explore" className="text-blue-600 hover:underline text-sm">Explore Destinations</Link>
                  <Link to="/about" className="text-blue-600 hover:underline text-sm">Success Stories</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultationSuccess;
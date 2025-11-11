import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, ArrowRightIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Helmet } from 'react-helmet-async';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cities } from '../data/cities';

const ConsultantsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Study Abroad Consultants in India | Codescholar Overseas</title>
        <meta name="description" content="Find the best study abroad consultants in your city. Codescholar Overseas has offices across major Indian cities providing expert international education guidance." />
        <meta name="keywords" content="study abroad consultants India, overseas education consultants, international education consultancy, study abroad agencies India" />
        <link rel="canonical" href="https://codescholaroverseas.com/consultants" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Study Abroad Consultants Across India
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Find expert study abroad consultants in your city. We provide personalized guidance 
              for international education with offices and services across major Indian cities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href="tel:+918777841275"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                Call +91 87778 41275
              </a>
              <a
                href="mailto:info.codescholaroverseas@gmail.com"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all inline-flex items-center justify-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your City
              </h2>
              <p className="text-lg text-gray-600">
                Select your city to get localized study abroad consulting services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/consultants/${city.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-sm text-gray-500">{city.state}</p>
                    </div>
                    <MapPinIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {city.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Population:</span> {city.population}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Nearby Areas:</span> {city.nearbyAreas.slice(0, 3).join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-blue-600">
                      Study Abroad Consultants
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Study Abroad Services
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive support for your international education journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'University Selection',
                  description: 'Expert guidance on choosing the right university and program'
                },
                {
                  title: 'Application Support',
                  description: 'Complete assistance with university applications and documentation'
                },
                {
                  title: 'Visa Guidance',
                  description: 'Step-by-step visa application support with high success rate'
                },
                {
                  title: 'Test Preparation', 
                  description: 'IELTS, TOEFL, GRE, GMAT coaching and preparation'
                },
                {
                  title: 'Scholarship Assistance',
                  description: 'Help you find and apply for scholarships and financial aid'
                },
                {
                  title: 'Pre-departure Support',
                  description: 'Orientation and guidance before you travel abroad'
                },
                {
                  title: 'Accommodation Help',
                  description: 'Assistance in finding suitable accommodation near your university'
                },
                {
                  title: 'Career Counseling',
                  description: 'Professional guidance on career paths and opportunities'
                }
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not Sure Which City to Choose?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us directly and we'll connect you with the best consultant in your area!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+918777841275"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                Call Now: +91 87778 41275
              </a>
              <a
                href="mailto:info.codescholaroverseas@gmail.com"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Email Us
              </a>
            </div>

            <div className="mt-8 text-blue-100">
              <p>✓ Free Consultation ✓ Expert Guidance ✓ 10+ Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultantsPage;
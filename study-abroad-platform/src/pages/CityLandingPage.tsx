import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  AcademicCapIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOComponent from '../components/SEOComponent';
import RegistrationModal from '../components/RegistrationModal';
import { getCityBySlug } from '../data/cities';

const CityLandingPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to extract city name from SEO-friendly URLs
  const extractCityFromSlug = (slug: string): string => {
    // Handle SEO-friendly URLs like "best-study-abroad-in-kestopur"
    if (slug.includes('best-study-abroad-in-')) {
      return slug.replace('best-study-abroad-in-', '');
    }
    if (slug.includes('study-abroad-consultants-in-')) {
      return slug.replace('study-abroad-consultants-in-', '');
    }
    if (slug.includes('overseas-education-consultants-in-')) {
      return slug.replace('overseas-education-consultants-in-', '');
    }
    // Default: return the slug as is
    return slug;
  };

  // Extract actual city name from the slug
  const extractedCitySlug = citySlug ? extractCityFromSlug(citySlug) : null;
  
  // Try to get predefined city data using extracted city name
  let city = extractedCitySlug ? getCityBySlug(extractedCitySlug) : null;

  // If city not found in our predefined list, create a dynamic city object
  if (!city && extractedCitySlug) {
    // Convert slug to readable city name (e.g., "kestopur" -> "Kestopur")
    const cityName = extractedCitySlug.charAt(0).toUpperCase() + extractedCitySlug.slice(1).toLowerCase();
    
    // Create a fallback city object
    city = {
      name: cityName,
      slug: citySlug ?? extractedCitySlug, // Use original SEO-friendly slug if available, otherwise the extracted slug
      state: 'India', // Default state
      population: 'Growing urban area', // Default population description
      description: `${cityName} is an emerging area with growing educational opportunities and aspirations for international studies.`,
      coordinates: { lat: 22.5726, lng: 88.3639 }, // Default coordinates (Kolkata area)
      seoTitle: `Best Study Abroad Consultants in ${cityName} | Codescholar Overseas`,
      metaDescription: `Expert study abroad consultants in ${cityName}. Get personalized guidance for overseas education, university admissions, and visa processing. Contact us today!`,
      localKeywords: [
        `study abroad consultants ${cityName}`,
        `overseas education ${cityName}`,
        `international education consultants ${cityName}`,
        `study abroad guidance ${cityName}`,
        `university admission help ${cityName}`
      ],
      universities: [
        'Local Universities',
        'State Universities',
        'Private Institutions'
      ],
      popularCourses: [
        'Computer Science & IT',
        'Business Administration (MBA)',
        'Engineering',
        'Medicine & Healthcare',
        'Data Science & Analytics',
        'Digital Marketing'
      ],
      nearbyAreas: [
        cityName + ' Central',
        cityName + ' North',
        cityName + ' South',
        cityName + ' East',
        cityName + ' West'
      ],
      testimonials: [] // Empty for fallback cities
    };
  }

  // If still no city (shouldn't happen with fallback), show error
  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid URL</h1>
          <p className="text-gray-600 mb-4">Please check the URL and try again.</p>
          <Link to="/consultants" className="text-blue-600 hover:underline">
            View All Cities
          </Link>
        </div>
      </div>
    );
  }

  const handleConsultationClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOComponent city={city} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6" aria-label="Breadcrumb">
              <ol className="flex justify-center space-x-2 text-gray-500">
                <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                <li>/</li>
                <li><Link to="/consultants" className="hover:text-blue-600">Study Abroad Consultants</Link></li>
                <li>/</li>
                <li className="text-gray-900">{city.name}</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Best Study Abroad Consultants in <span className="text-blue-600">{city.name}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Get expert guidance from {city.name}'s leading study abroad consultants. 
              We help students from {city.name} secure admissions to top universities worldwide 
              with personalized counseling and comprehensive support.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={handleConsultationClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Free Consultation
              </button>
              <a
                href="tel:+918777841275"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                Call Now
              </a>
            </div>

            {/* Location Badge */}
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <MapPinIcon className="w-4 h-4 mr-2" />
              Serving {city.name} & nearby areas: {city.nearbyAreas.slice(0, 3).join(', ')}
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Students from {city.name} Choose Codescholar Overseas?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                As the trusted study abroad consultants in {city.name}, we have helped hundreds of students 
                achieve their international education dreams.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: AcademicCapIcon,
                  title: "Expert Counselors",
                  description: `Our experienced counselors in ${city.name} provide personalized guidance for course selection and university applications.`
                },
                {
                  icon: GlobeAltIcon,
                  title: "Global Network",
                  description: `Direct partnerships with 500+ universities across USA, UK, Canada, Australia, and more.`
                },
                {
                  icon: CheckCircleIcon,
                  title: "High Success Rate",
                  description: `95% visa approval rate and 100% admission success for eligible students from ${city.name}.`
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Courses for {city.name} Students
              </h2>
              <p className="text-lg text-gray-600">
                Most preferred programs chosen by students from {city.name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.popularCourses.map((course, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{course}</h3>
                  <p className="text-gray-600 mb-4">
                    Top universities worldwide offering {course} programs with excellent career prospects.
                  </p>
                  <button 
                    onClick={handleConsultationClick}
                    className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700"
                  >
                    Learn More <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Top Universities Preferred by {city.name} Students
              </h2>
              <p className="text-lg text-gray-600">
                Leading institutions where our students from {city.name} have gained admission
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Local Excellence in {city.name}</h3>
                <div className="space-y-4">
                  {city.universities.map((university, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <BuildingOffice2Icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{university}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">International Destinations</h3>
                <div className="space-y-4">
                  {[
                    'Harvard University, USA',
                    'University of Oxford, UK', 
                    'University of Toronto, Canada',
                    'University of Melbourne, Australia',
                    'Technical University of Munich, Germany'
                  ].map((university, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <GlobeAltIcon className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{university}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {city.testimonials && city.testimonials.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Success Stories from {city.name}
                </h2>
                <p className="text-lg text-gray-600">
                  Hear from students who achieved their dreams with our guidance
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {city.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.course}</p>
                      <p className="text-sm text-blue-600 font-medium">
                        {testimonial.university}, {testimonial.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Study Abroad Services in {city.name}
              </h2>
              <p className="text-xl text-blue-100">
                Comprehensive support from application to arrival
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'University Selection & Application',
                'Scholarship Guidance',
                'Visa Application Support',
                'IELTS/TOEFL Preparation',
                'Financial Planning',
                'Pre-departure Orientation',
                'Accommodation Assistance',
                'Post-arrival Support'
              ].map((service, index) => (
                <div key={index} className="bg-blue-700 p-4 rounded-lg text-center hover:bg-blue-800 transition-colors">
                  <CheckCircleIcon className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                  <p className="font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Areas We Serve in {city.name}
              </h2>
              <p className="text-lg text-gray-600">
                Our study abroad consultancy services are available across {city.name}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {city.nearbyAreas.map((area, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                  <MapPinIcon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="font-medium text-gray-800">{area}</p>
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
              Ready to Start Your Study Abroad Journey from {city.name}?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Book a free consultation with our expert counselors in {city.name} today!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleConsultationClick}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Book Free Consultation
              </button>
              <a
                href="tel:+918777841275"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                +91 87778 41275
              </a>
            </div>

            <div className="mt-8 text-blue-100">
              <p>✓ Free Consultation ✓ Expert Guidance ✓ 95% Visa Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source="other"
      />
    </div>
  );
};

export default CityLandingPage;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPinIcon,  
  AcademicCapIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOComponent from '../components/SEOComponent';
import { getCityBySlug } from '../data/cities';

interface FormData {
  name: string;
  email: string;
  phone: string;
  dreamCountry: string;
  preferredIntake: string;
  educationLevel: string;
  currentCity: string;
}

const CityLandingPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    dreamCountry: '',
    preferredIntake: '',
    educationLevel: '',
    currentCity: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // Auto-open form if navigated from TopBanner
  useEffect(() => {
    const openForm = searchParams.get('openForm');
    if (openForm === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const countries = [
    { name: 'USA', flag: '🇺🇸' },
    { name: 'UK', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Dubai/UAE', flag: '🇦🇪' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'Other', flag: '🌍' }
  ];

  const intakes = ['Jan 2026', 'Sep 2026', '2027 Intake'];
  const educationLevels = ['10th', '12th', "Bachelor's", "Master's", 'MBBS / MD', 'Diploma'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConsultationClick = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setSubmitSuccess(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      dreamCountry: '',
      preferredIntake: '',
      educationLevel: '',
      currentCity: ''
    });
    document.body.style.overflow = 'unset';
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const API_BASE = window.location.hostname === 'localhost'
      ? 'http://localhost/studyabroadplatform-api/api'
      : '/studyabroadplatform-api/api';

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dream_country: formData.dreamCountry,
        preferred_intake: formData.preferredIntake,
        education_level: formData.educationLevel,
        current_city: formData.currentCity
      };

      const response = await fetch(`${API_BASE}/journey/submit.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.status === 200 || response.status === 201) {
        closeModal();
        navigate('/consultation-success');
      } else {
        closeModal();
        navigate('/consultation-success');
      }
    } catch (error) {
      closeModal();
      navigate('/consultation-success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.dreamCountry && formData.preferredIntake;
      case 2:
        return formData.educationLevel && formData.currentCity;
      case 3:
        return formData.name && formData.email && formData.phone;
      default:
        return false;
    }
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



      <Footer />
      
      {/* Multi-step Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {!submitSuccess ? (
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <h2 className="text-2xl font-bold">Free Consultation</h2>
                  <p className="text-blue-100 text-sm">Step {currentStep} of 3</p>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-3 bg-gray-50">
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex-1">
                        <div className={`h-2 rounded-full ${
                          step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                  <div className="px-6 py-6">
                    {/* Step 1: Study Preferences */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Preferences</h3>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Dream Country *</label>
                          <div className="grid grid-cols-2 gap-2">
                            {countries.map((country) => (
                              <button
                                key={country.name}
                                type="button"
                                onClick={() => handleSelectChange('dreamCountry', country.name)}
                                className={`p-3 text-left border rounded-lg transition-all ${
                                  formData.dreamCountry === country.name
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <span className="mr-2">{country.flag}</span>
                                {country.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Intake *</label>
                          <div className="space-y-2">
                            {intakes.map((intake) => (
                              <button
                                key={intake}
                                type="button"
                                onClick={() => handleSelectChange('preferredIntake', intake)}
                                className={`w-full p-3 text-left border rounded-lg transition-all ${
                                  formData.preferredIntake === intake
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                {intake}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Education Background */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">Education Background</h3>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Current Education Level *</label>
                          <div className="grid grid-cols-2 gap-2">
                            {educationLevels.map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() => handleSelectChange('educationLevel', level)}
                                className={`p-3 text-left border rounded-lg transition-all ${
                                  formData.educationLevel === level
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current City *</label>
                          <input
                            type="text"
                            name="currentCity"
                            value={formData.currentCity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your current city"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact Information */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ml-auto ${
                          isStepValid()
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepValid() || isSubmitting}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ml-auto ${
                          isStepValid() && !isSubmitting
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="mb-6">
                  <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  🎉 Consultation Request Submitted!
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    Thank you for choosing CodeScholar!
                  </p>
                  <p className="text-gray-700 mb-3">
                    Your free consultation request has been successfully received.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-blue-800 font-medium">
                      📞 We will contact you within 12-24 hours
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Our certified study abroad counselors will reach out to discuss your goals and create a personalized plan for your journey.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Keep an eye on your phone and email. Your dream of studying abroad starts here! 🌟
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityLandingPage;
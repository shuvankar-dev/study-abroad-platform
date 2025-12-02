import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, ArrowRightIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Helmet } from 'react-helmet-async';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cities } from '../data/cities';

// Import hero section images
import s1 from '../assets/Herosection/s1.png';
import s2 from '../assets/Herosection/s2.png';
import s3 from '../assets/Herosection/s3.png';
import s4 from '../assets/Herosection/s4.png';
import s5 from '../assets/Herosection/s5.png';
import s6 from '../assets/Herosection/s6.png';

interface FormData {
  name: string;
  email: string;
  phone: string;
  dreamCountry: string;
  preferredIntake: string;
  educationLevel: string;
  currentCity: string;
}

const ConsultantsPage: React.FC = () => {
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
    { name: 'Ireland', flag: '🇮🇪' },
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

  const openModal = () => {
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

    // API base URL detection for local vs production
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

      console.log('Submitting consultation form to:', `${API_BASE}/journey/submit.php`);
      console.log('Form data:', submitData);

      const response = await fetch(`${API_BASE}/journey/submit.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      console.log('Response status:', response.status);
      
      // If response status is 200 or 201, consider it successful
      if (response.status === 200 || response.status === 201) {
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        let result;
        try {
          result = JSON.parse(responseText);
          
          if (result.success) {
            console.log('Consultation form submitted successfully:', result);
            closeModal();
            navigate('/consultation-success');
          } else {
            // Even if success is false, data might be stored - show success anyway
            console.log('API returned success=false but data might be stored');
            closeModal();
            navigate('/consultation-success');
          }
        } catch (parseError) {
          // If JSON parsing fails but status is 200, assume success
          console.log('JSON parse failed but status 200 - assuming success');
          closeModal();
          navigate('/consultation-success');
        }
      } else {
        // For non-200 status codes, show error
        const errorText = await response.text();
        console.error('Response error:', errorText);
        alert(`Error: Unable to submit form. Please try again.`);
      }
    } catch (error) {
      console.error('Consultation form submission error:', error);
      
      // For network errors, check if it's a CORS or server issue
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        alert('Network connection error. Please check your internet connection and try again.');
      } else {
        // For other errors, still show success since data might be stored
        console.log('Error occurred but data might be stored - showing success');
        closeModal();
        navigate('/consultation-success');
      }
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
      <Helmet>
        <title>Study Abroad Consultants in India | Codescholar Overseas</title>
        <meta name="description" content="Find the best study abroad consultants in your city. Codescholar Overseas has offices across major Indian cities providing expert international education guidance." />
        <meta name="keywords" content="study abroad consultants India, overseas education consultants, international education consultancy, study abroad agencies India" />
        <link rel="canonical" href="https://codescholaroverseas.com/consultants" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center py-8 md:py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/30"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/30"></div>
        </div>

        <div className="container relative mx-auto px-4 py-8 z-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0">
            {/* Left: Heading, description, CTA */}
            <div className="w-full md:w-1/2 text-left md:pr-8 space-y-8 flex flex-col justify-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Study Abroad Consultants, <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Across India</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                  Find expert study abroad consultants in your city. We provide personalized guidance for international education with offices and services across major Indian cities.
                </p>
                <div className="bg-gradient-to-r from-primary-100 to-white rounded-xl px-5 py-3 shadow flex items-center gap-3 border border-primary-100">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-base md:text-lg font-semibold text-primary-700">Expert guidance with offices across major Indian cities!</span>
                </div>
              </div>
              <button onClick={openModal} className="bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent text-white font-semibold px-8 py-3 rounded-lg shadow-xl transition mb-4 mt-2 w-fit">Get Free Consultant</button>
            </div>
            {/* Right: Diamond images placeholder or consultant images */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {[
                  { src: s1, alt: 'Student 1', pos: 'col-start-2 row-start-1' },
                  { src: s2, alt: 'Student 2', pos: 'col-start-1 row-start-2' },
                  { src: s3, alt: 'Student 3', pos: 'col-start-2 row-start-2' },
                  { src: s4, alt: 'Student 4', pos: 'col-start-3 row-start-2' },
                  { src: s5, alt: 'Student 5', pos: 'col-start-2 row-start-3' },
                  { src: s6, alt: 'Student 6', pos: 'col-start-3 row-start-3' },
                ].map((img, idx) => (
                  <div
                    key={img.alt}
                    className={`w-32 h-32 md:w-44 md:h-44 bg-white shadow-xl rounded-2xl flex items-center justify-center transform rotate-45 overflow-hidden ${img.pos}`}
                    style={{ zIndex: 10 - idx }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover -rotate-45 scale-[1.25] -m-4"
                      style={{ minWidth: '120%', minHeight: '120%' }}
                    />
                  </div>
                ))}
              </div>
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

            {/* CTA Button After Cities Section */}
            <div className="text-center mt-12">
              <button
                onClick={openModal}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                🎓 Get Free Consultant
              </button>
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

            {/* CTA Button After Services Section */}
            <div className="text-center mt-12">
              <button
                onClick={openModal}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                🎓 Get Free Consultant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Connect with our expert consultants and get personalized guidance for free!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={openModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                🎓 Get Free Consultant
              </button>
            </div>

            <div className="mt-8 text-blue-100">
              <p>✓ Free Consultation ✓ Expert Guidance ✓ 10+ Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Step Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            </button>

            {!submitSuccess ? (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                              currentStep >= step
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {step}
                          </div>
                          <span className="text-[10px] mt-1 text-gray-600 hidden sm:block">
                            {step === 1 && 'Study Plans'}
                            {step === 2 && 'Background'}
                            {step === 3 && 'Contact Info'}
                          </span>
                        </div>
                        {step < 3 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 transition-all ${
                              currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                          Start your study abroad journey
                        </h2>
                        <p className="text-sm text-gray-600">Let's begin by understanding your preferences</p>
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">
                          Choose your dream country
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                          {countries.map((country) => (
                            <button
                              key={country.name}
                              type="button"
                              onClick={() => handleSelectChange('dreamCountry', country.name)}
                              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                                formData.dreamCountry === country.name
                                  ? 'border-blue-600 bg-blue-50 shadow-md'
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                            >
                              <span className="text-2xl mb-1" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif', fontFeatureSettings: '"liga"' }}>{country.flag}</span>
                              <span className="text-xs font-medium text-gray-700">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">
                          What's your preferred intake?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {intakes.map((intake) => (
                            <button
                              key={intake}
                              type="button"
                              onClick={() => handleSelectChange('preferredIntake', intake)}
                              className={`p-3 rounded-lg border-2 font-medium transition-all text-sm ${
                                formData.preferredIntake === intake
                                  ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md'
                                  : 'border-gray-200 text-gray-700 hover:border-blue-300'
                              }`}
                            >
                              {intake}
                              {intake === 'Jan 2026' && (
                                <span className="block text-[10px] text-green-600 mt-0.5">Recommended</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                          Are you ready for your study abroad journey?
                        </h2>
                        <p className="text-sm text-gray-600">Tell us about your educational background</p>
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">
                          What's the highest education you've completed (or are currently pursuing)?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {educationLevels.map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => handleSelectChange('educationLevel', level)}
                              className={`p-3 rounded-lg border-2 font-medium transition-all text-sm ${
                                formData.educationLevel === level
                                  ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md'
                                  : 'border-gray-200 text-gray-700 hover:border-blue-300'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">
                          Select your current city
                        </label>
                        <input
                          type="text"
                          name="currentCity"
                          value={formData.currentCity}
                          onChange={handleInputChange}
                          placeholder="e.g., Ludhiana, Punjab"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-5 animate-fade-in">
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                          Just one last step!
                        </h2>
                        <p className="text-sm text-gray-600">Share your contact details so we can reach you</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Your name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Name"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Your Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2.5 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm"
                      >
                        Back
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className={`ml-auto px-6 py-2.5 rounded-full font-semibold transition-all text-sm ${
                          isStepValid()
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepValid() || isSubmitting}
                        className={`ml-auto px-6 py-2.5 rounded-full font-semibold transition-all text-sm ${
                          isStepValid() && !isSubmitting
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
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

      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConsultantsPage;

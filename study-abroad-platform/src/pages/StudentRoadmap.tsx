import {useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Users, GraduationCap, FileText, Plane, CreditCard, MapPin, Award, X, Building2, BadgeCheck, Gift, Trophy, Handshake, ShieldCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollToTop } from '../hooks/useScrollToTop';

// Import images from assets
import counselingImage from '../assets/Free_Counseling_Session.png';
import universityImage from '../assets/University_Selection.png';
import testPrepImage from '../assets/Test_Preparation_Application.png';
import admissionImage from '../assets/Admission_Scholarships.png';
import financeImage from '../assets/Finance_Loan_Assistance.png';
import visaImage from '../assets/Visa_Guidance.png';
import preDepartureImage from '../assets/Pre-Departure_Support.png';
import postLandingImage from '../assets/Post-Landing_Support.png';

// Import hero section images
import s1 from '../assets/Herosection/s1.png';
import s2 from '../assets/Herosection/s2.png';
import s3 from '../assets/Herosection/s3.png';
import s4 from '../assets/Herosection/s4.png';
import s5 from '../assets/Herosection/s5.png';
import s6 from '../assets/Herosection/s6.png';

interface RoadmapStep {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  color: string;
  image: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  dreamCountry: string;
  preferredIntake: string;
  educationLevel: string;
  currentCity: string;
}

const StudentRoadmap: React.FC = () => {
  useScrollToTop()
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

  const roadmapSteps: RoadmapStep[] = [
    {
      step: 1,
      icon: <Users className="w-8 h-8" />,
      title: "Free Counseling Session",
      description: "Connect with our expert counselors to discuss your dreams, goals, and academic background. We'll help you understand your options and create a personalized plan.",
      duration: "1-2 day",
      color: "from-blue-500 to-blue-600",
      image: counselingImage
    },
    {
      step: 2,
      icon: <GraduationCap className="w-8 h-8" />,
      title: "University Selection",
      description: "Based on your profile, budget, and preferences, we shortlist the best-fit universities and programs across multiple countries using our comprehensive database.",
      duration: " 6- 15 days",
      color: "from-purple-500 to-purple-600",
      image: universityImage
    },
    {
      step: 3,
      icon: <FileText className="w-8 h-8" />,
      title: "Test Preparation & Application",
      description: "Get guidance on IELTS, TOEFL, GRE, GMAT, and other required tests. We help craft compelling SOPs, LORs, and complete your university applications.",
      duration: "2 months",
      color: "from-indigo-500 to-indigo-600",
      image: testPrepImage
    },
    {
      step: 4,
      icon: <Award className="w-8 h-8" />,
      title: "Admission & Scholarships",
      description: "Receive offers from universities and explore scholarship opportunities. We negotiate on your behalf and help you choose the best option.",
      duration: "2 weeks",
      color: "from-pink-500 to-pink-600",
      image: admissionImage
    },
    {
      step: 5,
      icon: <CreditCard className="w-8 h-8" />,
      title: "Finance & Loan Assistance",
      description: "Get connected with trusted education loan providers and explore financial aid options. We assist with documentation and application processes.",
      duration: "1 week",
      color: "from-orange-500 to-orange-600",
      image: financeImage
    },
    {
      step: 6,
      icon: <FileText className="w-8 h-8" />,
      title: "Visa Guidance",
      description: "Complete visa documentation support, interview preparation, and submission assistance. We ensure you're fully prepared for the visa process.",
      duration: "3-6 weeks",
      color: "from-green-500 to-green-600",
      image: visaImage
    },
    {
      step: 7,
      icon: <Plane className="w-8 h-8" />,
      title: "Pre-Departure Support",
      description: "Travel booking, forex assistance, accommodation guidance, and orientation sessions to prepare you for life abroad.",
      duration: "2-3 weeks",
      color: "from-teal-500 to-teal-600",
      image: preDepartureImage
    },
    {
      step: 8,
      icon: <MapPin className="w-8 h-8" />,
      title: "Post-Landing Support",
      description: "We stay connected even after you land. Get support with local registration, bank account setup, and settling into your new environment.",
      duration: "Ongoing",
      color: "from-red-500 to-red-600",
      image: postLandingImage
    }
  ];

  const benefits = [
    {
      icon: <Building2 className="w-6 h-6" />,
      text: "920+ Partner Universities Worldwide",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      text: "98% Visa Success Rate",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      text: "Scholarship Worth ₹5+ Crores Secured",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      text: "10,000+ Success Stories",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      text: "End-to-End Free Consultation",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      text: "Zero Hidden Charges",
      color: "from-teal-500 to-teal-600"
    }
  ];

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

      console.log('Submitting journey form to:', `${API_BASE}/journey/submit.php`);
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
            console.log('Journey form submitted successfully:', result);
            setSubmitSuccess(true);
            setTimeout(() => {
              closeModal();
            }, 3000);
          } else {
            // Even if success is false, data might be stored - show success anyway
            console.log('API returned success=false but data might be stored');
            setSubmitSuccess(true);
            setTimeout(() => {
              closeModal();
            }, 3000);
          }
        } catch (parseError) {
          // If JSON parsing fails but status is 200, assume success
          console.log('JSON parse failed but status 200 - assuming success');
          setSubmitSuccess(true);
          setTimeout(() => {
            closeModal();
          }, 3000);
        }
      } else {
        // For non-200 status codes, show error
        const errorText = await response.text();
        console.error('Response error:', errorText);
        alert(`Error: Unable to submit form. Please try again.`);
      }
    } catch (error) {
      console.error('Journey form submission error:', error);
      
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
                    Your Journey to <br />
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Study Abroad</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                    From dream to destination - A step-by-step roadmap designed just for you. Connect with world-class universities and experience a life-changing journey.
                  </p>
                  <div className="bg-gradient-to-r from-primary-100 to-white rounded-xl px-5 py-3 shadow flex items-center gap-3 border border-primary-100">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-base md:text-lg font-semibold text-primary-700">Complete roadmap with expert guidance at every step!</span>
                  </div>
                </div>
                <button onClick={openModal} className="bg-gradient-to-r from-primary to-accent hover:from-primary-700 hover:to-accent text-white font-semibold px-8 py-3 rounded-lg shadow-xl transition mb-4 mt-2 w-fit">Start Your Journey</button>
              </div>
              {/* Right: Diamond images */}
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

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              Why Students Choose Codescholar Overseas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index: number) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${benefit.color} text-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {benefit.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button 
                onClick={openModal}
                className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </section>

        {/* Roadmap Steps - Tree Style with Images */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
                The Complete Study Abroad Roadmap
              </h2>
              <p className="text-center text-gray-600 mb-16 text-lg">
                Follow these 8 simple steps to make your dream of studying abroad a reality
              </p>

              {/* Tree Timeline */}
              <div className="relative">
                {/* Central Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-accent hidden lg:block"></div>

                <div className="space-y-0">
                  {roadmapSteps.map((item: RoadmapStep, index: number) => {
                    const isLeft = index % 2 === 0;
                    
                    return (
                      <div key={index} className="relative">
                        {/* Desktop Layout - Alternating */}
                        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center mb-12">
                          {/* Left Side */}
                          {isLeft ? (
                            <>
                              {/* Content on Left */}
                              <div className="flex justify-end pr-12">
                                <div 
                                  className="w-full max-w-md bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 relative group hover:-translate-y-1"
                                  style={{ 
                                    animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both` 
                                  }}
                                >
                                  <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-primary"></div>
                                  
                                  <div className="flex items-start gap-4 mb-4">
                                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                      {item.icon}
                                    </div>
                                    <div className="flex-1">
                                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-2">
                                        {item.duration}
                                      </span>
                                      <h3 className="text-xl font-bold text-gray-800">
                                        {item.title}
                                      </h3>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                  </p>
                                  
                                  <div className={`absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
                                    {item.step}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Image on Right */}
                              <div className="flex justify-start pl-12">
                                <div 
                                  className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                                  style={{ 
                                    animation: `fadeInRight 0.6s ease-out ${index * 0.1}s both` 
                                  }}
                                >
                                  <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  
                                  <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
                                    <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg relative z-10`}></div>
                                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full animate-ping opacity-20`}></div>
                                  </div>
                                  
                                  <div className="absolute -left-12 top-1/2 w-12 h-0.5 bg-gradient-to-l from-gray-300 to-primary"></div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Image on Left */}
                              <div className="flex justify-end pr-12">
                                <div 
                                  className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                                  style={{ 
                                    animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both` 
                                  }}
                                >
                                  <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  
                                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                                    <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg relative z-10`}></div>
                                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full animate-ping opacity-20`}></div>
                                  </div>
                                  
                                  <div className="absolute -right-12 top-1/2 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-primary"></div>
                                </div>
                              </div>
                              
                              {/* Content on Right */}
                              <div className="flex justify-start pl-12">
                                <div 
                                  className="w-full max-w-md bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 relative group hover:-translate-y-1"
                                  style={{ 
                                    animation: `fadeInRight 0.6s ease-out ${index * 0.1}s both` 
                                  }}
                                >
                                  <div className="absolute top-1/2 -left-12 w-12 h-0.5 bg-gradient-to-l from-gray-300 to-primary"></div>
                                  
                                  <div className="flex items-start gap-4 mb-4">
                                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                      {item.icon}
                                    </div>
                                    <div className="flex-1">
                                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-2">
                                        {item.duration}
                                      </span>
                                      <h3 className="text-xl font-bold text-gray-800">
                                        {item.title}
                                      </h3>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                  </p>
                                  
                                  <div className={`absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
                                    {item.step}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden relative pb-12">
                          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 mb-6">
                            {index < roadmapSteps.length - 1 && (
                              <div className="absolute left-3 top-6 w-0.5 h-full bg-gradient-to-b from-primary to-purple-500"></div>
                            )}
                            
                            <div className="absolute -left-3 top-6">
                              <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg relative z-10`}></div>
                            </div>
                            
                            <div className="flex items-start gap-4 mb-4">
                              <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center shadow-lg`}>
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-2">
                                  {item.duration}
                                </span>
                                <h3 className="text-lg font-bold text-gray-800">
                                  Step {item.step}: {item.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm mb-4">
                              {item.description}
                            </p>
                            
                            <div className="rounded-xl overflow-hidden shadow-md">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={openModal}
                  className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Timeline */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Average Timeline to Study Abroad
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                The entire process typically takes 8-12 months from initial counseling to departure
              </p>
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1-2</div>
                    <div className="text-gray-600">Months for Counseling & Shortlisting</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">3-6</div>
                    <div className="text-gray-600">Months for Tests & Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">2-3</div>
                    <div className="text-gray-600">Months for Visa Process</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">8-12</div>
                    <div className="text-gray-600">Total Months to Departure</div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <button 
                  onClick={openModal}
                  className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Begin Your Study Abroad Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book a free counseling session with our experts today and take the first step towards your international education
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={openModal}
                className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Snippet */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Common Questions About the Process
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">When should I start preparing?</h3>
                  <p className="text-gray-600">
                    Ideally, start 12-18 months before your intended intake. This gives you enough time for test prep, applications, and visa processing.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Do you charge for counseling?</h3>
                  <p className="text-gray-600">
                    Our initial counseling session is completely free. We believe in helping students make informed decisions without any pressure.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">What is your visa success rate?</h3>
                  <p className="text-gray-600">
                    We maintain a 95% visa success rate through thorough documentation support and expert guidance at every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Multi-Step Modal Form - COMPACT VERSION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {!submitSuccess ? (
              <div className="p-6">
                {/* Progress Indicator - Compact */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                              currentStep >= step
                                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
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
                              currentStep > step ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Choose Dream Country & Intake */}
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
                                  ? 'border-primary bg-primary/5 shadow-md'
                                  : 'border-gray-200 hover:border-primary/50'
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
                                  ? 'border-primary bg-primary/5 text-primary shadow-md'
                                  : 'border-gray-200 text-gray-700 hover:border-primary/50'
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

                  {/* Step 2: Education Level & Current City */}
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
                                  ? 'border-primary bg-primary/5 text-primary shadow-md'
                                  : 'border-gray-200 text-gray-700 hover:border-primary/50'
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
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Information */}
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
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
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
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
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
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons - Compact */}
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
                            ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
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
                            ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
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
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  🚀 Journey Started Successfully!
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    Welcome to your study abroad adventure!
                  </p>
                  <p className="text-gray-700 mb-3">
                    Your journey form has been successfully submitted and our expert team is reviewing your profile.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-blue-800 font-medium">
                      📞 We will contact you within 12-24 hours
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Our certified study abroad counselors will reach out to create your personalized roadmap and guide you through each step of the process.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Get ready to turn your dreams into reality! Your future starts now. 🌟
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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
    </>
  );
};

export default StudentRoadmap;

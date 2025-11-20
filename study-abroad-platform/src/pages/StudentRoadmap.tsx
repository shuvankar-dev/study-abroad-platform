import { Link } from 'react-router-dom';
import { CheckCircle, Users, GraduationCap, FileText, Plane, CreditCard, MapPin, Award } from 'lucide-react';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import images from assets
import counselingImage from '../assets/Free_Counseling_Session.png';
import universityImage from '../assets/University_Selection.png';
import testPrepImage from '../assets/Test_Preparation_Application.png';
import admissionImage from '../assets/Admission_Scholarships.png';
import financeImage from '../assets/Finance_Loan_Assistance.png';
import visaImage from '../assets/Visa_Guidance.png';
import preDepartureImage from '../assets/Pre-Departure_Support.png';
import postLandingImage from '../assets/Post-Landing_Support.png';

interface RoadmapStep {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  color: string;
  image: string;
}

const StudentRoadmap: React.FC = () => {
  const roadmapSteps: RoadmapStep[] = [
    {
      step: 1,
      icon: <Users className="w-8 h-8" />,
      title: "Free Counseling Session",
      description: "Connect with our expert counselors to discuss your dreams, goals, and academic background. We'll help you understand your options and create a personalized plan.",
      duration: "1-2 weeks",
      color: "from-blue-500 to-blue-600",
      image: counselingImage
    },
    {
      step: 2,
      icon: <GraduationCap className="w-8 h-8" />,
      title: "University Selection",
      description: "Based on your profile, budget, and preferences, we shortlist the best-fit universities and programs across multiple countries using our comprehensive database.",
      duration: "2-3 weeks",
      color: "from-purple-500 to-purple-600",
      image: universityImage
    },
    {
      step: 3,
      icon: <FileText className="w-8 h-8" />,
      title: "Test Preparation & Application",
      description: "Get guidance on IELTS, TOEFL, GRE, GMAT, and other required tests. We help craft compelling SOPs, LORs, and complete your university applications.",
      duration: "3-6 months",
      color: "from-indigo-500 to-indigo-600",
      image: testPrepImage
    },
    {
      step: 4,
      icon: <Award className="w-8 h-8" />,
      title: "Admission & Scholarships",
      description: "Receive offers from universities and explore scholarship opportunities. We negotiate on your behalf and help you choose the best option.",
      duration: "4-8 weeks",
      color: "from-pink-500 to-pink-600",
      image: admissionImage
    },
    {
      step: 5,
      icon: <CreditCard className="w-8 h-8" />,
      title: "Finance & Loan Assistance",
      description: "Get connected with trusted education loan providers and explore financial aid options. We assist with documentation and application processes.",
      duration: "2-4 weeks",
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

  const benefits: string[] = [
    "200+ Partner Universities Worldwide",
    "95% Visa Success Rate",
    "Scholarship Worth ₹50+ Crores Secured",
    "10,000+ Success Stories",
    "End-to-End Personalized Guidance",
    "Zero Hidden Charges"
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Your Journey to Study Abroad
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                From dream to destination - A step-by-step roadmap designed just for you
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Your Journey
                </Link>
                <a 
                  href="tel:+918777841275" 
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              Why Students Choose Codescholar Overseas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit: string, index: number) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
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
                                  {/* Branch Line to Center */}
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
                                  
                                  {/* Step Number Badge */}
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
                                  {/* Overlay gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  
                                  {/* Center Circle Connector */}
                                  <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
                                    <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg relative z-10`}></div>
                                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full animate-ping opacity-20`}></div>
                                  </div>
                                  
                                  {/* Branch Line from Center to Image */}
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
                                  {/* Overlay gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  
                                  {/* Center Circle Connector */}
                                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                                    <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg relative z-10`}></div>
                                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full animate-ping opacity-20`}></div>
                                  </div>
                                  
                                  {/* Branch Line from Center to Image */}
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
                                  {/* Branch Line to Center */}
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
                                  
                                  {/* Step Number Badge */}
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
                            {/* Vertical Line for Mobile */}
                            {index < roadmapSteps.length - 1 && (
                              <div className="absolute left-3 top-6 w-0.5 h-full bg-gradient-to-b from-primary to-purple-500"></div>
                            )}
                            
                            {/* Circle Dot */}
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
                            
                            {/* Image for Mobile */}
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
              <Link 
                to="/contact" 
                className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Book Free Consultation
              </Link>
              <a 
                href="https://wa.me/918777841275" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
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
      `}</style>
    </>
  );
};

export default StudentRoadmap;

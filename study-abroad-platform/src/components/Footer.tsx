import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { cities } from '../data/cities'

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Function to scroll to top when navigating
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-primary to-accent text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="bg-white/6 rounded-2xl p-8 md:p-12"> 
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Contact & logo */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="rounded-md p-8 mr-3 bg-white/80 shadow-lg ring-1 ring-white/20 flex items-center justify-center" style={{ minWidth: 72, minHeight: 72, width: 'auto' }}>
                  <img src={logo} alt="Codescholar Overseas" className="h-14 w-auto max-w-[120px] object-contain" style={{ display: 'block' }} />
                </div>
                <div>
                  <div className="text-sm text-white font-semibold">Codescholar Overseas</div>
                  <div className="text-sm text-white/90">Helping students move from ambition to acceptance.</div>
                </div>
              </div>
              <div className="text-sm text-white/95">
                <div>West Nabanagar , Birati, Kolkata -700051</div>
                <div className="mt-2">Email: <a href="mailto:info@codescholaroverseas.com" className="underline">info@codescholaroverseas.com</a></div>
                <div>Phone: <a href="tel:+918777841275" className="underline">+91 87778 41275</a></div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.facebook.com/profile.php?id=61580675820793&sk=about" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/codescholaroverseas/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.instagram.com/codescholaroverseas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* Test Prep */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Test Prep</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">TOEFL</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">PTE</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">IELTS</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">GMAT</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">GRE</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">SAT</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">CAEL</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">CELPIP</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Duolingo</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">ACT</a></li>
              </ul>
            </div>

            {/* Study Destinations */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Study Destinations</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=United States')} 
                    className="hover:underline text-left"
                  >
                    United States
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=United Kingdom')} 
                    className="hover:underline text-left"
                  >
                    United Kingdom
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=Canada')} 
                    className="hover:underline text-left"
                  >
                    Canada
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=Australia')} 
                    className="hover:underline text-left"
                  >
                    Australia
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=Germany')} 
                    className="hover:underline text-left"
                  >
                    Germany
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=Ireland')} 
                    className="hover:underline text-left"
                  >
                    Ireland
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=France')} 
                    className="hover:underline text-left"
                  >
                    France
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=Netherlands')} 
                    className="hover:underline text-left"
                  >
                    Netherlands
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/search-results?country=New Zealand')} 
                    className="hover:underline text-left"
                  >
                    New Zealand
                  </button>
                </li>
              </ul>
            </div>

            {/* Consultant Areas */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Consultant Areas</h4>
              <ul className="space-y-2 text-sm text-white/90">
                {cities.slice(0, 10).map((city) => (
                  <li key={city.slug}>
                    <button
                      onClick={() => handleNavigation(`/consultants/${city.slug}`)}
                      className="hover:underline hover:text-yellow-300 transition-colors text-left"
                    >
                      {city.name}
                    </button>
                  </li>
                ))}
                {cities.length > 10 && (
                  <li>
                    <button
                      onClick={() => handleNavigation('/consultants')}
                      className="hover:underline text-yellow-300 font-medium text-left"
                    >
                      View All Cities →
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Student Services */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Student Services</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Visa Guidance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Admission Guidance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Career Counseling</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Finance Assistance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Travel Assistance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Forex Assistance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Scholarship</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">Study Abroad</a></li>
              </ul>
            </div>

            {/* Legal Pages */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Legal Pages</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <button 
                    onClick={() => handleNavigation('/terms-conditions')} 
                    className="hover:underline text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/privacy-policy')} 
                    className="hover:underline text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/refund-policy')} 
                    className="hover:underline text-left"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/data-protection')} 
                    className="hover:underline text-left"
                  >
                    Data Protection
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <button 
                    onClick={() => handleNavigation('/blog')} 
                    className="hover:underline text-left"
                  >
                    Blog
                  </button>
                </li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:underline">ApplyInsights</a></li>
              </ul>
            </div>
              {/* About */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">About</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <button 
                    onClick={() => handleNavigation('/services')} 
                    className="hover:underline text-left"
                  >
                    Our Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/student-roadmap')} 
                    className="hover:underline hover:text-yellow-300 transition-colors text-left"
                  >
                    Student Roadmap
                  </button>
                </li>
              </ul>
            </div>

            {/* Our Product */}
            <div className="md:pl-6">
              <h4 className="font-semibold text-white mb-3">Our Product</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="https://codescholarwriters.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Codescholar Writers</a></li>
                <li><a href="https://codescholaroverseas.com/" className="hover:underline">Codescholaroverseas</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="mt-8 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl mx-6 mt-6 px-8 py-6 shadow-lg border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm">
              <div className="text-white font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                &copy; {new Date().getFullYear()} Codescholar Overseas. All rights reserved.
              </div>
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <div className="w-px h-4 bg-white/30 hidden md:block"></div>
                <span className="text-white/90 flex items-center gap-2">
                  Developed by 
                  <a 
                    href="https://algorithmssolutions.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-white hover:text-yellow-300 transition-colors duration-300 underline decoration-dotted underline-offset-2"
                  >
                    algorithmssolutions.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

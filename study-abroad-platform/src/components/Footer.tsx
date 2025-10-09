
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-accent text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="bg-white/6 rounded-2xl p-8 md:p-12"> 
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Contact & logo */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img src={logo} alt="Codescholar Overseas" className="h-10 mr-3" />
              </div>
              <p className="text-sm text-white/90 mb-4">Codescholar Overseas<br/>Helping students move from ambition to acceptance.</p>
              <div className="text-sm text-white/80">
                <div>123 Scholar Lane</div>
                <div>City, State ZIP</div>
                <div className="mt-2">Email: <a href="mailto:hello@codescholar.com" className="underline">hello@codescholar.com</a></div>
                <div>Phone: <a href="tel:+918777841275" className="underline">+91 87778 41275</a></div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#" aria-label="Facebook" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-white/90 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* Students */}
            <div className="md:pl-6 md:border-l md:border-white/6">
              <h4 className="font-semibold text-white mb-3">Students</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="#" className="hover:underline">Find Programs</a></li>
                <li><a href="#" className="hover:underline">How it works</a></li>
                <li><a href="#" className="hover:underline">Apply Now</a></li>
              </ul>
            </div>

            {/* Destinations */}
            <div className="md:pl-6 md:border-l md:border-white/6">
              <h4 className="font-semibold text-white mb-3">Destinations</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="#" className="hover:underline">Australia</a></li>
                <li><a href="#" className="hover:underline">Canada</a></li>
                <li><a href="#" className="hover:underline">Germany</a></li>
                <li><a href="#" className="hover:underline">United Kingdom</a></li>
                <li><a href="#" className="hover:underline">United States</a></li>
              </ul>
            </div>

            {/* About */}
            <div className="md:pl-6 md:border-l md:border-white/6">
              <h4 className="font-semibold text-white mb-3">About</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="#" className="hover:underline">Our Story</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:pl-6 md:border-l md:border-white/6">
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Webinars</a></li>
                <li><a href="#" className="hover:underline">ApplyInsights</a></li>
              </ul>
            </div>
          </div>
        </div>

        

        <div className="rounded-b-2xl px-6 py-6 mt-6 flex flex-col md:flex-row items-center justify-between text-sm bg-blue-100">
          <div className="text-blue-800">&copy; {new Date().getFullYear()} Codescholar Overseas. All rights reserved.</div>
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <a href="#" className="text-blue-800 hover:underline">Privacy Policy</a>
            <a href="#" className="text-blue-800 hover:underline">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

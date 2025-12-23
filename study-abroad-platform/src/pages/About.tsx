import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { 
  Globe, 
  Users, 
  GraduationCap, 
  Award, 
  Heart, 
  Lightbulb, 
  Target, 
  CheckCircle, 
  Star,
  BookOpen,
  Plane,
  Shield
} from 'lucide-react'

const About = () => {
  useScrollToTop()

  const features = [
    { 
      icon: Globe, 
      title: 'Global Reach', 
      desc: 'Access 100,000+ courses across 920+ universities in 35+ countries, including Ivy League and top-ranked institutions.',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: GraduationCap, 
      title: 'End-to-End Consultancy', 
      desc: 'From application to arrival, we guide students at every step of their study abroad journey.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Award, 
      title: 'Expert Guidance', 
      desc: 'One-to-one expert mentoring to align your goals with the right study destination and program.',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Shield, 
      title: 'Financial Support', 
      desc: 'Education loan assistance from both private and government banks, blocked accounts, forex guidance.',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      icon: BookOpen, 
      title: 'Test Preparation', 
      desc: 'Comprehensive guidance for IELTS, GRE, GMAT, and other English proficiency examinations.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      icon: Plane, 
      title: 'Post-Arrival Support', 
      desc: 'Accommodation assistance, settlement help, and academic support to ensure smooth transition.',
      gradient: 'from-teal-500 to-blue-500'
    }
  ]

  const stats = [
    { number: '1500+', label: 'Students Guided', icon: Users },
    { number: '920+', label: 'Partner Universities', icon: GraduationCap },
    { number: '35+', label: 'Countries', icon: Globe },
    { number: '98%', label: 'Success Rate', icon: Star }
  ]

  const values = [
    { 
      icon: Heart, 
      title: 'Genuine Care', 
      desc: 'We genuinely care about each student\'s success and treat every application with personal attention.' 
    },
    { 
      icon: Lightbulb, 
      title: 'Innovation', 
      desc: 'We continuously innovate our processes to provide the best possible service to our students.' 
    },
    { 
      icon: Target, 
      title: 'Goal-Oriented', 
      desc: 'Every strategy we implement is designed to help students achieve their specific academic goals.' 
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-white to-accent/10"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-accent/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-accent rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          {/* Enhanced Icon with Animation */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-60 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          
          {/* Enhanced Title with Better Typography */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            About{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent animate-pulse">
                Codescholar
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-0 animate-pulse"></div>
            </span>
          </h1>
          
          {/* Enhanced Description */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              We help students move from{' '}
              <span className="text-primary font-bold">ambition</span> to{' '}
              <span className="text-accent font-bold">acceptance</span> — providing comprehensive, 
              end-to-end guidance for your study abroad journey with genuine care and expert knowledge.
            </p>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700">Trusted by 1500+ Students</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">98% Success Rate</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <Globe className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">35+ Countries</span>
            </div>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a 
              href="https://wa.me/918777841275?text=Hi%20Codescholar%20Overseas!%20I'm%20interested%20in%20starting%20my%20study%20abroad%20journey.%20Can%20you%20help%20me%20with%20university%20applications%20and%20guidance%3F%20I'd%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                </svg>
                Start Your Journey
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
            <a 
              href="https://wa.me/918777841275?text=Hello%20Codescholar%20Overseas!%20I%20would%20like%20to%20learn%20more%20about%20your%20study%20abroad%20services.%20Can%20you%20provide%20me%20with%20detailed%20information%20about%3A%0A%0A1.%20University%20application%20process%0A2.%20Available%20countries%20and%20programs%0A3.%20Visa%20assistance%0A4.%20Financial%20guidance%0A5.%20Test%20preparation%20support%0A%0AThank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
              </svg>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded with a vision to make quality international education accessible to every aspiring student, 
              Codescholar Overseas has grown into a trusted partner for thousands of students worldwide. Our journey 
              began with a simple belief: every student deserves expert guidance and genuine support in pursuing 
              their dreams of studying abroad.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  To empower students with comprehensive guidance, expert counseling, and unwavering support 
                  throughout their study abroad journey, ensuring they achieve their academic and career aspirations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Personalized counseling for every student</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>End-to-end support from application to arrival</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Building lifelong relationships with students</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                  <Target className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Our Vision</h4>
                <p className="text-white/90">
                  To be the most trusted study abroad consultancy, known for our integrity, 
                  expertise, and commitment to student success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their dreams of studying abroad with our guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/918777841275?text=Hello%20Codescholar%20Overseas!%20I%20would%20like%20to%20schedule%20a%20free%20consultation%20to%20discuss%20my%20study%20abroad%20plans.%20Please%20let%20me%20know%20your%20available%20times.%20I'm%20interested%20in%3A%0A%0A%E2%9C%85%20Career%20counseling%0A%E2%9C%85%20University%20selection%0A%E2%9C%85%20Course%20recommendations%0A%E2%9C%85%20Application%20timeline%0A%E2%9C%85%20Financial%20planning%0A%0AThank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors flex items-center gap-2 justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
              </svg>
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About

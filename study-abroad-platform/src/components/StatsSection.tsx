import { GraduationCap, Globe, Landmark, Flag, Users } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    icon: <GraduationCap className="w-10 h-10 text-white" />, 
    value: 1500,
    suffix: '+',
    label: 'Students Guided',
    color: 'bg-blue-500',
  },
  {
    icon: <Globe className="w-10 h-10 text-white" />, 
    value: 120000,
    suffix: '+',
    label: 'Courses Worldwide',
    color: 'bg-pink-500',
  },
  {
    icon: <Landmark className="w-10 h-10 text-white" />, 
    value: 920,
    suffix: '+',
    label: 'Partner Institutions',
    color: 'bg-emerald-500',
  },
  {
    icon: <Flag className="w-10 h-10 text-white" />, 
    value: 35,
    suffix: '+',
    label: 'Countries Served',
    color: 'bg-orange-400',
  },
  {
    icon: <Users className="w-10 h-10 text-white" />, 
    value: 5,
    suffix: '+',
    label: 'Years of Excellence',
    color: 'bg-purple-500',
  },
];

// Counter component with animation
interface AnimatedCounterProps {
  targetValue: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ targetValue, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | undefined;
    const animate = (currentTime: number) => {
      if (startTime === undefined) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetValue, duration]);

  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <span ref={counterRef}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-14 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
          Empowering Your Global Education Journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl border border-blue-100"
            >
              <div className={`mb-4 rounded-xl p-3 ${stat.color} shadow-md`}>{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: stat.color.replace('bg-', 'text-') }}>
                <AnimatedCounter 
                  targetValue={stat.value} 
                  suffix={stat.suffix} 
                  duration={2000 + idx * 200} // Stagger animations
                />
              </div>
              <div className="text-gray-500 text-sm md:text-base font-medium text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

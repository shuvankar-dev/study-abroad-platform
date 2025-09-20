import React from 'react';
import { GraduationCap, Globe, Landmark, Flag, Users } from 'lucide-react';

const stats = [
  {
    icon: <GraduationCap className="w-10 h-10 text-white" />, 
    value: '1.5M+',
    label: 'Students Guided',
    color: 'bg-blue-500',
  },
  {
    icon: <Globe className="w-10 h-10 text-white" />, 
    value: '120,000+',
    label: 'Courses Worldwide',
    color: 'bg-pink-500',
  },
  {
    icon: <Landmark className="w-10 h-10 text-white" />, 
    value: '2,000+',
    label: 'Partner Institutions',
    color: 'bg-emerald-500',
  },
  {
    icon: <Flag className="w-10 h-10 text-white" />, 
    value: '160+',
    label: 'Countries Served',
    color: 'bg-orange-400',
  },
  {
    icon: <Users className="w-10 h-10 text-white" />, 
    value: '12+',
    label: 'Years of Excellence',
    color: 'bg-purple-500',
  },
];

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
                {stat.value}
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

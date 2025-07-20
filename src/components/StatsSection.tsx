import React from 'react';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      number: "847,532",
      label: "Meals Saved",
      color: "text-primary-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "2,341",
      label: "Active NGOs",
      color: "text-secondary-600"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      number: "156",
      label: "Cities Covered",
      color: "text-accent-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      number: "12 min",
      label: "Avg Response Time",
      color: "text-success-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Together, we're creating meaningful change one meal at a time
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${stat.color} flex justify-center mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
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
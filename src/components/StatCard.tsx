import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color }) => {
  const isPositive = change.startsWith('+');
  
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20',
    secondary: 'text-secondary-600 bg-secondary-50 dark:bg-secondary-900/20',
    accent: 'text-accent-600 bg-accent-50 dark:bg-accent-900/20',
    success: 'text-success-600 bg-success-50 dark:bg-success-900/20',
    warning: 'text-warning-600 bg-warning-50 dark:bg-warning-900/20',
    error: 'text-error-600 bg-error-50 dark:bg-error-900/20',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {value}
        </p>
        <div className="flex items-center text-sm">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-error-500 mr-1" />
          )}
          <span className={isPositive ? 'text-success-600' : 'text-error-600'}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
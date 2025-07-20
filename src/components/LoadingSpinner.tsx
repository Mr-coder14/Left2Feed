import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Heart className="h-16 w-16 text-primary-600 mx-auto animate-pulse" />
          <div className="absolute inset-0 h-16 w-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          Loading Left2Feed...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Preparing your food rescue experience
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
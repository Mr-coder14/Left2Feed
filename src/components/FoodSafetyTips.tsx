import React, { useState } from 'react';
import { Shield, X, AlertTriangle, CheckCircle, Clock, Thermometer } from 'lucide-react';
import Button from './Button';

interface FoodSafetyTipsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FoodSafetyTips: React.FC<FoodSafetyTipsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const safetyTips = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Time Guidelines",
      tips: [
        "Cooked food should be consumed within 2 hours at room temperature",
        "Refrigerated food can be safely shared within 24-48 hours",
        "Never share food that has been left out for more than 4 hours"
      ]
    },
    {
      icon: <Thermometer className="h-5 w-5" />,
      title: "Temperature Control",
      tips: [
        "Keep hot food hot (above 60°C) and cold food cold (below 5°C)",
        "Use insulated containers for transport",
        "Avoid the 'danger zone' between 5°C and 60°C"
      ]
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Packaging & Hygiene",
      tips: [
        "Use clean, food-grade containers",
        "Label containers with preparation time",
        "Wash hands thoroughly before handling food",
        "Use separate utensils for different food items"
      ]
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "What NOT to Share",
      tips: [
        "Food with dairy that's been unrefrigerated for >2 hours",
        "Seafood or meat dishes older than 24 hours",
        "Food that looks, smells, or tastes unusual",
        "Home-canned or preserved foods (unless commercially prepared)"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Food Safety Guidelines
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary-800 dark:text-primary-300 mb-1">
                  Our Commitment to Safety
                </h3>
                <p className="text-primary-700 dark:text-primary-400 text-sm">
                  Left2Feed uses AI to automatically flag potentially unsafe food listings. 
                  However, food safety is a shared responsibility between donors and receivers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {safetyTips.map((section, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-primary-600">
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-warning-800 dark:text-warning-300 mb-1">
                  Food Safety Emergency
                </h4>
                <p className="text-warning-700 dark:text-warning-400 text-sm mb-2">
                  If you suspect food poisoning or unsafe food, contact us immediately:
                </p>
                <p className="text-warning-800 dark:text-warning-300 font-medium text-sm">
                  📞 Emergency Hotline: +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <Button
              onClick={onClose}
              variant="primary"
              fullWidth
            >
              I Understand
            </Button>
            <Button
              onClick={() => window.open('/safety-guidelines.pdf', '_blank')}
              variant="outline"
              fullWidth
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSafetyTips;
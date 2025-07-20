import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange, icon }) => {
  return (
    <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
      {icon && (
        <div className="text-gray-500 dark:text-gray-400 mt-1">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <label className="flex items-center cursor-pointer">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="sr-only"
            />
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                checked ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </div>
          </div>
          <div className="ml-3">
            <span className="font-medium text-gray-900 dark:text-white">{label}</span>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
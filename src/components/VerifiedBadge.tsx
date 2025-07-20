import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

interface VerifiedBadgeProps {
  verified: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  type?: 'user' | 'organization';
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  verified, 
  size = 'md', 
  showText = false,
  type = 'user'
}) => {
  if (!verified) return null;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const icon = type === 'organization' ? Shield : CheckCircle;
  const IconComponent = icon;

  return (
    <div className="flex items-center space-x-1">
      <IconComponent className={`${sizeClasses[size]} text-success-600 flex-shrink-0`} />
      {showText && (
        <span className={`${textSizes[size]} text-success-700 dark:text-success-400 font-medium`}>
          Verified {type === 'organization' ? 'NGO' : 'User'}
        </span>
      )}
    </div>
  );
};

export default VerifiedBadge;
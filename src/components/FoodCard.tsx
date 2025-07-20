import React from 'react';
import { MapPin, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';

interface FoodItem {
  id: string;
  dishName: string;
  foodType: 'Veg' | 'Non-Veg' | 'Mixed' | 'Dessert';
  servings: number;
  location: string;
  expiryTime: string;
  pickupTime: string;
  urgency: 'low' | 'medium' | 'high';
  distance: string;
  donor: string;
  notes?: string;
  image?: string;
  claimed: boolean;
}

interface FoodCardProps {
  item: FoodItem;
  onClaim: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onClaim }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-error-100 text-error-800 border-error-200';
      case 'medium': return 'bg-warning-100 text-warning-800 border-warning-200';
      default: return 'bg-success-100 text-success-800 border-success-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getFoodTypeColor = (foodType: string) => {
    switch (foodType) {
      case 'Veg': return 'bg-green-100 text-green-800 border-green-200';
      case 'Non-Veg': return 'bg-red-100 text-red-800 border-red-200';
      case 'Mixed': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getTimeLeft = (expiryTime: string) => {
    const expiry = new Date(expiryTime);
    const now = new Date();
    const diffMs = expiry.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `⏳ ${hours}h ${minutes}m left`;
    }
    return `⏳ ${minutes}m left`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden animate-slide-up">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {item.dishName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              By {item.donor}
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFoodTypeColor(item.foodType)}`}>
              {item.foodType}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getUrgencyColor(item.urgency)}`}>
              {getUrgencyIcon(item.urgency)}
              <span className="capitalize">{item.urgency}</span>
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Users className="h-4 w-4" />
            <span className="text-sm">{item.servings} servings</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{item.distance} away</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Ready: {formatDistanceToNow(new Date(item.pickupTime))} ago</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              item.urgency === 'high' ? 'text-error-600' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {getTimeLeft(item.expiryTime)}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary-600" />
            {item.location}
          </p>
        </div>

        {/* Notes */}
        {item.notes && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              "{item.notes}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={onClaim}
            disabled={item.claimed}
            fullWidth
          >
            {item.claimed ? 'Already Claimed' : 'Claim This Food'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              // Open location in maps
              const encodedLocation = encodeURIComponent(item.location);
              window.open(`https://maps.google.com/?q=${encodedLocation}`, '_blank');
            }}
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>

        {/* Success Message */}
        {item.claimed && (
          <div className="mt-4 p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
            <p className="text-success-800 dark:text-success-300 text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              This food has been claimed and is being prepared for pickup
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
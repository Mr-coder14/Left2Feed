import React, { useState } from 'react';
import { MapPin, Clock, Camera, Moon, Truck, AlertCircle, Check, Shield } from 'lucide-react';
import FormField from '../components/FormField';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import FoodSafetyTips from '../components/FoodSafetyTips';

interface FoodListing {
  foodType: string;
  dishName: string;
  servings: string;
  prepTime: string;
  pickupTime: string;
  expiryTime: string;
  location: string;
  notes: string;
  image?: File;
  nightPickup: boolean;
  selfDelivery: boolean;
}

const ListFood: React.FC = () => {
  const [listing, setListing] = useState<FoodListing>({
    foodType: '',
    dishName: '',
    servings: '',
    prepTime: '',
    pickupTime: '',
    expiryTime: '',
    location: '',
    notes: '',
    nightPickup: false,
    selfDelivery: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSafetyTips, setShowSafetyTips] = useState(false);

  const handleInputChange = (field: keyof FoodListing, value: string | boolean | File) => {
    setListing(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate AI processing and submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const predictExpiry = () => {
    const now = new Date();
    const hours = listing.foodType === 'Non-Veg' ? 4 : 8;
    const expiry = new Date(now.getTime() + hours * 60 * 60 * 1000);
    handleInputChange('expiryTime', expiry.toISOString().slice(0, 16));
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center animate-slide-up">
          <div className="w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Food Listed Successfully! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your food listing is now live and nearby NGOs are being notified. You'll receive updates on claims and pickup status.
          </p>
          <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-6">
            <p className="text-primary-800 dark:text-primary-300 font-semibold">
              You just helped feed {listing.servings} people! 💛
            </p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setSubmitted(false);
                setListing({
                  foodType: '',
                  dishName: '',
                  servings: '',
                  prepTime: '',
                  pickupTime: '',
                  expiryTime: '',
                  location: '',
                  notes: '',
                  nightPickup: false,
                  selfDelivery: false,
                });
              }}
              variant="primary"
              fullWidth
            >
              List Another Food Item
            </Button>
            <Button
              onClick={() => window.location.href = '/dashboard'}
              variant="outline"
              fullWidth
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-slide-up">
          <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Share Your Extra Food</h1>
            <p className="text-primary-100">Help us turn your surplus into someone's sustenance</p>
          </div>

          {/* Food Safety Banner */}
          <div className="p-4 bg-warning-50 dark:bg-warning-900/20 border-b border-warning-200 dark:border-warning-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-warning-600" />
                <div>
                  <p className="text-warning-800 dark:text-warning-300 font-medium text-sm">
                    Food Safety First
                  </p>
                  <p className="text-warning-700 dark:text-warning-400 text-xs">
                    Please review our safety guidelines before listing food
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowSafetyTips(true)}
                variant="outline"
                size="sm"
                className="border-warning-300 text-warning-700 hover:bg-warning-100"
              >
                View Guidelines
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Food Type */}
            <FormField label="Food Type" required>
              <select
                value={listing.foodType}
                onChange={(e) => handleInputChange('foodType', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select food type</option>
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
                <option value="Mixed">Mixed</option>
                <option value="Dessert">Dessert</option>
              </select>
            </FormField>

            {/* Dish Name */}
            <FormField label="Dish Name(s)" required>
              <input
                type="text"
                value={listing.dishName}
                onChange={(e) => handleInputChange('dishName', e.target.value)}
                placeholder="e.g., Lemon Rice, Paneer Curry, Mixed Vegetables"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </FormField>

            {/* Servings */}
            <FormField label="Number of Servings" required>
              <input
                type="number"
                value={listing.servings}
                onChange={(e) => handleInputChange('servings', e.target.value)}
                placeholder="How many people can this feed?"
                min="1"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </FormField>

            {/* Prep Time */}
            <FormField label="Preparation Time" helpText="When was this food prepared?">
              <input
                type="datetime-local"
                value={listing.prepTime}
                onChange={(e) => handleInputChange('prepTime', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </FormField>

            {/* Pickup Time */}
            <FormField label="Pickup Ready Time" required>
              <input
                type="datetime-local"
                value={listing.pickupTime}
                onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </FormField>

            {/* AI Expiry Prediction */}
            <FormField label="Estimated Expiry Time" helpText="AI-powered prediction based on food type">
              <div className="flex space-x-2">
                <input
                  type="datetime-local"
                  value={listing.expiryTime}
                  onChange={(e) => handleInputChange('expiryTime', e.target.value)}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                <Button
                  type="button"
                  onClick={predictExpiry}
                  variant="secondary"
                  size="sm"
                  disabled={!listing.foodType}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  AI Predict
                </Button>
              </div>
            </FormField>

            {/* Location */}
            <FormField label="Pickup Location" required>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={listing.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter address or use GPS"
                  className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </FormField>

            {/* Special Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Special Options</h3>
              
              <Toggle
                label="Night Pickup Mode"
                description="🌙 Available after 9 PM - connects with night-active NGOs"
                checked={listing.nightPickup}
                onChange={(checked) => handleInputChange('nightPickup', checked)}
                icon={<Moon className="h-5 w-5" />}
              />

              <Toggle
                label="I'll Drop It Myself"
                description="🚶 Self-delivery to verified local drop points within 1-3 km"
                checked={listing.selfDelivery}
                onChange={(checked) => handleInputChange('selfDelivery', checked)}
                icon={<Truck className="h-5 w-5" />}
              />
            </div>

            {/* Notes */}
            <FormField label="Additional Notes" helpText="Allergens, packaging status, urgency, etc.">
              <textarea
                value={listing.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any important details about the food..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
              />
            </FormField>

            {/* Image Upload */}
            <FormField label="Food Image" helpText="Optional - helps NGOs identify the food">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">Click to upload or drag & drop</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleInputChange('image', e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                >
                  Choose Image
                </label>
              </div>
            </FormField>

            {/* Safety Notice */}
            <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-warning-800 dark:text-warning-300">Food Safety Reminder</h4>
                  <p className="text-warning-700 dark:text-warning-400 text-sm mt-1">
                    Please ensure food is properly stored and safe for consumption. Our AI will flag potentially unsafe listings.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              loadingText="Processing your listing..."
            >
              Share Food & Help Community
            </Button>
          </form>
        </div>
      </div>

      {/* Food Safety Tips Modal */}
      <FoodSafetyTips 
        isOpen={showSafetyTips} 
        onClose={() => setShowSafetyTips(false)} 
      />
    </div>
  );
};

export default ListFood;
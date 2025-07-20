import React, { useState } from 'react';
import { MapPin, Clock, Users, AlertTriangle, Map } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import Button from '../components/Button';

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

const FoodFeed: React.FC = () => {
  const [viewMode, setViewMode] = useState<'feed' | 'map'>('feed');
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg' | 'urgent'>('all');

  // Mock data - replace with actual API calls
  const foodItems: FoodItem[] = [
    {
      id: '1',
      dishName: 'Lemon Rice, Sambar, Pickle',
      foodType: 'Veg',
      servings: 25,
      location: 'Koramangala, Bangalore',
      expiryTime: '2024-12-19T22:00:00',
      pickupTime: '2024-12-19T19:30:00',
      urgency: 'high',
      distance: '1.2 km',
      donor: 'Rajesh Wedding Caterers',
      notes: 'Fresh preparation, properly packed',
      claimed: false,
    },
    {
      id: '2',
      dishName: 'Chicken Biryani, Raita',
      foodType: 'Non-Veg',
      servings: 40,
      location: 'Indiranagar, Bangalore',
      expiryTime: '2024-12-19T21:00:00',
      pickupTime: '2024-12-19T19:00:00',
      urgency: 'medium',
      distance: '2.8 km',
      donor: 'Tech Corp Event',
      claimed: false,
    },
    {
      id: '3',
      dishName: 'Mixed Vegetable Curry, Rotis',
      foodType: 'Veg',
      servings: 15,
      location: 'BTM Layout, Bangalore',
      expiryTime: '2024-12-20T10:00:00',
      pickupTime: '2024-12-19T20:00:00',
      urgency: 'low',
      distance: '3.5 km',
      donor: 'Sunrise Restaurant',
      notes: 'Night pickup available',
      claimed: false,
    },
  ];

  const filteredItems = foodItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'veg') return item.foodType === 'Veg';
    if (filter === 'non-veg') return item.foodType === 'Non-Veg';
    if (filter === 'urgent') return item.urgency === 'high';
    return true;
  });

  const handleClaim = (itemId: string) => {
    // Handle food claiming logic
    console.log('Claiming food item:', itemId);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Available Food Near You
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Real-time feed of surplus food ready for pickup
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          {/* View Toggle */}
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('feed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'feed'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
              }`}
            >
              <Users className="h-4 w-4 inline mr-1" />
              Feed View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'map'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
              }`}
            >
              <Map className="h-4 w-4 inline mr-1" />
              Map View
            </button>
          </div>

          {/* Filters */}
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Food' },
              { key: 'veg', label: 'Vegetarian' },
              { key: 'non-veg', label: 'Non-Veg' },
              { key: 'urgent', label: 'Urgent' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{filteredItems.length}</div>
              <div className="text-primary-100">Items Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {filteredItems.reduce((sum, item) => sum + item.servings, 0)}
              </div>
              <div className="text-primary-100">People Can Be Fed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {filteredItems.filter(item => item.urgency === 'high').length}
              </div>
              <div className="text-primary-100">Urgent Pickups</div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'feed' ? (
          <div className="grid gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onClaim={() => handleClaim(item.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No food items found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your filters or check back later for new listings.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Interactive map with food locations will be displayed here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Integration with Google Maps API required
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodFeed;
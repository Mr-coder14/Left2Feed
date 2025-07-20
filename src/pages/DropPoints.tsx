import React, { useState } from 'react';
import { MapPin, Clock, Phone, Star, Navigation } from 'lucide-react';
import Button from '../components/Button';

interface DropPoint {
  id: string;
  name: string;
  type: 'ngo' | 'shelter' | 'orphanage' | 'old-age-home' | 'community-kitchen';
  location: string;
  distance: string;
  rating: number;
  capacity: string;
  openHours: string;
  contact: string;
  verified: boolean;
  lastActive: string;
  specialties: string[];
}

const DropPoints: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'capacity'>('distance');

  const dropPoints: DropPoint[] = [
    {
      id: '1',
      name: 'Helping Hands NGO',
      type: 'ngo',
      location: 'Koramangala, Bangalore',
      distance: '0.8 km',
      rating: 4.8,
      capacity: '100+ people daily',
      openHours: '24/7',
      contact: '+91 98765 43210',
      verified: true,
      lastActive: '2 hours ago',
      specialties: ['Emergency Response', 'Night Pickup'],
    },
    {
      id: '2',
      name: 'City Children Shelter',
      type: 'orphanage',
      location: 'Indiranagar, Bangalore',
      distance: '1.5 km',
      rating: 4.9,
      capacity: '50 children',
      openHours: '6 AM - 10 PM',
      contact: '+91 98765 43211',
      verified: true,
      lastActive: '1 hour ago',
      specialties: ['Child Nutrition', 'Special Diets'],
    },
    {
      id: '3',
      name: 'Golden Years Home',
      type: 'old-age-home',
      location: 'BTM Layout, Bangalore',
      distance: '2.1 km',
      rating: 4.6,
      capacity: '75 residents',
      openHours: '8 AM - 8 PM',
      contact: '+91 98765 43212',
      verified: true,
      lastActive: '3 hours ago',
      specialties: ['Senior Care', 'Soft Foods'],
    },
    {
      id: '4',
      name: 'Community Kitchen Network',
      type: 'community-kitchen',
      location: 'Jayanagar, Bangalore',
      distance: '2.8 km',
      rating: 4.7,
      capacity: '200+ meals daily',
      openHours: '10 AM - 9 PM',
      contact: '+91 98765 43213',
      verified: true,
      lastActive: '30 minutes ago',
      specialties: ['Bulk Cooking', 'Festival Meals'],
    },
  ];

  const typeFilters = [
    { key: 'all', label: 'All Types', icon: '🏠' },
    { key: 'ngo', label: 'NGOs', icon: '🤝' },
    { key: 'shelter', label: 'Shelters', icon: '🏠' },
    { key: 'orphanage', label: 'Orphanages', icon: '👶' },
    { key: 'old-age-home', label: 'Old Age Homes', icon: '👴' },
    { key: 'community-kitchen', label: 'Community Kitchens', icon: '🍽️' },
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      ngo: '🤝',
      shelter: '🏠',
      orphanage: '👶',
      'old-age-home': '👴',
      'community-kitchen': '🍽️',
    };
    return icons[type as keyof typeof icons] || '🏠';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      ngo: 'bg-primary-100 text-primary-800 border-primary-200',
      shelter: 'bg-secondary-100 text-secondary-800 border-secondary-200',
      orphanage: 'bg-accent-100 text-accent-800 border-accent-200',
      'old-age-home': 'bg-success-100 text-success-800 border-success-200',
      'community-kitchen': 'bg-warning-100 text-warning-800 border-warning-200',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredDropPoints = dropPoints.filter(point => 
    selectedType === 'all' || point.type === selectedType
  );

  const sortedDropPoints = [...filteredDropPoints].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'rating':
        return b.rating - a.rating;
      case 'capacity':
        return parseInt(b.capacity) - parseInt(a.capacity);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Local Drop Points
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find verified NGOs, shelters, and community kitchens near you for direct food delivery
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedType(filter.key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedType === filter.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20'
                  }`}
                >
                  <span>{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="capacity">Capacity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Drop Points Grid */}
        <div className="grid gap-6">
          {sortedDropPoints.map((point) => (
            <div
              key={point.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {point.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(point.type)}`}>
                          {getTypeIcon(point.type)} {point.type.replace('-', ' ')}
                        </span>
                        {point.verified && (
                          <span className="bg-success-100 text-success-800 px-2 py-1 rounded-full text-xs font-medium border border-success-200">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{point.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Navigation className="h-4 w-4" />
                          <span>{point.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-accent-500" />
                          <span>{point.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{point.capacity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hours</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {point.openHours}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Active</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{point.lastActive}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {point.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-md text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3 lg:ml-6 lg:min-w-0 lg:w-48">
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Open Google Maps directions
                      const encodedLocation = encodeURIComponent(point.location);
                      window.open(`https://maps.google.com/?q=${encodedLocation}`, '_blank');
                    }}
                    fullWidth
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={() => {
                      // Open phone dialer
                      window.open(`tel:${point.contact}`, '_self');
                    }}
                    fullWidth
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Notify in advance functionality
                      console.log('Notify in advance:', point.id);
                    }}
                    fullWidth
                  >
                    Notify in Advance
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map View Toggle */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => {
              // Toggle map view
              console.log('Toggle map view');
            }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropPoints;
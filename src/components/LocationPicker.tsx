import React, { useState, useEffect } from 'react';
import { MapPin, Target, Search } from 'lucide-react';
import Button from './Button';

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; coordinates: { lat: number; lng: number } }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock location suggestions - in a real app, use Google Places API
  const mockSuggestions = [
    'Koramangala, Bangalore, Karnataka',
    'Indiranagar, Bangalore, Karnataka',
    'BTM Layout, Bangalore, Karnataka',
    'Whitefield, Bangalore, Karnataka',
    'Electronic City, Bangalore, Karnataka',
  ];

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          
          // Mock reverse geocoding - in a real app, use Google Geocoding API
          const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (GPS Location)`;
          setAddress(mockAddress);
          
          onLocationSelect({
            address: mockAddress,
            coordinates: { lat: latitude, lng: longitude }
          });
          
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    
    // Filter suggestions based on input
    if (value.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
    
    // Mock geocoding - in a real app, use Google Geocoding API
    const mockCoordinates = { lat: 12.9716 + Math.random() * 0.1, lng: 77.5946 + Math.random() * 0.1 };
    setCoordinates(mockCoordinates);
    
    onLocationSelect({
      address: suggestion,
      coordinates: mockCoordinates
    });
  };

  const handleManualSubmit = () => {
    if (address.trim()) {
      // Mock geocoding for manual address
      const mockCoordinates = { lat: 12.9716 + Math.random() * 0.1, lng: 77.5946 + Math.random() * 0.1 };
      setCoordinates(mockCoordinates);
      
      onLocationSelect({
        address: address.trim(),
        coordinates: mockCoordinates
      });
      
      setSuggestions([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
      </div>

      {/* GPS Location Button */}
      <Button
        onClick={getCurrentLocation}
        variant="secondary"
        fullWidth
        isLoading={isLoadingLocation}
        loadingText="Getting your location..."
      >
        <Target className="h-4 w-4 mr-2" />
        Use Current Location (GPS)
      </Button>

      <div className="text-center text-gray-500 dark:text-gray-400">
        <span className="text-sm">or</span>
      </div>

      {/* Manual Address Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="Enter your address manually"
            className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Address Suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {address && !suggestions.length && (
        <Button
          onClick={handleManualSubmit}
          variant="outline"
          fullWidth
        >
          Confirm Address
        </Button>
      )}

      {/* Location Preview */}
      {coordinates && (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-primary-800 dark:text-primary-300">Selected Location</h4>
              <p className="text-primary-700 dark:text-primary-400 text-sm mt-1">{address}</p>
              <p className="text-primary-600 dark:text-primary-500 text-xs mt-1">
                Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Interactive map will be displayed here
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Google Maps integration required
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
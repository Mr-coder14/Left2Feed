import React, { useState } from 'react';
import { Users, Bike, Clock, MapPin, Heart, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import FormField from '../components/FormField';

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    volunteerType: '',
    availability: '',
    experience: '',
    motivation: '',
    hasVehicle: false,
    agreeToTerms: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const volunteerTypes = [
    {
      id: 'pickup',
      title: 'Pickup Volunteer',
      icon: <Bike className="h-8 w-8" />,
      description: 'Help collect food from donors and deliver to NGOs',
      requirements: ['Own vehicle (bike/car)', 'Available 2-3 hours/week', 'Local area knowledge']
    },
    {
      id: 'coordinator',
      title: 'Community Coordinator',
      icon: <Users className="h-8 w-8" />,
      description: 'Coordinate between donors and receivers in your area',
      requirements: ['Good communication skills', 'Available 3-4 hours/week', 'Local network']
    },
    {
      id: 'emergency',
      title: 'Emergency Responder',
      icon: <Clock className="h-8 w-8" />,
      description: 'Available for urgent food rescue situations',
      requirements: ['Flexible schedule', 'Quick response capability', 'Reliable transport']
    },
    {
      id: 'outreach',
      title: 'Outreach Volunteer',
      icon: <Heart className="h-8 w-8" />,
      description: 'Help spread awareness and onboard new users',
      requirements: ['Social media savvy', 'Community connections', 'Passion for the cause']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
          <CheckCircle className="h-16 w-16 text-success-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You for Volunteering! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your application has been received. Our team will contact you within 24-48 hours 
            to discuss next steps and provide volunteer training.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            variant="primary"
            fullWidth
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Become a Volunteer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join our community of food heroes and help us rescue meals while building connections in your neighborhood
          </p>
        </div>

        {/* Volunteer Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Choose Your Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {volunteerTypes.map((type) => (
              <div
                key={type.id}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  formData.volunteerType === type.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, volunteerType: type.id }))}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-primary-600 flex-shrink-0">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {type.description}
                    </p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Requirements:
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {type.requirements.map((req, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-primary-600 rounded-full mr-2"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Volunteer Application
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Full Name" required>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </FormField>

              <FormField label="Email Address" required>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Phone Number" required>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </FormField>

              <FormField label="Location" required>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Your city/area"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </FormField>
            </div>

            <FormField label="Availability" required>
              <select
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select your availability</option>
                <option value="weekdays">Weekdays (Mon-Fri)</option>
                <option value="weekends">Weekends (Sat-Sun)</option>
                <option value="evenings">Evenings (6-9 PM)</option>
                <option value="flexible">Flexible schedule</option>
                <option value="emergency">Emergency response only</option>
              </select>
            </FormField>

            <FormField label="Previous Experience" helpText="Any relevant volunteer or community service experience">
              <textarea
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Tell us about your previous volunteer experience..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
              />
            </FormField>

            <FormField label="Why do you want to volunteer?" required>
              <textarea
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="Share your motivation for joining Left2Feed..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
                required
              />
            </FormField>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasVehicle"
                checked={formData.hasVehicle}
                onChange={(e) => setFormData(prev => ({ ...prev, hasVehicle: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="hasVehicle" className="text-sm text-gray-700 dark:text-gray-300">
                I have access to a vehicle (bike/car) for pickup activities
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the volunteer terms and conditions, and understand that I will receive 
                training before starting volunteer activities
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              loadingText="Submitting application..."
            >
              Submit Volunteer Application
            </Button>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-3 text-accent-300" />
              <h3 className="font-semibold mb-2">Make Real Impact</h3>
              <p className="text-primary-100 text-sm">
                Directly contribute to reducing food waste and feeding communities
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-accent-300" />
              <h3 className="font-semibold mb-2">Build Community</h3>
              <p className="text-primary-100 text-sm">
                Connect with like-minded people and strengthen local networks
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-accent-300" />
              <h3 className="font-semibold mb-2">Gain Experience</h3>
              <p className="text-primary-100 text-sm">
                Develop skills in logistics, community outreach, and social impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
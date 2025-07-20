import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, Phone, Mail, MapPin, Camera, Upload, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import FormField from '../components/FormField';
import LocationPicker from '../components/LocationPicker';

const ProfileSetup: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    organizationName: '',
    category: '',
    location: {
      address: '',
      coordinates: { lat: 0, lng: 0 }
    },
    profilePicture: null as File | null,
    documents: [] as File[],
  });

  const [step, setStep] = useState(1);
  const totalSteps = user?.role === 'receiver' ? 3 : 2;

  const categories = [
    { value: 'ngo', label: 'NGO', icon: '🤝' },
    { value: 'orphanage', label: 'Orphanage', icon: '👶' },
    { value: 'old-age-home', label: 'Old Age Home', icon: '👴' },
    { value: 'shelter', label: 'Shelter', icon: '🏠' },
    { value: 'volunteer-group', label: 'Volunteer Group', icon: '👥' },
    { value: 'community-kitchen', label: 'Community Kitchen', icon: '🍽️' },
  ];

  const handleLocationSelect = (location: { address: string; coordinates: { lat: number; lng: number } }) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleFileUpload = (files: FileList | null, type: 'profile' | 'documents') => {
    if (!files) return;
    
    if (type === 'profile') {
      setFormData(prev => ({ ...prev, profilePicture: files[0] }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        documents: [...prev.documents, ...Array.from(files)] 
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        organizationName: formData.organizationName || undefined,
        category: formData.category as any || undefined,
        location: formData.location.address ? formData.location : undefined,
        // In a real app, you'd upload files to cloud storage first
        profilePicture: formData.profilePicture ? 'uploaded-profile-pic-url' : undefined,
        documents: formData.documents.length > 0 ? ['uploaded-doc-1', 'uploaded-doc-2'] : undefined,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile setup failed:', error);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
            <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-primary-100">Help us personalize your Left2Feed experience</p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-primary-700 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                  <p className="text-gray-600 dark:text-gray-300">Tell us about yourself</p>
                </div>

                <FormField label="Full Name" required>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </FormField>

                <FormField label="Phone Number" required>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </FormField>

                <FormField label="Email Address" required>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </FormField>

                {user?.role === 'donor' && (
                  <FormField label="Organization Name" helpText="Optional - if you're representing an organization">
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                        placeholder="e.g., ABC Catering Services"
                        className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </FormField>
                )}

                {/* Profile Picture Upload */}
                <FormField label="Profile Picture" helpText="Optional - helps build trust in the community">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                      {formData.profilePicture ? (
                        <img 
                          src={URL.createObjectURL(formData.profilePicture)} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files, 'profile')}
                        className="hidden"
                        id="profile-upload"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="cursor-pointer bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Choose Photo
                      </label>
                    </div>
                  </div>
                </FormField>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Information</h2>
                  <p className="text-gray-600 dark:text-gray-300">Help us connect you with nearby opportunities</p>
                </div>

                <LocationPicker onLocationSelect={handleLocationSelect} />
              </div>
            )}

            {/* Step 3: Organization Details (Receivers only) */}
            {step === 3 && user?.role === 'receiver' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Building className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Organization Details</h2>
                  <p className="text-gray-600 dark:text-gray-300">Help us verify your organization</p>
                </div>

                <FormField label="Organization Name" required>
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                    placeholder="Enter organization name"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </FormField>

                <FormField label="Organization Category" required>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                          formData.category === category.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xl mb-1">{category.icon}</div>
                          <div className="text-sm font-medium">{category.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </FormField>

                <FormField label="Verification Documents" helpText="Upload registration certificate, tax exemption, etc.">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Click to upload or drag & drop documents
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files, 'documents')}
                      className="hidden"
                      id="documents-upload"
                    />
                    <label
                      htmlFor="documents-upload"
                      className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Choose Files
                    </label>
                    
                    {formData.documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.documents.map((file, index) => (
                          <div key={index} className="text-sm text-gray-600 dark:text-gray-300">
                            📄 {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={step === 1}
              >
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                variant="primary"
                isLoading={isLoading}
                loadingText={step === totalSteps ? "Setting up..." : "Next"}
              >
                {step === totalSteps ? 'Complete Setup' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
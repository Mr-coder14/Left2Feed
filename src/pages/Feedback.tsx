import React, { useState } from 'react';
import { MessageSquare, Star, Bug, Lightbulb, Heart, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import FormField from '../components/FormField';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    type: '',
    rating: 0,
    subject: '',
    message: '',
    email: '',
    anonymous: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'general',
      title: 'General Feedback',
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Share your overall experience with Left2Feed'
    },
    {
      id: 'bug',
      title: 'Report a Bug',
      icon: <Bug className="h-6 w-6" />,
      description: 'Found something that\'s not working correctly?'
    },
    {
      id: 'feature',
      title: 'Feature Request',
      icon: <Lightbulb className="h-6 w-6" />,
      description: 'Suggest new features or improvements'
    },
    {
      id: 'appreciation',
      title: 'Appreciation',
      icon: <Heart className="h-6 w-6" />,
      description: 'Share positive feedback or success stories'
    }
  ];

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

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
            Thank You for Your Feedback! 🙏
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your feedback helps us improve Left2Feed and serve the community better. 
            We'll review your submission and get back to you if needed.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                type: '',
                rating: 0,
                subject: '',
                message: '',
                email: '',
                anonymous: false,
              });
            }}
            variant="primary"
            fullWidth
          >
            Submit More Feedback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <MessageSquare className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Help us improve Left2Feed by sharing your thoughts, reporting issues, or suggesting new features
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type Selection */}
            <FormField label="What type of feedback do you have?" required>
              <div className="grid md:grid-cols-2 gap-4">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.type === type.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-primary-600 flex-shrink-0 mt-1">
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </FormField>

            {/* Rating */}
            {(formData.type === 'general' || formData.type === 'appreciation') && (
              <FormField label="How would you rate your experience?" required>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`p-1 transition-colors duration-200 ${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                  {formData.rating > 0 && (
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {formData.rating} out of 5 stars
                    </span>
                  )}
                </div>
              </FormField>
            )}

            {/* Subject */}
            <FormField label="Subject" required>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief summary of your feedback"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </FormField>

            {/* Message */}
            <FormField label="Your Message" required>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder={
                  formData.type === 'bug' 
                    ? 'Please describe the issue you encountered, including steps to reproduce it...'
                    : formData.type === 'feature'
                    ? 'Describe the feature you\'d like to see and how it would help...'
                    : 'Share your detailed feedback...'
                }
                rows={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
                required
              />
            </FormField>

            {/* Email */}
            <FormField label="Email Address" helpText="We'll use this to follow up if needed">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                disabled={formData.anonymous}
              />
            </FormField>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  anonymous: e.target.checked,
                  email: e.target.checked ? '' : prev.email
                }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                Submit feedback anonymously (we won't be able to follow up)
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              loadingText="Submitting feedback..."
            >
              Submit Feedback
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-300 mb-3">
            Other Ways to Reach Us
          </h3>
          <div className="space-y-2 text-sm text-primary-700 dark:text-primary-400">
            <p>📧 Email: feedback@left2feed.com</p>
            <p>📱 WhatsApp: +91 88001 23456</p>
            <p>🐦 Twitter: @left2feed</p>
            <p>💬 Live Chat: Available 9 AM - 6 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MapPin, Clock, Shield, Smartphone, Heart, Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import StatsSection from '../components/StatsSection';
import FeatureCard from '../components/FeatureCard';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wedding Organizer",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Left2Feed helped us share food from our daughter's wedding with 5 local NGOs. Instead of wasting 200+ plates, we fed families in need. The app made it so simple!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Restaurant Owner",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "As a restaurant owner, I was throwing away good food daily. Now I list surplus food every evening and it gets picked up within hours. It's become part of our routine.",
      rating: 5
    },
    {
      name: "Sister Mary",
      role: "Hope Children's Home",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Left2Feed has been a blessing for our shelter. We receive fresh, nutritious meals regularly, and the donors are so caring. It's more than food - it's hope and community.",
      rating: 5
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Turning Extra Meals into
              <span className="block text-accent-300 animate-bounce-gentle">Extra Smiles</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/list-food"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <span>{t('startSharing')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/food-feed"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                {t('findFoodToClaim')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Heart className="h-16 w-16 animate-bounce-gentle" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Users className="h-20 w-20 animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Left2Feed Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, smart, and secure food redistribution powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Smartphone className="h-8 w-8" />}
              title="List in Seconds"
              description="Quick mobile-optimized form with AI-powered expiry prediction and automatic location detection"
              color="primary"
            />
            <FeatureCard
              icon={<MapPin className="h-8 w-8" />}
              title="Smart Matching"
              description="AI connects your food with nearby verified NGOs and shelters based on location and capacity"
              color="secondary"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Real-time Updates"
              description="Instant notifications via WhatsApp, SMS, and push alerts for time-sensitive food rescue"
              color="accent"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Verified Recipients"
              description="All NGOs and shelters are thoroughly verified to ensure food reaches legitimate organizations"
              color="success"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Community Impact"
              description="Track your impact with detailed stats and join a community of food waste warriors"
              color="warning"
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8" />}
              title="Night & Self-Drop"
              description="Special modes for after-hours pickup and direct delivery to local verified drop points"
              color="error"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real Stories, Real Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our community members who are making a difference every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="h-6 w-6 text-primary-300 absolute -top-2 -left-1" />
                  <p className="text-gray-600 dark:text-gray-300 italic pl-6">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Every meal saved is a step towards a hunger-free community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('startSharing')}
            </Link>
            <Link
              to="/volunteer"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
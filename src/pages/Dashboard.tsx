import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Heart, MapPin, Clock, TrendingUp, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActivityFeed from '../components/ActivityFeed';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your dashboard
          </h2>
        </div>
      </div>
    );
  }

  const donorStats = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Meals Shared',
      value: '247',
      change: '+23 this month',
      color: 'primary' as const,
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'People Fed',
      value: '1,234',
      change: '+156 this month',
      color: 'success' as const,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'NGOs Helped',
      value: '18',
      change: '+3 this month',
      color: 'secondary' as const,
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Impact Score',
      value: '8.9/10',
      change: '+0.5 this month',
      color: 'accent' as const,
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'donation',
      title: 'Lemon Rice & Sambar shared',
      description: '25 servings picked up by Helping Hands NGO',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'donation',
      title: 'Wedding leftovers listed',
      description: '100 servings available for pickup',
      time: '1 day ago',
      status: 'claimed',
    },
    {
      id: '3',
      type: 'badge',
      title: 'New badge earned!',
      description: 'Hunger Hero - Fed 1000+ people',
      time: '2 days ago',
      status: 'achievement',
    },
    {
      id: '4',
      type: 'donation',
      title: 'Desserts shared',
      description: '15 servings picked up by City Shelter',
      time: '3 days ago',
      status: 'completed',
    },
  ];

  const badges = [
    { name: 'First Timer', icon: '🎯', earned: true },
    { name: 'Hunger Hero', icon: '🦸', earned: true },
    { name: 'Night Rescuer', icon: '🌙', earned: true },
    { name: 'Community Champion', icon: '👑', earned: false },
    { name: 'Waste Warrior', icon: '⚔️', earned: false },
    { name: 'Food Angel', icon: '😇', earned: false },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {user.role === 'donor' 
              ? "Here's how you're making a difference in your community"
              : user.role === 'receiver'
              ? "Track your organization's food rescue activities"
              : "System overview and administrative controls"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {donorStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <ActivityFeed activities={recentActivity} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-accent-500" />
                Your Badges
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 rounded-lg transition-all duration-200 ${
                      badge.earned 
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800'
                        : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className={`text-xs font-medium ${
                      badge.earned ? 'text-primary-700 dark:text-primary-300' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200 border border-primary-200 dark:border-primary-800">
                  <div className="font-medium text-primary-700 dark:text-primary-300">List New Food</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400">Share surplus food with community</div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg bg-secondary-50 dark:bg-secondary-900/20 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200 border border-secondary-200 dark:border-secondary-800">
                  <div className="font-medium text-secondary-700 dark:text-secondary-300">Find Drop Points</div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400">Locate nearby verified centers</div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg bg-accent-50 dark:bg-accent-900/20 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors duration-200 border border-accent-200 dark:border-accent-800">
                  <div className="font-medium text-accent-700 dark:text-accent-300">View Food Feed</div>
                  <div className="text-sm text-accent-600 dark:text-accent-400">See what's available near you</div>
                </button>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">This Month's Impact</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-primary-100">CO₂ Saved:</span>
                  <span className="font-bold">127 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-100">Water Saved:</span>
                  <span className="font-bold">2,340 L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-100">Community Rank:</span>
                  <span className="font-bold">#23</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
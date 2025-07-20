import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Users, AlertTriangle, TrendingUp, CheckCircle, X, Eye } from 'lucide-react';
import Button from '../components/Button';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'ngo-approvals' | 'flagged-content' | 'metrics'>('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Total NGOs', value: '2,341', change: '+23', color: 'primary' },
    { title: 'Pending Approvals', value: '47', change: '+12', color: 'warning' },
    { title: 'Flagged Content', value: '8', change: '-3', color: 'error' },
    { title: 'Active Listings', value: '156', change: '+34', color: 'success' },
  ];

  const pendingNGOs = [
    {
      id: '1',
      name: 'Hope Foundation',
      location: 'Mumbai, Maharashtra',
      contact: 'contact@hopefoundation.org',
      documents: ['registration.pdf', 'tax-exemption.pdf'],
      submittedAt: '2024-12-18',
    },
    {
      id: '2',
      name: 'City Shelter Trust',
      location: 'Delhi, India',
      contact: 'admin@cityshelter.org',
      documents: ['ngo-certificate.pdf', 'annual-report.pdf'],
      submittedAt: '2024-12-17',
    },
  ];

  const flaggedContent = [
    {
      id: '1',
      type: 'listing',
      title: 'Suspicious food listing',
      description: 'Large quantity claimed multiple times',
      reporter: 'System AI',
      severity: 'high',
      submittedAt: '2024-12-19',
    },
    {
      id: '2',
      type: 'user',
      title: 'Fake NGO registration attempt',
      description: 'Invalid documents provided',
      reporter: 'Manual Review',
      severity: 'medium',
      submittedAt: '2024-12-18',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'ngo-approvals', label: 'NGO Approvals', icon: <Users className="h-4 w-4" /> },
    { id: 'flagged-content', label: 'Flagged Content', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'metrics', label: 'Metrics', icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-primary-600" />
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            System administration and content moderation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </p>
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-success-600' : 'text-error-600'
              }`}>
                {stat.change} this week
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                System Overview
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">New NGO registration</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Food listing flagged</span>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">System backup completed</span>
                      <span className="text-xs text-gray-500">6 hours ago</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth>
                      Generate Weekly Report
                    </Button>
                    <Button variant="secondary" fullWidth>
                      Export User Data
                    </Button>
                    <Button variant="outline" fullWidth>
                      System Health Check
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ngo-approvals' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                NGO Registration Approvals
              </h2>
              <div className="space-y-4">
                {pendingNGOs.map((ngo) => (
                  <div key={ngo.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{ngo.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{ngo.location}</p>
                        <p className="text-sm text-gray-500">{ngo.contact}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        Submitted: {ngo.submittedAt}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Documents:
                      </h4>
                      <div className="flex space-x-2">
                        {ngo.documents.map((doc, index) => (
                          <button
                            key={index}
                            className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded flex items-center space-x-1"
                          >
                            <Eye className="h-3 w-3" />
                            <span>{doc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="primary" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button variant="ghost" size="sm">
                        Request More Info
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'flagged-content' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Flagged Content Review
              </h2>
              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.severity === 'high' 
                              ? 'bg-error-100 text-error-800'
                              : 'bg-warning-100 text-warning-800'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Reported by: {item.reporter}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.submittedAt}
                      </span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="primary" size="sm">
                        Review
                      </Button>
                      <Button variant="secondary" size="sm">
                        Take Action
                      </Button>
                      <Button variant="ghost" size="sm">
                        Mark Safe
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Platform Metrics
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Food Distribution
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Meals saved this month:</span>
                      <span className="font-semibold">23,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average pickup time:</span>
                      <span className="font-semibold">12 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success rate:</span>
                      <span className="font-semibold">94.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    User Engagement
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Daily active users:</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New registrations:</span>
                      <span className="font-semibold">+156 this week</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retention rate:</span>
                      <span className="font-semibold">78.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
import React from 'react';
import { Clock, CheckCircle, Trophy, Heart } from 'lucide-react';

interface Activity {
  id: string;
  type: 'donation' | 'badge' | 'pickup' | 'claim';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'claimed' | 'pending' | 'achievement';
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case 'badge':
        return <Trophy className="h-5 w-5 text-accent-500" />;
      case 'donation':
        return status === 'completed' 
          ? <CheckCircle className="h-5 w-5 text-success-500" />
          : <Heart className="h-5 w-5 text-primary-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-success-100 text-success-800 border-success-200',
      claimed: 'bg-warning-100 text-warning-800 border-warning-200',
      pending: 'bg-gray-100 text-gray-800 border-gray-200',
      achievement: 'bg-accent-100 text-accent-800 border-accent-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges] || badges.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type, activity.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h4>
                  {getStatusBadge(activity.status)}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {activity.description}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
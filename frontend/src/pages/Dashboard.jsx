import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import toast from 'react-hot-toast';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoadingStats(true);
      const response = await userAPI.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Fetch stats error:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVerificationStatus = () => {
    if (user?.isVerified) {
      return { text: 'Fully Verified', color: 'green', icon: ShieldCheckIcon };
    } else {
      return { text: 'Pending Verification', color: 'yellow', icon: ClockIcon };
    }
  };

  const verificationStatus = getVerificationStatus();
  const StatusIcon = verificationStatus.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your account and view your activity
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-6">
              <Alert 
                type="error" 
                message={error}
                onClose={() => setError('')}
              />
            </div>
          )}

          {/* Account Status */}
          <div className="mb-6">
            <div className={`rounded-lg border-2 ${
              verificationStatus.color === 'green' 
                ? 'border-green-200 bg-green-50' 
                : 'border-yellow-200 bg-yellow-50'
            } p-4`}>
              <div className="flex items-center">
                <StatusIcon className={`h-8 w-8 ${
                  verificationStatus.color === 'green' ? 'text-green-600' : 'text-yellow-600'
                }`} />
                <div className="ml-3">
                  <h3 className={`text-lg font-medium ${
                    verificationStatus.color === 'green' ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {verificationStatus.text}
                  </h3>
                  <p className={`text-sm ${
                    verificationStatus.color === 'green' ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {user?.isVerified 
                      ? 'Your account is fully verified and active.'
                      : 'Complete verification to access all features.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {isLoadingStats ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : stats && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {/* Profile Completeness */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ChartBarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Profile Completeness
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stats.profileCompleteness}%
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Status */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className={`h-6 w-6 ${
                        stats.isFullyVerified ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Email Status
                        </dt>
                        <dd className={`text-lg font-medium ${
                          stats.isFullyVerified ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stats.isFullyVerified ? 'Verified' : 'Unverified'}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Information */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Account Information
                </h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Account role</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Account Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Account Activity
                </h3>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <dt className="text-sm font-medium text-gray-500">Account created</dt>
                    </div>
                    <dd className="text-sm text-gray-900">
                      {stats?.accountCreated ? formatDate(stats.accountCreated) : 'N/A'}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <dt className="text-sm font-medium text-gray-500">Last login</dt>
                    </div>
                    <dd className="text-sm text-gray-900">
                      {stats?.lastLogin ? formatDate(stats.lastLogin) : 'First time login'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {!user?.isVerified && (
                    <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <div className="flex-shrink-0">
                        <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">Verify Email</p>
                        <p className="text-sm text-gray-500">Complete email verification</p>
                      </div>
                    </button>
                  )}
                  


                  <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <div className="flex-shrink-0">
                      <CogIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">Account Settings</p>
                      <p className="text-sm text-gray-500">Update your preferences</p>
                    </div>
                  </button>

                  <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">Edit Profile</p>
                      <p className="text-sm text-gray-500">Update your information</p>
                    </div>
                  </button>
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

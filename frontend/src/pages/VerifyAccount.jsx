import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const VerifyAccount = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;





  const handleResendVerificationEmail = async () => {
    if (!email) {
      toast.error('Email address is required');
      return;
    }

    try {
      await authAPI.resendVerification(email);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send verification email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-yellow-500 rounded-xl flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Check your email and click the verification link to activate your account
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Verification */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                emailVerified ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {emailVerified ? (
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">Email Verification</h3>
                <p className="text-sm text-gray-500">
                  {emailVerified 
                    ? 'Your email has been verified successfully!'
                    : 'Check your email for a verification link'
                  }
                </p>
              </div>
              {emailVerified && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                </div>
              )}
            </div>
            {!emailVerified && (
              <div className="mt-4">
                <button
                  onClick={handleResendVerificationEmail}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Resend verification email
                </button>
              </div>
            )}
          </div>



          {error && (
            <Alert 
              type="error" 
              message={error}
              onClose={() => setError('')}
            />
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Next Steps
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Click the verification link in your email to activate your account and access the dashboard.</p>
                  <p className="mt-1">Don't see the email? Check your spam folder or click "Resend verification email" above.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

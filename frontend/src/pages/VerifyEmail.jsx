import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    if (!token) {
      setError('Invalid verification link');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.verifyEmail(token);
      
      if (response.data.success) {
        setIsVerified(true);
        toast.success('Email verified successfully!');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Your account has been verified! Please login to continue.' 
            }
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setError(error.response?.data?.message || 'Email verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {isVerified ? (
            <>
              <div className="mx-auto h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Email Verified!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Your account has been successfully verified. You will be redirected to the login page shortly.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Go to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto h-12 w-12 bg-red-500 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Verification Failed
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                The verification link is invalid or has expired.
              </p>
              {error && (
                <div className="mt-4">
                  <Alert 
                    type="error" 
                    message={error}
                  />
                </div>
              )}
              <div className="mt-6 space-y-3">
                <Link
                  to="/verify-account"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Resend Verification Email
                </Link>
                <div>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

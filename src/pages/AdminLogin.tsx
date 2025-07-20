import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import FormField from '../components/FormField';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (error) {
      console.error('Admin login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-center border-b border-gray-600">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
            <p className="text-gray-300">Secure administrative portal</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Admin Email">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@left2feed.com"
                  className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-700 text-white placeholder-gray-400"
                  required
                />
              </FormField>

              <FormField label="Password">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter admin password"
                    className="w-full p-3 pr-10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-700 text-white placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </FormField>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                loadingText="Authenticating..."
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              >
                <Lock className="h-4 w-4 mr-2" />
                Secure Login
              </Button>
            </form>

            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <p className="text-yellow-300 text-xs text-center">
                ⚠️ This is a restricted area. All access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
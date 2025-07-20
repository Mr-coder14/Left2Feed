import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'List Food', path: '/list-food' },
    { label: 'Find Food', path: '/food-feed' },
    { label: 'Drop Points', path: '/drop-points' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Feedback', path: '/feedback' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Food Safety Guidelines', path: '/safety' },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: 'https://facebook.com/left2feed', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com/left2feed', label: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com/company/left2feed', label: 'LinkedIn' },
    { icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com/left2feed', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">Left2Feed</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Turning Extra Meals into Extra Smiles. Join our mission to eliminate food waste 
              and combat hunger through technology and compassion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a 
                    href="mailto:hello@left2feed.com" 
                    className="text-primary-400 hover:text-primary-300 text-sm"
                  >
                    hello@left2feed.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a 
                    href="tel:+918800123456" 
                    className="text-primary-400 hover:text-primary-300 text-sm"
                  >
                    +91 88001 23456
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-gray-400 text-sm">
                    123 Tech Park, Koramangala<br />
                    Bangalore, Karnataka 560034<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">24/7 Emergency Support</h4>
              <p className="text-gray-400 text-xs mb-2">
                For urgent food rescue situations
              </p>
              <a 
                href="tel:+919876543210" 
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Left2Feed. All rights reserved. Made with ❤️ for a hunger-free world.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🌱 Carbon Neutral Platform</span>
              <span>🔒 SSL Secured</span>
              <span>✅ Verified NGOs</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Left2Feed is committed to the UN Sustainable Development Goals 2 (Zero Hunger) and 12 (Responsible Consumption)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
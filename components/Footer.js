import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8">
      <footer 
        className="max-w-7xl mx-auto py-20 px-8 sm:px-12 lg:px-16 relative rounded-3xl min-h-[700px] flex flex-col justify-between"
        style={{
          backgroundImage: 'url(/images/footerimg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
      <div className="max-w-7xl mx-auto">
        {/* Get Started Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-0">
            Get started today
          </h2>
          <button 
            className="flex items-center gap-2 px-8 py-3 font-semibold text-white transition-all cursor-pointer hover:opacity-90"
            style={{ backgroundColor: '#0A4D91' }}
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Logo and Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 items-center">
          {/* Left: Logo, Clever, CLEE and Description */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <div className="flex flex-col items-center">
              <img 
                src="/images/logoicon.png" 
                alt="Clee Logo" 
                className="h-32 w-auto mb-2"
              />
              <p className="text-sm text-gray-400">Clever</p>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-6xl font-bold text-white tracking-wider mb-6">CLEE</h3>
              <p className="text-gray-300 text-sm text-center lg:text-left">
                Get started with smarter,<br />
                efficient booking system.
              </p>
            </div>
          </div>

          {/* Center: Contact Us */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>25 Bay Street Sydney 200</p>
              <p>support@cleverclee.com</p>
            </div>
          </div>

          {/* Right: Stay Up to date */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 text-center lg:text-left">Stay Up to date</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="📧 Enter your email address"
                className="flex-1 px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button 
                className="px-8 py-3 font-semibold text-white transition-all cursor-pointer hover:opacity-90"
                style={{ backgroundColor: '#0A4D91' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6 text-gray-300 text-sm">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Style Guide</a>
            <a href="#" className="hover:text-white transition-colors">Licenses</a>
            <a href="#" className="hover:text-white transition-colors">Instruction</a>
          </div>

         
          <p className="text-gray-400 text-sm text-center lg:text-left">
            © 2026 Cleverclee. All Rights Reserved by Floeye.
          </p>
        </div>
      </div>
      </footer>
    </div>
  );
};

export default Footer;

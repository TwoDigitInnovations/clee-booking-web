import React, { useState } from 'react';
import { Calendar, TrendingUp, Zap, Target } from 'lucide-react';

const PurposeBuiltSection = () => {
  const [activeTab, setActiveTab] = useState('booking');

  const tabs = [
    { id: 'booking', label: 'Booking System', Icon: Calendar },
    { id: 'marketing', label: 'Pre-Built Marketing', Icon: TrendingUp },
    { id: 'slot', label: 'Last-Minute Slot Engine', Icon: Zap },
    { id: 'rules', label: 'Smart Booking Rules', Icon: Target }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Purpose-Built Solutions for
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0A4D91' }}>
          Beauty & Wellness
        </h3>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          Streamline payments, reduce risk, and deliver audit-ready insights with enterprise
          grade security. Empowering finance teams with automation.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {tabs.map((tab) => {
            const IconComponent = tab.Icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium ${
                  activeTab === tab.id
                    ? 'bg-[#0A4D91] text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0A4D91]'
                }`}
              >
                <span className="bg-black text-white p-1.5 rounded">
                  <IconComponent size={18} />
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto">
        <div 
          className="rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden"
          style={{
            backgroundImage: 'url(/images/imgg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Smart Booking That Run Themselves
              </h3>
              
              <p className="text-gray-700 text-sm sm:text-base">
                A complete booking system designed for speed, flexibility, and zero admin.
                clients book, deposits clear, reminders send -automatically.
              </p>

              <div className="space-y-3">
                <div 
                  className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-white text-sm sm:text-base font-medium"
                  style={{ backgroundColor: '#0A4D91' }}
                >
                  <span className="text-lg">✓</span>
                  <span>Online bookings with flexible deposits</span>
                </div>
                
                <div 
                  className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-white text-sm sm:text-base font-medium"
                  style={{ backgroundColor: '#0A4D91' }}
                >
                  <span className="text-lg">✓</span>
                  <span>Pancake Packages: bundle service for higher spend</span>
                </div>
                
                <div 
                  className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-white text-sm sm:text-base font-medium"
                  style={{ backgroundColor: '#0A4D91' }}
                >
                  <span className="text-lg">✓</span>
                  <span>Waitlist Auto Fill system</span>
                </div>
              </div>
            </div>

            {/* Right Dashboard Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg">
                <img 
                  src="/images/dash1.png" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurposeBuiltSection;

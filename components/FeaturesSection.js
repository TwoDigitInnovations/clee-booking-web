import React from 'react';

const FeaturesSection = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Transform the Way You Run <br />
          <span style={{ color: '#0A4D91' }}>Your Beauty Business</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          Move to app-connected, goods financial technology, cloud-simple, streamlined platform — putting teams like Soda
          Elevate to operate faster, smarter, and with—tangible confidence.
        </p>
      </div>

      {/* Feature 1 - Image Right */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              One Booking System. Every Detail Handled.
            </h3>
            
            <p className="text-gray-700 text-sm sm:text-base">
              A single, intelligent layer that manages every booking, from first click through to payment, control, and
              scheduling.
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-gray-900">Key Benefits:</p>
              
              <div className="space-y-2">
                <p className="text-gray-700 text-sm sm:text-base flex items-start">
                  <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                  <span>Centralized dashboard for all payment flows</span>
                </p>
                <p className="text-gray-700 text-sm sm:text-base flex items-start">
                  <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                  <span>Automated reconciliation & settlement</span>
                </p>
                <p className="text-gray-700 text-sm sm:text-base flex items-start">
                  <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                  <span>Optimized performance for high-volume transactions</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <img 
              src="/images/clee1.png" 
              alt="Booking System Dashboard" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Feature 2 - Image Left */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Image */}
          <div>
            <img 
              src="/images/clee2.png" 
              alt="Last-Minute Slot Filling" 
              className="w-full h-auto rounded-2xl"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Last-Minute Slot Filling
            </h3>
            
            <p className="text-gray-700 text-sm sm:text-base">
              Convert downtime into profit, automatically notifying clients
              with the smartest campaign scheduler of offers as diary
              begins down.
            </p>

            <div className="space-y-2">
              <p className="text-gray-700 text-sm sm:text-base flex items-start">
                <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                <span>Fill cancellations in real-time slots</span>
              </p>
              <p className="text-gray-700 text-sm sm:text-base flex items-start">
                <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                <span>Optional incentives or none</span>
              </p>
              <p className="text-gray-700 text-sm sm:text-base flex items-start">
                <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                <span>No manual outreach</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3 - Image Right */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Built-In Marketing (Pre-Done)
            </h3>
            
            <p className="text-gray-700 text-sm sm:text-base">
              Launch promotions at scale, personalize outbound engagement,
              and tie revenue to campaigns—no external tools or
              fragile efforts.
            </p>

            <div className="space-y-2">
              <p className="text-gray-700 text-sm sm:text-base flex items-start">
                <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                <span>High-performing campaigns ready to activate</span>
              </p>
              <p className="text-gray-700 text-sm sm:text-base flex items-start">
                <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                <span>No copywriting required</span>
              </p>
              <p className="text-gray-700 text-sm sm:text-base flex items-start">
                <span className="mr-2 text-2xl font-bold" style={{ color: '#0A4D91' }}>•</span>
                <span>No agency needed</span>
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <img 
              src="/images/clee3.png" 
              alt="Built-In Marketing" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

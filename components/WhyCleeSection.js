import React from 'react';
import { Check } from 'lucide-react';

const WhyCleeSection = () => {
  const features = [
    {
      title: 'How Clee fills last-minute slots',
      description: 'When a slot opens, waitlisted clients can self-add instantly — freeing staff to execute it. If no waitlist, Clee broadcasts fills the gap with last-minute clients, payments at instant speed (no fuss, no manual posting, no chasing, no empty chairs).'
    },
    {
      title: 'Pre-Built Marketing Engine',
      description: 'Campaigns already written. Automated marketing flows. Timely follow-ups. Revenue-focused messaging — zero creative or agency, no setup required.'
    },
    {
      title: 'Pancake Packages',
      description: 'Earn more per visit with pre-structured packages — service bundles that increase value. Clients book package, service is delivered, discounting.'
    },
    {
      title: 'Smart Deposit System',
      description: 'Clients choose full payment, partial deposit, or minimum deposit. You set the structure, Clee handles it—no manual tracking, instant reconciliation, full calendar fills.'
    }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#9BD4F3' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Why Beauty Business
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: '#0A4D91' }}>
                Choose Clee
              </h3>
              <p className="text-gray-700 text-sm sm:text-base mt-4">
                Clee is the only platform built specifically for beauty and wellness businesses,
                which learns, built for high-performance beauty and wellness businesses,
                ready to scale.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-black text-white p-1.5 rounded mt-1 flex-shrink-0">
                      <Check size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <img 
                src="/images/clee4.png" 
                alt="Clee Dashboard" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyCleeSection;

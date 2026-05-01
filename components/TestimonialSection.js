import React from 'react';
import { CheckCircle } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          Trusted by Beauty & Wellness
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0A4D91' }}>
          Businesses That Grow
        </h3>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          See how Clee helps clinics, salons, and medium-to-enterprise, owner-led startups, and you-without-coding, perform much
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 shadow-xl">
          {/* Left - Image */}
          <div className="relative h-64 lg:h-auto lg:w-1/2 bg-white">
            <img 
              src="/images/boy.png" 
              alt="Client Testimonial" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="p-8 sm:p-12 flex flex-col justify-center lg:w-1/2" style={{ background: 'linear-gradient(to top, #e0f2fe 0%, #e0f2fe 20%, #ffffff 100%)' }}>
            <div className="mb-6">
              <img 
                src="/images/chleee.png" 
                alt="Chelse Clinic" 
                className="h-12 object-contain"
              />
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              Clee has been the best software we've used
              and the switch was seamless. It has every
              feature we actually needed — ones other
              platforms wouldn't build after years of
              feedback. Last-minute slots get filled
              automatically, we can create custom-brand
              packages, clients book themselves, clients pay
              packages on their own within the rules we set,
              and the marketplace has opened up a whole
              new revenue stream.
            </p>

            <div className="flex items-center gap-3">
              <img 
                src="/images/boy.png" 
                alt="Joe P" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-gray-900">Joe P.</p>
                <p className="text-sm text-gray-600">Clinic Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Outside Card */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <button 
            className="px-8 py-3 font-semibold text-white transition-all cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #1173D8 0%, #04294E 100%)' }}
            onClick={() => window.location.href = '/booking'}
          >
            Start a Free Trial
          </button>
          <button 
            className="px-8 py-3 font-semibold border-2 transition-all cursor-pointer hover:bg-gray-50"
            style={{ borderColor: '#0A4D91', color: '#0A4D91' }}
          >
            Request Private Walkthrough
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;

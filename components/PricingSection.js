import React from 'react';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Solo',
      description: 'For the solo operator. Just you, your clients, and a business you want to run beautifully on your own terms.',
      price: '89',
      period: '/month',
      features: [
        'One practitioner account',
        'Unlimited bookings, clients, and services',
        'Full financial protection layer',
        'Waitlist + last-minute engine',
        'Abandoned checkout recovery',
        'Pancake package upsells'
      ],
      buttonText: 'Get started',
      buttonStyle: 'border-2 text-[#0A4D91] bg-white hover:bg-gray-50',
      borderColor: '#0A4D91'
    },
    {
      name: 'Signature',
      subtitle: '(Featured tier)',
      description: 'For the business with a team behind it, a brand people recognize, and standards worth protecting. Where your name means something, and the operation behind it needs to match.',
      price: '179',
      period: '/month',
      features: [
        'Up to six practitioner accounts',
        'Everything in Solo, plus:',
        'Role-based staff permissions',
        'Staff time clock & timesheets',
        'Commission and performance tracking',
        'Contraindication blocking at the service level',
        'Priority support'
      ],
      buttonText: 'Start with signature',
      buttonStyle: 'bg-white text-[#0A4D91] hover:bg-gray-100',
      featured: true
    },
    {
      name: 'Scale',
      description: 'For the multi-location business and the growing brand. For the owner who is ready to run serious numbers without losing the feel of what she built.',
      price: '299+',
      period: '/month',
      features: [
        'Unlimited practitioner accounts',
        'Everything in Signature, plus:',
        'Multi-location management',
        'Advanced analytics and reporting',
        'Hands-on onboarding and training',
        'Priority support with a named account contact',
        'A plan tailored to your scale, structure, and team'
      ],
      buttonText: 'Contact sale',
      buttonStyle: 'border-2 text-[#0A4D91] bg-white hover:bg-gray-50',
      borderColor: '#0A4D91'
    }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Three tiers. <span style={{ color: '#0A4D91' }}>Honest pricing.</span>
        </h2>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Built to grow with you.
        </h3>
        <p className="text-gray-600 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed">
          Pick the tier that fits where you are right now. Every tier gives you the full Clee
          platform, so you are never locked out of a feature because of the plan you chose. The
          only thing that changes is the size of the business each tier is designed to hold.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-3xl p-8 h-full flex flex-col ${
              plan.featured
                ? 'bg-[#0A4D91] text-white shadow-2xl'
                : 'bg-white border-2'
            }`}
            style={!plan.featured ? { borderColor: plan.borderColor } : {}}
          >
            <div className="mb-6">
              <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-[#0A4D91]'}`}>
                {plan.name}
              </h3>
              {plan.subtitle && (
                <p className="text-sm text-white/90 mb-3">{plan.subtitle}</p>
              )}
              <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-white/90' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-xl font-semibold ${plan.featured ? 'text-white' : 'text-gray-700'}`}>$</span>
                <span className={`text-5xl sm:text-6xl font-bold ${plan.featured ? 'text-white' : 'text-gray-600'}`}>{plan.price}</span>
                <span className={`text-base ${plan.featured ? 'text-white' : 'text-gray-700'}`}>{plan.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div 
                    className={`flex-shrink-0 mt-0.5 rounded p-0.5 ${
                      plan.featured 
                        ? 'bg-white' 
                        : 'bg-[#0A4D91]'
                    }`}
                  >
                    <Check 
                      size={16} 
                      strokeWidth={3} 
                      className={plan.featured ? 'text-[#0A4D91]' : 'text-white'}
                    />
                  </div>
                  <span className={`text-sm leading-relaxed ${plan.featured ? 'text-white' : 'text-gray-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              className={`w-[60%] py-3.5 px-6 rounded-md font-semibold text-base transition-all ${plan.buttonStyle}`}
              style={!plan.featured ? { borderColor: plan.borderColor } : {}}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;

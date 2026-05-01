import React from 'react';
import Head from 'next/head';
import { Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PricingPage = () => {
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

  const coreFeatures = [
    'Online booking & client calendar',
    'Automated confirmations & reminders',
    'Waitlist auto-fill',
    'Abandoned checkout recovery',
    'Client profiles & visit history',
    'Pancake package upsells',
    'Customizable online booking (branding and photos)',
    'Upfront reminders & waivers',
    'Digital Consultation Forms'
  ];

  const premiumFeatures = [
    'Flexible deposit system',
    'Cancellation policy enforcement',
    'Late arrivals and no-show',
    'Pre-paid marketing campaigns',
    'Revenue tracking & weekly uploads',
    'Customizable campaigns (branding & targeting for each client)',
    'Staff oversight and role-based permissions (Signature and above)',
    'Built-in client management (folder)'
  ];

  return (
    <>
      <Head>
        <title>Pricing | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="w-full overflow-x-hidden bg-white">
        {/* Hero Section */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Three tiers. <span className="text-[#0A4D91]">Honest pricing.</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Built to grow with you.
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed px-4">
              Pick the tier that fits where you are right now. Every tier gives you the full Clee
              platform, so you are never locked out of a feature because of the plan you chose. The
              only thing that changes is the size of the business each tier is designed to hold.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start px-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-3xl p-6 sm:p-8 h-full flex flex-col ${
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
                  className={`w-full sm:w-[60%] py-3.5 px-6 rounded-md font-semibold text-base transition-all ${plan.buttonStyle}`}
                  style={!plan.featured ? { borderColor: plan.borderColor } : {}}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Full Platform Section */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A4D91] via-[#01203F] to-[#03172B]">
          <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
            <p className="text-white/80 text-sm sm:text-base font-semibold mb-3 uppercase tracking-wide">PRICING</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Every plan includes the full
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-[#FF1654]">platform.</span>
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Everything you have, access every tier.
            </p>
            <p className="text-white/90 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              One platform, but the features scale beautifully from your first booking to your hundredth team.
            </p>
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {/* Core Features */}
              <div>
                <h3 className="text-[#0A4D91] text-base sm:text-lg font-bold mb-6 uppercase tracking-wide">CORE FEATURES</h3>
                <div className="space-y-4">
                  {coreFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#0A4D91] flex items-center justify-center">
                          <Check size={14} strokeWidth={3} className="text-white" />
                        </div>
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div>
                <h3 className="text-[#0A4D91] text-base sm:text-lg font-bold mb-6 uppercase tracking-wide">PREMIUM & GROWTH</h3>
                <div className="space-y-4">
                  {premiumFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#0A4D91] flex items-center justify-center">
                          <Check size={14} strokeWidth={3} className="text-white" />
                        </div>
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A4D91] via-[#01203F] to-[#03172B]">
          <div className="max-w-5xl mx-auto">
            <div className="text-left">
              <p className="text-white/80 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wide">WHY IT MATTERS</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                Every week on the wrong software is{' '}
                <span className="text-[#26CCDA]">revenue you are not getting back.</span>{' '}
                Let's fix that.
              </h2>
              <button className="bg-[#FF1654] hover:bg-[#E01449] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-all shadow-lg hover:shadow-xl">
                Start Now →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PricingPage;

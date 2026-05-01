import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  const layer01Features = [
    {
      title: 'PACKAGES',
      subtitle: 'Self-Managed Packages',
      description: 'Clients buy a package and book every session in advance, within the intervals you set. Nothing is left for anyone to chase.',
      color: '#0A4D91'
    },
    {
      title: 'SAFETY',
      subtitle: 'Contraindication Blocking',
      description: 'A client has a contraindication on her file. Services that conflict simply do not appear for her. New hires do not have to catch it. Your do not have to remember it.',
      color: '#0A4D91'
    },
    {
      title: 'TIMING',
      subtitle: 'Service-Based Intervals',
      description: 'You require four weeks between sessions. She tries to book at three. The calendar does not show that date. She never knows a rule was applied.',
      color: '#0A4D91'
    },
    {
      title: 'PRIORITY',
      subtitle: 'Best Clients Win Contested Slots',
      description: 'Two clients want the same Saturday 10am. The loyal one gets it. The serial rescheduler sees the next available time. You never had to choose.',
      color: '#0A4D91'
    }
  ];

  return (
    <>
      <Head>
        <title>Features | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="w-full overflow-x-hidden bg-white">
        {/* Hero Section */}
        <div className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 bg-gradient-to-br from-[#0A4D91] via-[#01203F] to-[#03172B]">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/80 text-sm sm:text-base font-semibold mb-4 uppercase tracking-wide">FEATURES</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-[#FF1654]">Twenty-plus systems.</span> One operating layer.
            </h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              Clee is not a collection of features. It is a set of enforcement mechanisms —
            </p>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              organised into six operating layers, each governed by rules the clinic sets once.
            </p>
          </div>
        </div>

        {/* Layer 01 Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div>
                <p className="text-[#0A4D91] text-sm sm:text-base font-semibold mb-3 uppercase tracking-wide">
                  LAYER 01 — THE CALENDAR THAT RESPECTS YOUR RULES
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-[#FF1654]">Bookings</span> that behave the way you want them to.
                </h2>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {layer01Features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg"
                    >
                      <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                        {feature.title}
                      </p>
                      <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                        {feature.subtitle}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/f1.png" 
                    alt="Booking System"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 02 Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/f1.png" 
                    alt="Deposits and Cancellations"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="order-1 lg:order-2">
                <p className="text-[#0A4D91] text-sm sm:text-base font-semibold mb-3 uppercase tracking-wide">
                  LAYER 02 — FINANCIAL PROTECTION
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Deposits, cancellations, and{' '}
                  <span className="text-[#FF1654]">pre-bookings</span> that protect revenue.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      DEPOSITS
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Flexible Deposit Rules
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Set deposit amounts per service. Fixed, percentage, or full payment. The system collects it automatically.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      CANCELLATIONS
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Policy Enforcement
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Late cancellations trigger charges automatically. No awkward conversations. Just consistent policy.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      PRE-BOOKINGS
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Package Management
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Clients pre-book all sessions when they buy a package. Your calendar fills weeks in advance.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      PROTECTION
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Revenue Safeguards
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Every booking is protected. Every policy is enforced. No revenue left on the table.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 03 Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div>
                <p className="text-[#0A4D91] text-sm sm:text-base font-semibold mb-3 uppercase tracking-wide">
                  LAYER 03 — LAST-MINUTE REVENUE ENGINE
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Cancellations close themselves.{' '}
                  <span className="text-[#FF1654]">Last bookings</span> fill automatically.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      WAITLIST
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Auto-Fill System
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      A slot opens. The waitlist fills it automatically. The client gets notified. You never touched it.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      PRIORITY
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Smart Matching
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Best clients get first access. Loyal customers win contested slots. The system decides for you.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      TIMING
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Last-Minute Alerts
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Gaps in your calendar trigger notifications to clients who want them. Revenue you would have lost.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      AUTOMATION
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Zero Manual Work
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The entire process runs itself. You set the rules once. The system enforces them forever.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/f1.png" 
                    alt="Last Minute Engine"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 04 Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/f1.png" 
                    alt="Marketing Engine"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="order-1 lg:order-2">
                <p className="text-[#0A4D91] text-sm sm:text-base font-semibold mb-3 uppercase tracking-wide">
                  LAYER 04 — MARKETING THAT RUNS ITSELF
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  A marketing tool that feels{' '}
                  <span className="text-[#FF1654]">personal</span>, even when it's not.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      CAMPAIGNS
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Automated Outreach
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Target specific clients with specific offers. The system sends them at the right time.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      PERSONALIZATION
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Smart Targeting
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Messages feel personal because they are. Based on history, preferences, and behavior.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      RECOVERY
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Abandoned Checkout
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Client starts booking but doesn't finish. System follows up automatically. Revenue recovered.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-none p-5 sm:p-6 hover:border-[#0A4D91] transition-all hover:shadow-lg">
                    <p className="text-[#0A4D91] text-xs font-bold mb-2 uppercase tracking-wide">
                      TIMING
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                      Perfect Moments
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Messages go out when clients are most likely to book. Not when you remember to send them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-[#0A4D91] text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wide">FEATURE BY FEATURE</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                What Clee does that <span className="text-[#FF1654]">others don't.</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
                A direct comparison of the enforcement mechanisms that separate an operating system from a booking tool.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-none shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide bg-white">
                        Platform Feature
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center bg-[#0A4D91]">
                        <div className="text-white">
                          <p className="text-xs uppercase tracking-wide mb-1">The Clee Way</p>
                          <p className="text-lg font-bold">Clee</p>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold text-gray-700 bg-gray-50">
                        Other software
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { feature: 'Rule-based self-managed packages', clee: true, others: false },
                      { feature: 'Reschedule ladder with escalating fees', clee: true, others: false },
                      { feature: 'Deposit conversion to store credit', clee: true, others: false },
                      { feature: 'Automated waitlist auto-fill', clee: true, others: 'dash' },
                      { feature: 'Abandoned checkout recovery (bookings + retail)', clee: true, others: false },
                      { feature: 'Pre-written marketing campaigns, ready to activate', clee: true, others: false },
                      { feature: 'Internal client rating & flagging', clee: true, others: false },
                      { feature: 'Tiered access (priority slots for high-value clients)', clee: true, others: false },
                      { feature: 'Automated retail replenishment triggers', clee: true, others: false },
                      { feature: 'Client lifecycle staging (New • Active • At-Risk • Dormant)', clee: true, others: false },
                      { feature: 'Personalised, sequenced procedure plans', clee: true, others: false },
                      { feature: 'Role-based permissions & staff time clock', clee: true, others: 'dash' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                          {row.feature}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center bg-blue-50">
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0A4D91]">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          {row.others === 'dash' ? (
                            <span className="text-gray-400 text-xl">—</span>
                          ) : (
                            <span className="text-gray-300 text-2xl">×</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0A4D91] via-[#01203F] to-[#03172B]  px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20">
            <p className="text-white/80 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 uppercase tracking-wide">THE FINAL WORD</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-10 leading-tight max-w-4xl">
              A system that enforces <span className="text-[#FF1654]">structure</span>, controls behaviour, and drives revenue without relying on you.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button 
                onClick={() => window.location.href = '/freetrial'}
                className="bg-[#FF1654] hover:bg-[#E01449] text-white font-bold py-3.5 sm:py-4 px-8 sm:px-10 rounded-none text-base sm:text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Start a Free Trial →
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#0A4D91] font-bold py-3.5 sm:py-4 px-8 sm:px-10 rounded-none text-base sm:text-lg transition-all">
                Request Walkthrough
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FeaturesPage;



import React from 'react';
import Head from 'next/head';
import { CreditCard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQPage = () => {
  const faqData = {
    'Payments & Deposits': [
      {
        question: 'How does the deposit system work?',
        answer: 'ClinicalCore allows you to set granular deposit requirements for any clinical procedure. Funds are held in a secure escrow until the appointment is confirmed or completed.'
      },
      {
        question: 'Can deposits be refunded?',
        answer: 'Yes. Admin users can process full or partial refunds through the financial dashboard. All transactions are logged with absolute audit integrity.'
      },
      {
        question: 'What happens after repeated reschedules?',
        answer: 'The system can be configured to automatically trigger higher deposit requirements for clients with a history of three or more reschedules within a 30-day window.'
      }
    ],
    'Cancellations & Behaviour': [
      {
        question: 'How does the cancellation policy work?',
        answer: 'Operators can define specific "grace periods." Cancellations outside this window can trigger automatic fee processing according to your clinic\'s legal terms.'
      },
      {
        question: 'Can clients reschedule themselves?',
        answer: 'Through the patient portal, clients can reschedule based on real-time availability, provided they are outside the restricted cancellation window.'
      }
    ],
    'Marketplace': [
      {
        question: 'How does the marketplace work?',
        answer: 'The marketplace connects your clinic with verified suppliers and allows you to browse, order, and manage inventory directly through the platform.'
      },
      {
        question: 'Are marketplace transactions secure?',
        answer: 'All marketplace transactions are encrypted and processed through secure payment gateways with full compliance to industry standards.'
      }
    ],
    'Marketing & Retention': [
      {
        question: 'What marketing tools are included?',
        answer: 'Automated email campaigns, SMS reminders, abandoned checkout recovery, and personalized client outreach based on visit history and preferences.'
      },
      {
        question: 'Can I track campaign performance?',
        answer: 'Yes. Detailed analytics show open rates, click-through rates, conversion rates, and ROI for all marketing campaigns.'
      }
    ],
    'Staff & Roles': [
      {
        question: 'Is pricing per staff member?',
        answer: 'No. ClinicalCore uses a performance-based pricing model that scales with your infrastructure usage, not your headcount. Add as many users as you need.'
      },
      {
        question: 'How do staff permissions work?',
        answer: 'Granular Role-Based Access Control (RBAC) allows you to restrict access to financial data, patient records, or system configuration at the individual level.'
      }
    ],
    'Data & Security': [
      {
        question: 'Who owns the client list?',
        answer: 'You do. ClinicalCore acts strictly as a data processor. Your patient data is isolated in your dedicated cloud partition and remains your property at all times.'
      },
      {
        question: 'Can I export my data?',
        answer: 'Data portability is a core pillar of our system. You can export clinical records, financial logs, and inventory data in CSV or encrypted JSON format at any time.'
      }
    ],
    'Pricing & Billing': [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and bank transfers. Payment is processed securely through Stripe.'
      },
      {
        question: 'Can I change my plan anytime?',
        answer: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately with pro-rated billing.'
      }
    ],
    'Onboarding & Migration': [
      {
        question: 'How long does onboarding take?',
        answer: 'Most clinics are fully operational within 2-3 business days. We provide dedicated onboarding support and training.'
      },
      {
        question: 'Can you migrate my existing data?',
        answer: 'Yes. Our team will help migrate your client data, appointment history, and other records from your current system at no extra cost.'
      }
    ]
  };

  return (
    <>
      <Head>
        <title>FAQ | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="w-full overflow-x-hidden bg-white">
        {/* Hero Section */}
        <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#0A4D91] text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wide">KNOWLEDGE BASE</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Every question. <span className="text-[#D13275]">Directly answered.</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
              An in-depth reference for operators evaluating Clee. Organised by category — jump to the section you need, or read it end to end.
            </p>
          </div>
        </div>

        {/* FAQ Section - Payments & Deposits */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Payments & Deposits
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {faqData['Payments & Deposits']?.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                  <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section - Cancellations & Behaviour */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Cancellations & Behaviour
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {faqData['Cancellations & Behaviour']?.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                  <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section - Staff & Roles */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Staff & Roles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {faqData['Staff & Roles']?.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                  <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section - Data & Security */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Data & Security
              </h2>
            </div>

            {/* Single Box with Questions and Badges */}
            <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 rounded-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8">
                {faqData['Data & Security']?.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Compliance Badges - Left Aligned */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 pt-6 border-t border-gray-200">
                <span className="flex items-center gap-2">
                  <span>●</span> HIPAA Compliant
                </span>
                <span className="flex items-center gap-2">
                  <span>●</span> SOC2 Type II
                </span>
                <span className="flex items-center gap-2">
                  <span>●</span> GDPR Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Pricing & Billing */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Pricing & Billing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {faqData['Pricing & Billing']?.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                  <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section - Onboarding & Migration */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Onboarding & Migration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {faqData['Onboarding & Migration']?.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                  <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section - Fresha / Clee / Kitomba */}
        <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                Fresha / Clee / Kitomba
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                  Why would I move from Fresha?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Fresha is a consumer-market platform with limited flexibility for aesthetic clinics. Clee is an operating system that also includes a marketplace. The difference is that Fresha is built for mass consumers, Clee is built for clinic operators who need granular control, advanced financial tools, and sophisticated client management.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                  What about timely?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Timely is a competent general-purpose scheduler. It lacks our software stack of the level a serious aesthetic business needs. Beyond scheduling, Clee offers deposit automation, RBAC, automated checkout recovery, integrated inventory management at the product level. Clee is purpose-built for your space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0A4D91] to-[#083d73] rounded-sm px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20">
            <div className="text-left max-w-2xl">
              <p className="text-white/80 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wide">
                STILL DECIDING?
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                If your question isn't here, ask it <span className="text-white">directly.</span>
              </h2>
              <button className="bg-[#D13275] hover:bg-[#B82A65] text-white font-semibold py-3 px-8  text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mt-6">
                Contact the Team →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FAQPage;


import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchConsultSection } from '../redux/actions/faqActions';

const CleeConsultSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const dispatch = useAppDispatch();
  const { consultSection: faqs } = useAppSelector((state) => state.faq);

  const features = [
    {
      title: 'Customizable forms. Add your own sparkle.',
      description: 'Intake, health, consent—youre in control. Set forms to specific flows or services. Send through SMS or email. Own the information you need. Effortlessly.'
    },
    {
      title: 'Digital pre-appointment forms. Done and dusted.',
      description: 'Clients complete forms after checkout. Set forms to specific flows or services. Send through SMS or email. Own the information you need. Effortlessly.'
    },
    {
      title: 'Up-to-date client records. Always accurate.',
      description: 'No more missed entries. Create client records and update existing ones. Automatically sync information to Phorest, Jena Fresha.'
    }
  ];

  useEffect(() => {
    dispatch(fetchConsultSection());
  }, [dispatch]);

  return (
    <div className="w-full bg-white">
      {/* Clee Consult Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">
                  Clee Consult.
                </h2>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0A4D91' }}>
                  The ultimate protection.
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Create digital forms. Customize them. Keep your business, your clients and your staff
                  safe and legally watertight. Seriously next-level.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <button 
                className="px-8 py-3 font-semibold text-white transition-all cursor-pointer hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #1173D8 0%, #04294E 100%)' }}
                onClick={() => window.location.href = '/freetrial'}
              >
                Start a Free Trial
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/images/tablet.png" 
                alt="Clee Consult" 
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span style={{ color: '#0A4D91' }}>Questions</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Clear answers to the most common questions about using Clee for beauty, wellness, financial operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 cursor-pointer transition-all duration-300 flex flex-col"
                style={{ 
                  background: 'linear-gradient(135deg, #1173D8 0%, #04294E 100%)',
                  color: 'white',
                }}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold pr-4">{faq.question}</h4>
                  {openFaq === index ? (
                    <Minus size={20} className="flex-shrink-0 mt-1" />
                  ) : (
                    <Plus size={20} className="flex-shrink-0 mt-1" />
                  )}
                </div>
                {openFaq === index && (
                  <div className="mt-1">
                    <div
                      className="text-white/90 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleeConsultSection;

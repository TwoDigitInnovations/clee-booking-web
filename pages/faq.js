import React, { useEffect } from 'react';
import Head from 'next/head';
import { CreditCard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchFaqPage } from '../redux/actions/faqActions';

const FAQPage = () => {
  const dispatch = useAppDispatch();
  const { faqPage, loading } = useAppSelector((state) => state.faq);

  useEffect(() => {
    dispatch(fetchFaqPage());
  }, [dispatch]);

  const isDataSecurity = (name) =>
    name?.toLowerCase().includes('data') || name?.toLowerCase().includes('security');

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

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#0A4D91] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          faqPage.map((cat, ci) => (
            <div
              key={ci}
              className={`w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ${ci % 2 !== 0 ? 'bg-white' : ''}`}
            >
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8 sm:mb-12">
                  <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A4D91]" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4D91]">
                    {cat.categoryName}
                  </h2>
                </div>

                {isDataSecurity(cat.categoryName) ? (
                  <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 rounded-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8">
                      {(cat.items || []).map((faq, index) => (
                        <div key={index}>
                          <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                            {faq.question}
                          </h3>
                          <div
                            className="text-sm sm:text-base text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 pt-6 border-t border-gray-200">
                      <span className="flex items-center gap-2"><span>●</span> HIPAA Compliant</span>
                      <span className="flex items-center gap-2"><span>●</span> SOC2 Type II</span>
                      <span className="flex items-center gap-2"><span>●</span> GDPR Ready</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                    {(cat.items || []).map((faq, index) => (
                      <div key={index} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
                        <h3 className="text-base sm:text-lg font-bold text-[#D13275] mb-4">
                          {faq.question}
                        </h3>
                        <div
                          className="text-sm sm:text-base text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

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
              <button className="bg-[#D13275] hover:bg-[#B82A65] text-white font-semibold py-3 px-8 text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mt-6">
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

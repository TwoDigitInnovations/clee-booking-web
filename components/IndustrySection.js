import React from 'react';
import Image from 'next/image';

const IndustrySection = () => {
  const industries = [
    { name: 'Skin clinics', image: '1.png', active: true },
    { name: 'Beauty salons', image: '2.png', active: false },
    { name: 'Spas & wellness centers', image: '3.png', active: false },
    { name: 'Nail studios', image: '4.png', active: false },
    { name: 'Hair salons', image: '5.png', active: false },
    { name: 'Injectables clinics', image: '6.png', active: false },
    { name: 'Brows & lashes', image: '7.png', active: false },
    { name: 'Scalp Clinics', image: '8.png', active: false },
    { name: 'Massage', image: '9.png', active: false },
    { name: 'Makeup artists', image: '10.png', active: false },
    { name: 'Tattoo & piercing', image: '11.png', active: false },
    { name: 'And more', image: '12.png', active: false },
  ];

  return (
    <>
      {/* Industry Cards Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A4D91] mb-4">
              Built for the Entire Beauty & Wellness Industry
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              "And any business where time, retention, and client flow directly impact revenue."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`${
                  industry.active
                    ? 'bg-[#0A4D91] text-white'
                    : 'bg-[#EDF4FB] text-[#0A4D91]'
                } p-2.5 md:p-3 lg:p-3.5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg cursor-pointer`}
              >
                <div className="relative w-7 h-7 md:w-8 md:h-8 mb-2">
                  <Image
                    src={`/images/${industry.image}`}
                    alt={industry.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-gray-800">Built to Increase Revenue.</span>
                <br />
                <span className="text-[#0A4D91]">Not Just Manage Bookings.</span>
              </h2>

              <div className="grid grid-cols-2 gap-6 md:gap-8 my-8 md:my-10">
                <div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2">
                    5,400<span className="text-[#0A4D91]">+</span>
                  </h3>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2">
                    8K<span className="text-[#0A4D91]">+</span>
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-[#0A4D91] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-800">Customers</h4>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Trustfully thousands of businesses managing payments, taking & team at operations every day.
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-[#0A4D91] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-800">Reviews</h4>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Positive feedback from health and wellness clinics, studios, and clinics from all fields.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src="/images/img2.png"
                alt="Beauty Professional"
                fill
                className="object-contain"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default IndustrySection;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="w-full py-10 md:py-12 lg:py-16  bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-5 min-h-[800px]">
          
         
          <div className="relative w-full lg:w-[70%] min-h-[800px] overflow-hidden">
            <Image 
              src="/heroimg.png" 
              alt="Hero" 
              fill
              className="object-cover"
              priority
            />
            
          
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50"></div> */}
            
         
            <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-12 lg:px-14 py-12 mt-12 md:mt-16 lg:mt-20">
              
             

              {/* Main Heading */}
              <h1 className="text-white text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] mb-5">
                Turn bookings into structured, predictable revenue
              </h1>

             
              <p className="text-white text-base leading-relaxed mb-8 opacity-90">
                Bookings, marketing, and last-minute revenue structured into one automated system, with no guesswork or gaps.
              </p>

              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/freetrial">
                  <button className="bg-gradient-to-r from-[#1173D8] to-[#04294E] hover:from-[#0d5cb8] hover:to-[#031d3a] text-white px-8 py-4 text-base font-semibold transition-all duration-200">
                    Start a Free Trial
                  </button>
                </Link>
                <button 
                  onClick={() => window.location.href = "/demo"}
                  className="bg-[#FFFFFF] hover:bg-gray-100 text-[#0A4D91] px-8 py-4 text-base font-semibold transition-all duration-200">
                  View A Live Demo
                </button>
              </div>
            </div>
          </div>

         
          <div className="w-full lg:w-[30%] flex flex-col gap-5 min-h-[800px]">
            
          
            <div className="relative w-full h-[500px] lg:h-[560px] flex items-center justify-center overflow-hidden rounded-none">
              <Image 
                src="/Container.png" 
                alt="Container" 
                fill
                className="object-fill rounded-none"
              />
              <div className="text-center text-white z-10 relative">
               
               
              </div>
            </div>

           
            <div className="relative w-full h-[280px] lg:h-[220px] bg-[#0A4D91] flex items-center justify-center px-6 md:px-8 py-5">
              <div className="text-white">
                <p className="text-sm md:text-base leading-relaxed mb-2 italic">
                  "Rebooking increased significantly, and most clients now return without us needing to follow up."
                </p>
                <button className="text-white font-semibold text-sm md:text-base hover:opacity-80 transition-opacity inline-flex items-center gap-2">
                  Learn More <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

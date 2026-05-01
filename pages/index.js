import React from 'react';
import HeroSection from '../components/HeroSection';
import IndustrySection from '../components/IndustrySection';
import PurposeBuiltSection from '../components/PurposeBuiltSection';
import FeaturesSection from '../components/FeaturesSection';
import WhyCleeSection from '../components/WhyCleeSection';
import PricingSection from '../components/PricingSection';
import TestimonialSection from '../components/TestimonialSection';
import CleeConsultSection from '../components/CleeConsultSection';
import Footer from '../components/Footer';

const index = () => {
  return (
    <div className='min-h-screen pt-20 bg-white'>
      <HeroSection />
      <IndustrySection />
      <PurposeBuiltSection />
      <FeaturesSection />
      <WhyCleeSection />
      <PricingSection />
      <TestimonialSection />
      <CleeConsultSection />
      <Footer />
    </div>
  );
};

export default index;
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, BookmarkPlus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const categories = ['All Articles', 'Skin Care', 'Wellness', 'Business', 'Nutrition'];

  const blogPosts = [
    {
      id: 1,
      category: 'Skin Care',
      image: '/images/Container (1).png',
      title: 'Understanding the Barrier: Why Ceramide Recovery is Key',
      excerpt: 'The science behind repairing a healthy skin barrier is essential. Learn how ceramides sit on the surface...',
      date: 'May 14, 2024'
    },
    {
      id: 2,
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      title: 'Scaling Your Wellness Practice with Digital Systems',
      excerpt: 'Transitioning from manual bookings to automated systems can transform the right tech stack creates a foundation...',
      date: 'May 10, 2024'
    },
    {
      id: 3,
      category: 'Nutrition',
      image: '/images/Container (3).png',
      title: 'Bioavailable Nutrition: More Than Just What You Eat',
      excerpt: 'Discover nutrition absorption forms matter. A food getting and being. A quick to the professionals cost for...',
      date: 'May 08, 2024'
    }
  ];

  const filteredPosts = selectedCategory === 'All Articles' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Blog | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="w-full overflow-x-hidden mt-20 bg-white">
        {/* Hero Section - Rounded Card Style */}
        <div className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full h-[500px] sm:h-[550px] overflow-hidden rounded-3xl shadow-xl">
              <img 
                src="/images/blogimg.png"
                alt="Blog Hero"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-full">
                <img 
                  src="/images/Gradient.png"
                  alt="Gradient"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-2xl">
                  The Future of Holistic Wellness
                </h1>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6 max-w-2xl">
                  Integration Tech and Tranquility
                </h2>
                <p className="text-white/90 text-sm sm:text-base mb-6 max-w-xl leading-relaxed">
                  Discover how cutting-edge technology is transforming the wellness industry while maintaining the human touch that matters most.
                </p>
                <div>
                  <Link href="#articles">
                    <button className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 shadow-md">
                      Read More <ArrowRight size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter & Blog Grid */}
        <div id="articles" className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-[#D13275] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1">
                <span>Sort by: Newest</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0A4D91] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2 rounded-full transition-all shadow-sm">
                      <BookmarkPlus size={16} className="text-gray-700" />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0A4D91] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <Link href={`/blog/${post.id}`}>
                        <button className="text-[#0A4D91] hover:text-[#083d73] font-medium text-sm flex items-center gap-1 transition-colors">
                          <ArrowRight size={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-10">
              <button className="bg-[#D13275] hover:bg-[#B82A65] text-white px-10 py-3 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg">
                Load More Insights
              </button>
            </div>
          </div>
        </div>

      
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;

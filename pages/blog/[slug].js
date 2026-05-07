import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, BookmarkPlus, Share2, Clock, Calendar, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Api } from '../../services/service';

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (slug) {
      fetchBlog();
      fetchRelated();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await Api('get', `blogs/slug/${slug}`, null, null);
      setPost(res?.data?.data || null);
    } catch (e) {
      console.error('Failed to fetch blog:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await Api('get', 'blogs?status=published', null, null);
      const all = res?.data?.data || [];
      setRelatedPosts(all.filter(b => b.slug !== slug).slice(0, 3));
    } catch (e) {
      console.error('Failed to fetch related:', e);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0A4D91] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex flex-col items-center justify-center mt-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h1>
          <Link href="/blog">
            <button className="text-[#0A4D91] hover:underline flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Blog
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Clee Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="w-full bg-white mt-16 sm:mt-20 overflow-x-hidden">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-[#0A4D91] transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              <span>Blog</span>
            </Link>
            <span>/</span>
            <span className="text-[#0A4D91] font-medium">{post.category}</span>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#0A4D91] text-white px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A4D91] flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Clee Team</p>
                <p className="text-xs text-gray-500">Editorial</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {formatDate(post.createdAt)}
              </span>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-1 transition-colors ${bookmarked ? 'text-[#0A4D91]' : 'hover:text-[#0A4D91]'}`}
              >
                <BookmarkPlus size={14} />
                <span>{bookmarked ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-1 hover:text-[#0A4D91] transition-colors"
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="w-full h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Article Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {post.content ? (
                <div
                  className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700
                    prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-3
                    prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:pl-5 prose-ul:space-y-1
                    prose-blockquote:border-l-4 prose-blockquote:border-[#0A4D91] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:py-3 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <p className="text-gray-500 italic">No content available.</p>
              )}

              {/* Tags */}
              {post.category && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={14} className="text-gray-400" />
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-4">

                {/* Table of Contents — extracted from content headings */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">On This Page</h4>
                  <ul className="space-y-2">
                    {post.content
                      ? [...post.content.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)].slice(0, 5).map((match, i) => (
                          <li key={i}>
                            <a href="#" className="text-sm text-gray-600 hover:text-[#0A4D91] transition-colors leading-snug block">
                              {match[1].replace(/<[^>]+>/g, '')}
                            </a>
                          </li>
                        ))
                      : null}
                    {(!post.content || !post.content.match(/<h[23]/i)) && (
                      <li><span className="text-sm text-gray-400 italic">No headings found</span></li>
                    )}
                  </ul>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-[#D13275] rounded-2xl p-6 text-white">
                  <p className="text-sm font-semibold mb-2 opacity-90">The Weekly Insight</p>
                  <p className="text-base font-bold mb-4 leading-snug">
                    Join 50k+ readers receiving evidence-based wellness tips every Tuesday morning.
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 text-sm mb-3 outline-none focus:bg-white/30"
                  />
                  <button className="w-full bg-white text-[#D13275] text-sm font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    Join Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Related Insights</h2>
                <Link href="/blog" className="text-sm text-[#0A4D91] font-medium hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPosts.map((related) => (
                  <Link href={`/blog/${related.slug || related._id}`} key={related._id}>
                    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={related.image || '/images/Container (1).png'}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#0A4D91] text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {related.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0A4D91] transition-colors leading-snug">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">
                          {related.excerpt}
                        </p>
                        <span className="text-xs text-gray-400">{formatDate(related.createdAt)}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-[#0A4D91] py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-2">Get started today</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to transform your wellness journey?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Join thousands of clients who trust Clee for their beauty and wellness bookings.
            </p>
            <Link href="/freetrial">
              <button className="bg-white text-[#0A4D91] px-8 py-3 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors shadow-md">
                Start Free Trial →
              </button>
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WhyClee() {
  return (
    <>
      <Head>
        <title>Why Clee | Clee</title>
        <meta name="description" content="Most platforms protect clients. Clee protects the business." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="w-full overflow-x-hidden bg-white">

        {/* ── HERO + IMAGE ── */}
        <section className="w-full pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <p className="text-[#1173D8] text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
              WHY CLEE ?
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
              Most platforms protect clients.
            </h1>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold  leading-tight mb-6"
              style={{ color: '#FF1654' }}
            >
              Clee protects the business.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Built from the floor, not the boardroom. By operators, for operators —
              closing the gap between what the beauty industry earns and what its
              infrastructure was designed to handle.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/whyyy.png"
                alt="Clee platform dashboard"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 1: laptop left, text right ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — laptop image */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/whylceelap.png"
                  alt="Clee on laptop"
                  className="w-full max-w-md lg:max-w-full h-auto object-contain"
                />
              </div>

              {/* Right — text */}
              <div>
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-4">
                  ABOUT
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                  A platform built from the{' '}
                  <span style={{ color: '#FF1654' }}>floor,</span> not the boardroom.
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                  Clee was not designed by a software company trying to enter the beauty
                  industry. It was designed from inside it.
                </p>
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-3">
                  ORIGIN
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Every rule, every automation, every enforcement mechanism in the platform
                  exists because something in a real business was broken — and the available
                  tools refused to change.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 2: text left, tablet right ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — text */}
              <div className="order-2 lg:order-1">
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-4">
                  THE PROBLEM
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                  The hidden cost of the tools{' '}
                  <span style={{ color: '#FF1654' }}>you're already using.</span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Every clinic runs on software. Few run on systems. Fresha, timely, and the
                  rest were built to take a booking. They do that competently. What they
                  can't do is protect the business around the booking — the deposit logic,
                  the rebooking flow, the cancellation enforcement, the slot that went empty
                  at 2pm on a Thursday and stayed empty.
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4">
                  The result is a category of loss most operators never measure: clients
                  who drifted out of rotation, packages that were never completed, last-minute
                  cancellations absorbed in silence, and a marketing calendar that runs on
                  whatever campaign someone remembered to send. It isn't incompetence. It's
                  infrastructure.
                </p>
              </div>

              {/* Right — tablet image */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <img
                  src="/images/tablet.png"
                  alt="Clee on tablet"
                  className="w-full max-w-md lg:max-w-full h-auto object-contain"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3: laptop left, text right ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — laptop image */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/whylceelap.png"
                  alt="Clee dashboard on laptop"
                  className="w-full max-w-md lg:max-w-full h-auto object-contain"
                />
              </div>

              {/* Right — text */}
              <div>
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-4">
                  03 / RESOLUTION
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                  Introducing{' '}
                  <span style={{ color: '#FF1654' }}>Clee.</span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                  Clee is a Beauty and Wellness Operating System — a single platform
                  that governs bookings, payments, client behaviour, marketing, and
                  retention through rules the business sets once and the software
                  enforces permanently.
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                  It runs the operational layer of a business the way financial software
                  runs the books: in the background, without interpretation, without
                  exception.
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Clients book within the rules. Deposits are taken within the rules.
                  Rebooking happens within the rules. The calendar fills itself. The
                  marketing runs itself. The policies hold, whether the owner is on the
                  floor or out of the country.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 4: text left, tablet right ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — text */}
              <div className="order-2 lg:order-1">
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-4">
                  04 / CATEGORY
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                  A new{' '}
                  <span style={{ color: '#FF1654' }}>category.</span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                  The industry has had booking tools for two decades. It has never had
                  an operating system.
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  That distinction matters. A tool executes individual tasks. An
                  operating system coordinates them — so that a deposit rule, a
                  cancellation policy, a package structure, a waitlist, and a
                  rebooking sequence all behave as one logic, not five plugins.
                  Clee is the first platform designed from that premise.
                </p>
              </div>

              {/* Right — tablet image */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <img
                  src="/images/tablet.png"
                  alt="Clee operating system on tablet"
                  className="w-full max-w-md lg:max-w-full h-auto object-contain"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 5: Structure over chaos ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              {/* Left label */}
              <div className="lg:col-span-3">
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest">
                  05 / PHILOSOPHY
                </p>
              </div>

              {/* Right content */}
              <div className="lg:col-span-9">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                  Structure over{' '}
                  <span style={{ color: '#FF1654' }}>chaos.</span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                  Our platform enforces policies at the atomic level, ensuring that every
                  interaction follows the protocol you've defined.
                </p>

                {/* Two cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="w-9 h-9 mb-4 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#1173D8]" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-2">
                      Atomic Enforcement
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Permissions and protocols that cannot be bypassed, maintaining absolute compliance.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="w-9 h-9 mb-4 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#1173D8]" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                    </div>
                    <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-2">
                      Logic Flows
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Branching queries that always function in real-time without human error.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: Two-col cards ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Card 1 — What makes Clee different */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-10">
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-4">
                  THE CLEE DISTINCTION
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                  What makes Clee different.
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                  Most platforms compete on features. They add buttons to solve problems.
                  We believe the problem isn't a lack of features; it's a lack of integrated
                  logic. Clee competes on <span className="font-semibold text-gray-700">"outcomes"</span>.
                </p>
                <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-1">
                      PRINCIPLE
                    </p>
                    <p className="text-gray-700 text-sm font-semibold">
                      Outcome-Driven Engineering
                    </p>
                  </div>
                  <div>
                    <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-1">
                      ARCHITECTURE
                    </p>
                    <p className="text-gray-700 text-sm font-semibold">
                      Unified Infrastructure
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 — Who Clee is for */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 sm:p-10">
                <p className="text-[#1173D8] text-xs font-bold uppercase tracking-widest mb-4">
                  TARGET PARTNERS
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                  Who Clee is for.
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Clee is built for operators who already generate meaningful revenue. Who
                  already understand that time, not traffic, is their constraint. Who already
                  know that scalability is an infrastructure problem, not a marketing one.
                  And who are ready to exchange the ad-hoc systems they've patched together
                  for less than less without them.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 7: Where this is going (dark CTA) ── */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
              style={{ background: 'linear-gradient(135deg, #0A4D91 0%, #01203F 100%)' }}
            >
              {/* Left — text */}
              <div className="p-10 sm:p-12 lg:p-14">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
                  LONG-TERM AMBITION
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
                  Where this is going.
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  We are building more than a dashboard. Clee is the foundation for
                  shared infrastructure in the healthcare-adjacent space — allowing
                  independent clinics to operate with the technological power of a
                  national network.
                </p>
              </div>

              {/* Right — dark panel with label */}
              <div
                className="flex items-center justify-center p-10 sm:p-12 lg:p-14"
                style={{ background: 'rgba(0,0,0,0.25)' }}
              >
                <div className="text-center">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
                    → SYSTEM STATUS
                  </p>
                  <p className="text-white text-lg font-bold uppercase tracking-widest">
                    OPERATIONAL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

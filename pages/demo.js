import { useState } from "react";
import Head from "next/head";

const G = "linear-gradient(90deg, #1173D8 0%, #04294E 100%)";

const GradientText = ({ children, className = "", style = {} }) => (
  <span
    className={className}
    style={{
      background: G,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </span>
);

const chapters = [
  {
    time: "00:00 — 01:34",
    title: "Deposits that hold.",
    desc: "See real deposits in action: full-payment, partial, or minimum flow — enforced at the point of booking, without staff intervention. Live booking intake, builder and deposit conversion logic, demo initiated with real bookings.",
  },
  {
    time: "01:34 — 03:43",
    title: "Automations at work.",
    desc: "Watch the waitlist auto-fill a cancellation in under two seconds. See a rebooking sequence trigger from a treatment interval. Abandoned checkout recovery, retail replenishment prompts, and the marketing trigger pipeline.",
  },
  {
    time: "03:43 — 04:28",
    title: "Revenue control.",
    desc: "The financial picture in full: weekly payout reconciliation, real-time revenue tracking across services, retail and subscriptions. Identifying late-stage upselling across segments, and centralised visibility in action.",
  },
];

const faqGroups = [
  {
    category: "The walkthrough",
    italicWords: ["walkthrough"],
    subtitle: "About the video itself and what you're actually seeing.",
    items: [
      { q: "Is this a real clinic or a demo environment?", a: "This is a live platform running real data from an active Clee clinic. Nothing is staged or simulated." },
      { q: "How long is the full walkthrough?", a: "The full walkthrough is 4 minutes and 28 seconds, broken into three chapters covering deposits, automations, and revenue." },
      { q: "Can I see a walkthrough specific to my clinic type?", a: "Yes — book a private walkthrough and we'll tailor it to your services, team size, and booking flow." },
    ],
  },
  {
    category: "Free trial vs walkthrough",
    italicWords: ["vs", "walkthrough"],
    subtitle: "Which path makes sense for you.",
    items: [
      { q: "Which should I do first?", a: "Watch the demo first to understand the platform, then start your free trial to experience it with your own data." },
      { q: "Is the free trial genuinely free?", a: "Yes. No credit card required. You get full access to set up your clinic, test bookings, and explore every feature." },
      { q: "What happens in a private walkthrough?", a: "A 30-minute live session with our team where we walk through Clee using your clinic's specific context and answer your questions." },
      { q: "How long does onboarding take?", a: "Most clinics are fully set up within 20 minutes using our guided free trial flow." },
    ],
  },
  {
    category: "What the demo doesn't show",
    italicWords: ["doesn't"],
    subtitle: "Some systems are better seen with your own data — here's what's unique to the platform.",
    items: [
      { q: "Does Clee handle multi-location?", a: "Yes. Multi-location management, staff scheduling across sites, and consolidated reporting are all built in." },
      { q: "What about retail inventory?", a: "Clee includes full stock management, supplier orders, low-stock alerts, and retail checkout integrated with bookings." },
      { q: "Can I use the API or advanced reporting?", a: "Advanced reporting is available on Growth and Pro plans. API access is available on Pro and Enterprise." },
    ],
  },
];

export default function Demo() {
  const [playing, setPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (groupIdx, itemIdx) => {
    const key = `${groupIdx}-${itemIdx}`;
    setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Head>
        <title>Live Demo | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

          {/* Hero */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5">
              <GradientText>Live Walkthrough</GradientText>
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
              See how Clee runs a business
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold italic leading-tight mb-6 sm:mb-8" style={{ fontFamily: "Georgia, serif" }}>
              <GradientText>in real time.</GradientText>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
              A guided tour of the platform as it operates — deposits taken, cancellations enforced, waitlists filling, campaigns firing. No slides. No demo sandbox. The system, running.
            </p>
          </div>

          {/* Video */}
          <div
            className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
            style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d2a4a 50%, #0a1628 100%)", aspectRatio: "16/9" }}
            onClick={() => setPlaying(true)}
          >
            {!playing ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-1" fill="#0a1628" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 sm:top-4 left-0 right-0 flex justify-center">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Video Placeholder — embed or upload demo here
                  </p>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Live Platform Footage
                  </span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-5 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold" style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)" }}>
                  04:28
                </div>
              </>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Clee Demo"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Chapters + rest */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">

          {/* Chapters heading */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              <GradientText>What's covered</GradientText>
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Three{" "}
              <span className="italic" style={{ fontFamily: "Georgia, serif" }}>
                <GradientText>chapters,</GradientText>
              </span>
              {" "}one continuous
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              walkthrough.
            </h2>
          </div>

          {/* Chapter cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
            {chapters.map((ch, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
                <p className="text-xs font-semibold tracking-wide mb-2">
                  <GradientText>{ch.time}</GradientText>
                </p>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{ch.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-16 sm:mb-24">
            <div className="rounded-xl p-6 sm:p-8" style={{ background: "#0a1e3c" }}>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                Option A
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                Start a free trial.
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Get access to the platform and set up your intake during a guided onboarding period. No contract. No credit card to start.
              </p>
              <button
                onClick={() => window.location.href = "/freetrial"}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg text-white hover:from-[#0d5cb8] hover:to-[#031d3a] transition-all bg-gradient-to-r from-[#1173D8] to-[#04294E]"
              >
                Start Free Trial →
              </button>
            </div>

            <div className="rounded-xl p-6 sm:p-8 border-2 border-gray-200 bg-white">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 text-gray-400">
                Option B
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-snug">
                Request a{" "}
                <span className="italic" style={{ fontFamily: "Georgia, serif" }}>
                  <GradientText>private walkthrough.</GradientText>
                </span>
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                A one-on-one session with our team, tailored to your clinic's model — how Clee would handle your specific services, intervals, and policy.
              </p>
              <button
                onClick={() => window.location.href = "/"}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all hover:opacity-90 text-white"
                style={{ background: G, borderColor: "transparent" }}
              >
                Book a Walkthrough →
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16 sm:mb-24">
            <div className="mb-8 sm:mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                <GradientText>Questions after the demo</GradientText>
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                What operators ask after
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight italic" style={{ fontFamily: "Georgia, serif" }}>
                <GradientText>watching.</GradientText>
              </h2>
            </div>

            <div className="space-y-0">
              {faqGroups.map((group, gi) => (
                <div key={gi} className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-gray-200 py-8 sm:py-10">
                  <div className="sm:pr-8 mb-4 sm:mb-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {group.category.split(" ").map((word, wi) =>
                        group.italicWords.some(k => word.toLowerCase().includes(k)) ? (
                          <span key={wi} className="italic" style={{ fontFamily: "Georgia, serif" }}>
                            <GradientText>{word} </GradientText>
                          </span>
                        ) : (
                          <span key={wi}>{word} </span>
                        )
                      )}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{group.subtitle}</p>
                  </div>

                  <div className="sm:col-span-2 space-y-0">
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`;
                      const isOpen = openFaq[key];
                      return (
                        <div key={ii} className="border-b border-gray-100 last:border-b-0">
                          <button
                            className="w-full flex items-center justify-between py-4 text-left gap-4"
                            onClick={() => toggleFaq(gi, ii)}
                          >
                            <span className="text-sm sm:text-base text-gray-800 font-medium">{item.q}</span>
                            <span className="text-gray-400 flex-shrink-0 text-lg leading-none">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>
                          {isOpen && (
                            <p className="text-sm text-gray-500 pb-4 leading-relaxed pr-8">{item.a}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl px-6 sm:px-12 py-10 sm:py-14" style={{ background: "linear-gradient(135deg, #0a1e3c 0%, #0d2a4a 100%)" }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              Ready to move
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
              Access starts with a
            </h2>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold italic mb-8 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              <GradientText>conversation.</GradientText>
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.href = "/freetrial"}
                className="px-6 py-2.5 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition-all"
                style={{ background: G }}
              >
                Start Free Trial →
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-white hover:bg-gray-100 transition-all"
                style={{ color: "#0A4D91" }}
              >
                Request Walkthrough
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

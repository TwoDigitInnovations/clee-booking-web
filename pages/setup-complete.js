import Head from "next/head";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SetupComplete() {
  return (
    <>
      <Head>
        <title>Setup Complete | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            You're all set!
          </h1>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Your Clee account has been set up successfully. Your free trial is now active.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-[#0A4D91] text-white py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors text-sm sm:text-base"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

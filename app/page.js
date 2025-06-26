'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
      <Image
        src="/eco-hero.png"
        alt="Eco mission"
        width={400}
        height={300}
        className="mb-6 rounded-xl shadow-xl"
      />
      <h1 className="text-4xl font-bold text-green-700 mb-4">🌳 Welcome to EcoTag</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Join your community in tagging and preserving trees and lakes. Contribute, learn, and earn rewards while making a real impact.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push('/login')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push('/register')}
          className="bg-white border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2 px-6 rounded-xl shadow"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-blue-400">Runes</span>Dex
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Seamlessly swap between NEAR tokens and Bitcoin Ordinals/Runes with decentralized intents
              </p>
              <Link 
                href="/swap" 
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium text-lg transition-all"
              >
                Launch Swap
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-[300px] h-[300px] relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-1">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="font-bold">₿</span>
                </div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="font-bold">Ṉ</span>
                </div>
                <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                  <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10L90 30V70L50 90L10 70V30L50 10Z" stroke="white" strokeWidth="2"></path>
                    <path d="M50 10L50 90" stroke="white" strokeWidth="2" strokeDasharray="4 4"></path>
                    <path d="M10 30L90 30" stroke="white" strokeWidth="2" strokeDasharray="4 4"></path>
                    <path d="M10 70L90 70" stroke="white" strokeWidth="2" strokeDasharray="4 4"></path>
                    <circle cx="50" cy="10" r="4" fill="#3B82F6"></circle>
                    <circle cx="90" cy="30" r="4" fill="#3B82F6"></circle>
                    <circle cx="90" cy="70" r="4" fill="#3B82F6"></circle>
                    <circle cx="50" cy="90" r="4" fill="#3B82F6"></circle>
                    <circle cx="10" cy="70" r="4" fill="#3B82F6"></circle>
                    <circle cx="10" cy="30" r="4" fill="#3B82F6"></circle>
                    <path d="M30 40L70 60" stroke="#3B82F6" strokeWidth="3"></path>
                    <circle cx="30" cy="40" r="6" fill="#EAB308"></circle>
                    <circle cx="70" cy="60" r="6" fill="#60A5FA"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🔄"
              title="Cross-Chain Swaps"
              description="Seamlessly swap between NEAR tokens and Bitcoin Ordinals/Runes through a unified interface"
            />
            <FeatureCard 
              icon="🔐"
              title="Intent-Based Security"
              description="Sign verifiable intents rather than direct transactions for enhanced security"
            />
            <FeatureCard 
              icon="⚡"
              title="Optimized Execution"
              description="Specialized solvers ensure the most efficient execution path for your swaps"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StepCard
              number="1"
              title="Select Tokens"
              description="Choose which tokens you want to swap from and to"
            />
            <StepCard
              number="2"
              title="Receive Quote"
              description="Get a real-time quote from the RunesDex solver"
            />
            <StepCard
              number="3"
              title="Sign Intent"
              description="Sign the swap intent with your NEAR wallet"
            />
            <StepCard
              number="4"
              title="Receive Tokens"
              description="The solver executes the swap and you receive your tokens"
            />
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Architecture</h2>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Frontend</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The user interface built with Next.js that allows you to initiate swaps, sign intents, and view results.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge text="Next.js" />
                <Badge text="React" />
                <Badge text="TypeScript" />
                <Badge text="Tailwind CSS" />
              </div>
            </div>

            <div className="w-8 h-20 flex items-center justify-center">
              <svg width="24" height="80" viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0L12 76" stroke="#3B82F6" strokeWidth="2"></path>
                <path d="M4 68L12 76L20 68" stroke="#3B82F6" strokeWidth="2"></path>
              </svg>
            </div>

            <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">NEAR Intents Protocol</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A decentralized protocol that routes user intents to specialized solvers for optimal execution.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge text="Intents" />
                <Badge text="WebSockets" />
                <Badge text="JSON-RPC" />
              </div>
            </div>

            <div className="w-8 h-20 flex items-center justify-center">
              <svg width="24" height="80" viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0L12 76" stroke="#3B82F6" strokeWidth="2"></path>
                <path d="M4 68L12 76L20 68" stroke="#3B82F6" strokeWidth="2"></path>
              </svg>
            </div>

            <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">RunesDex Solver</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A Rust-based service that processes swap intents between NEAR and Bitcoin Ordinals/Runes by connecting to the RunesDex API.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge text="Rust" />
                <Badge text="Tokio" />
                <Badge text="NEAR SDK" />
                <Badge text="RunesDex API" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-blue-600 text-white">
        <div className="container max-w-6xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Swap?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start swapping between NEAR tokens and Bitcoin Ordinals/Runes with our seamless interface.
          </p>
          <Link 
            href="/swap" 
            className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-medium text-lg transition-all"
          >
            Go to Swap
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-400">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">RunesDex</h2>
              <p>NEAR Intents & Bitcoin Ordinals</p>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/NEAR/intents" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://near.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                NEAR
              </a>
              <a href="https://docs.near.org/concepts/intents" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Docs
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>© {new Date().getFullYear()} RunesDex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Component for feature cards
function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

// Component for step cards
function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md relative">
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 mt-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

// Component for technology badges
function Badge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
      {text}
    </span>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Bot, Sparkles, Users, Award, ArrowRight, Zap } from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import Link from 'next/link';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">
          <Bot className="w-16 h-16 text-accent" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted">Powered by Base & Farcaster</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              AI Agent Forge
            </h1>

            <p className="text-xl text-muted max-w-2xl mx-auto text-balance">
              Co-create, train, and deploy personalized AI agents for Farcaster. 
              Your intelligent companion on Base.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link 
                href="/create"
                className="group px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center gap-2 shadow-card"
              >
                Create Your Agent
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <ConnectWallet className="px-8 py-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Bot className="w-8 h-8" />}
            title="Personalized Identity"
            description="Create AI agents linked to your Farcaster profile with unique personas"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Collaborative Training"
            description="Communities can collectively build and refine shared AI agents"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Frame-Native Actions"
            description="Agents interact directly in Farcaster Frames with real-time responses"
          />
          <FeatureCard
            icon={<Award className="w-8 h-8" />}
            title="Reputation System"
            description="Earn onchain badges as your agent provides valuable services"
          />
        </div>
      </section>

      {/* Architecture Visualization */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Agent Architecture</h2>
          <p className="text-muted">Built on Base with decentralized intelligence</p>
        </div>

        <div className="bg-surface rounded-lg p-8 border border-border shadow-card">
          <div className="grid md:grid-cols-3 gap-8">
            <ArchitectureNode
              title="Natural Language Processing"
              items={["Decision Engine", "Products & Decision-Making"]}
              color="bg-blue-500/20"
            />
            <ArchitectureNode
              title="Central Processing"
              items={["Language Processing", "Decision-Making Engine"]}
              color="bg-accent/20"
              highlight
            />
            <ArchitectureNode
              title="Memory & Storage"
              items={["LIVA", "USK Spares", "Celyure", "LIVK"]}
              color="bg-cyan-500/20"
            />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <ArchitectureNode
              title="External Data Interface"
              items={["Mermal Uita", "Decision-Making System"]}
              color="bg-yellow-500/20"
            />
            <ArchitectureNode
              title="Data Storage"
              items={["1000+ Collocations", "Memory (Intercerebral)"]}
              color="bg-orange-500/20"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-accent/20 to-surface rounded-lg p-12 text-center border border-border shadow-card">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your AI Agent?</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Join the future of social AI on Base. Create, train, and deploy your personalized agent today.
          </p>
          <Link 
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 shadow-card"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="group p-6 bg-surface rounded-lg border border-border hover:border-accent transition-all duration-200 shadow-card hover:shadow-xl">
      <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}

function ArchitectureNode({ 
  title, 
  items, 
  color,
  highlight = false
}: { 
  title: string; 
  items: string[];
  color: string;
  highlight?: boolean;
}) {
  return (
    <div className={`p-6 rounded-lg border ${highlight ? 'border-accent' : 'border-border'} ${color}`}>
      <h3 className="font-semibold mb-4 text-center">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div 
            key={idx}
            className="text-sm text-muted bg-bg/50 rounded px-3 py-2 text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

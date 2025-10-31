'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Bot, Award, TrendingUp, MessageSquare, ArrowLeft, Settings2, Zap } from 'lucide-react';
import Link from 'next/link';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

interface Agent {
  id: string;
  name: string;
  reputation: number;
  interactions: number;
  status: 'active' | 'training' | 'idle';
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'MyAssistant',
      reputation: 850,
      interactions: 1247,
      status: 'active',
    },
  ]);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-fg transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Agent Dashboard</h1>
              <p className="text-muted">Manage and monitor your AI agents</p>
            </div>
            <ConnectWallet />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Bot className="w-6 h-6" />}
            label="Active Agents"
            value="1"
            trend="+100%"
          />
          <StatCard
            icon={<MessageSquare className="w-6 h-6" />}
            label="Total Interactions"
            value="1,247"
            trend="+23%"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            label="Reputation Score"
            value="850"
            trend="+15%"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Growth Rate"
            value="23%"
            trend="+5%"
          />
        </div>

        {/* Agents List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Agents</h2>
            <Link
              href="/create"
              className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 shadow-card"
            >
              Create New Agent
            </Link>
          </div>

          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-surface rounded-lg p-6 border border-border shadow-card hover:border-accent transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-8 h-8 text-accent" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{agent.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        agent.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : agent.status === 'training'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{agent.reputation} reputation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>{agent.interactions.toLocaleString()} interactions</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 bg-bg border border-border rounded-lg hover:border-accent transition-colors">
                    <Zap className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-bg border border-border rounded-lg hover:border-accent transition-colors">
                    <Settings2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted">Next Badge: Pro Agent</span>
                  <span className="text-accent font-medium">850 / 1000</span>
                </div>
                <div className="h-2 bg-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="bg-surface rounded-lg border border-border shadow-card divide-y divide-border">
            {[
              { action: 'Responded to query', time: '2 minutes ago', agent: 'MyAssistant' },
              { action: 'Earned reputation badge', time: '1 hour ago', agent: 'MyAssistant' },
              { action: 'Completed training session', time: '3 hours ago', agent: 'MyAssistant' },
            ].map((activity, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-bg/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted">{activity.agent}</p>
                  </div>
                </div>
                <span className="text-sm text-muted">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  trend 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-surface rounded-lg p-6 border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-accent">{icon}</div>
        <span className="text-sm text-green-400">{trend}</span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}

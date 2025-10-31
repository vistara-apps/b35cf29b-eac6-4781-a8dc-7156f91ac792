'use client';

import { useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Bot, Sparkles, Upload, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

interface AgentFormData {
  name: string;
  persona: string;
  trainingData: string;
}

export default function CreateAgent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    persona: '',
    trainingData: '',
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate agent creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Send notification
    try {
      await sdk.actions.sendNotification({
        title: 'Agent Created!',
        body: `Your AI Agent, ${formData.name}, is ready!`,
      });
    } catch (error) {
      console.log('Notification not supported in this environment');
    }

    setIsCreating(false);
    setStep(4);
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
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
              <h1 className="text-4xl font-bold mb-2">Create Your AI Agent</h1>
              <p className="text-muted">Define your agent's identity and training parameters</p>
            </div>
            <ConnectWallet />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= s ? 'border-accent bg-accent text-white' : 'border-border text-muted'
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step > s ? 'bg-accent' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-muted">Identity</span>
            <span className="text-sm text-muted">Persona</span>
            <span className="text-sm text-muted">Training</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-surface rounded-lg p-8 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Bot className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-semibold">Agent Identity</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., MyAssistant, CommunityBot"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                    />
                    <p className="text-sm text-muted mt-2">
                      Choose a unique name for your AI agent
                    </p>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Linked to Your Farcaster Profile</p>
                        <p className="text-muted">
                          Your agent will be associated with your FID and can use your Basename for identity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name}
                className="w-full px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-card"
              >
                Continue to Persona
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-surface rounded-lg p-8 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-semibold">Agent Persona</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Personality & Behavior *
                    </label>
                    <textarea
                      required
                      value={formData.persona}
                      onChange={(e) => setFormData({ ...formData, persona: e.target.value })}
                      placeholder="Describe your agent's personality, tone, and how it should interact..."
                      rows={6}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    <p className="text-sm text-muted mt-2">
                      Define how your agent communicates and behaves
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, persona: 'Friendly and helpful assistant that provides clear, concise answers with a warm tone.' })}
                      className="px-4 py-3 bg-bg border border-border rounded-lg hover:border-accent transition-colors text-sm"
                    >
                      Helpful Assistant
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, persona: 'Professional community manager that moderates discussions and provides valuable insights.' })}
                      className="px-4 py-3 bg-bg border border-border rounded-lg hover:border-accent transition-colors text-sm"
                    >
                      Community Manager
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-8 py-4 bg-surface border border-border text-fg rounded-lg font-semibold hover:bg-bg transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.persona}
                  className="flex-1 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-card"
                >
                  Continue to Training
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-surface rounded-lg p-8 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Upload className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-semibold">Training Data</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Initial Training Context
                    </label>
                    <textarea
                      value={formData.trainingData}
                      onChange={(e) => setFormData({ ...formData, trainingData: e.target.value })}
                      placeholder="Provide initial context, examples, or data for your agent to learn from..."
                      rows={6}
                      className="w-full px-4 py-3 bg-bg border border-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    <p className="text-sm text-muted mt-2">
                      Optional: Add training data now or train your agent later
                    </p>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Decentralized Storage</p>
                        <p className="text-muted">
                          Training data will be stored on IPFS with hash recorded onchain for immutability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-8 py-4 bg-surface border border-border text-fg rounded-lg font-semibold hover:bg-bg transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-card"
                >
                  {isCreating ? 'Creating Agent...' : 'Create Agent'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <div className="bg-surface rounded-lg p-12 border border-border shadow-card text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-6">
                  <Check className="w-10 h-10 text-accent" />
                </div>

                <h2 className="text-3xl font-bold mb-4">Agent Created Successfully!</h2>
                <p className="text-muted mb-8 max-w-md mx-auto">
                  Your AI agent <span className="text-accent font-semibold">{formData.name}</span> is now ready to interact on Farcaster
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 shadow-card"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-4 bg-surface border border-border text-fg rounded-lg font-semibold hover:bg-bg transition-all duration-200"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

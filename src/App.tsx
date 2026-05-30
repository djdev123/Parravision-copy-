import React, { useState } from 'react';
import { CivicProvider } from './context/CivicContext';
import { PwaShell } from './components/PwaShell';
import { ParramattaMap } from './components/ParramattaMap';
import { PulsePolls } from './components/PulsePolls';
import { PitchingEngine } from './components/PitchingEngine';
import { AISummaryAccordion } from './components/AISummaryAccordion';
import { BlogFeed } from './components/BlogFeed';
import { Chatbot } from './components/Chatbot';
import { CommunityBlog } from './components/CommunityBlog';
import { HomePage } from './components/HomePage';
import { AnimatedChatbot } from './components/AnimatedChatbot';
import { Home, Vote, FileText, MessageSquareShare, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'voting' | 'blog' | 'chatbot' | 'community'>('home');

  return (
    <CivicProvider>
      <PwaShell>
        <div className="space-y-10 animate-fade-in" id="pwa-master-flow-layout">
          
          {/* Top Section: Navigation tabs and dynamic content */}
          <div className="space-y-6" id="top-content-layer">
            
            {/* Visual Navigation Tabs */}
            <div className="flex border-b border-neutral-200/60 pb-px gap-1 overflow-x-auto" id="feed-horizontal-tabs">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-sans font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'home'
                    ? 'border-teal-700 text-teal-700 font-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Home className="w-4 h-4 shrink-0 text-teal-600" />
                Home Hub
              </button>

              <button
                onClick={() => setActiveTab('voting')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-sans font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'voting'
                    ? 'border-teal-700 text-teal-700 font-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Vote className="w-4 h-4 shrink-0 text-teal-600" />
                Pulse Voting & Ideas
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-sans font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'blog'
                    ? 'border-teal-700 text-teal-700 font-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0 text-teal-600" />
                Public Newsroom
              </button>

              <button
                onClick={() => setActiveTab('chatbot')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-sans font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'chatbot'
                    ? 'border-teal-700 text-teal-700 font-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <MessageSquareShare className="w-4 h-4 shrink-0 animate-pulse text-teal-600" />
                AI Planning Chat
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-sans font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'community'
                    ? 'border-teal-700 text-teal-700 font-black'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Users className="w-4 h-4 shrink-0 text-teal-600" />
                Public Community Blog
              </button>
            </div>

            {/* Dynamic Panel Content */}
            <div className="pt-2" id="tab-content-panel">
              {activeTab === 'home' && (
                <div className="animate-fade-in">
                  <HomePage onNavigate={(tab) => setActiveTab(tab)} />
                </div>
              )}

              {activeTab === 'voting' && (
                <div className="space-y-8 animate-fade-in">
                  <PulsePolls />
                  <div className="border-t border-neutral-200/50 pt-8">
                    <PitchingEngine />
                  </div>
                </div>
              )}

              {activeTab === 'blog' && (
                <div className="animate-fade-in">
                  <BlogFeed />
                </div>
              )}

              {activeTab === 'chatbot' && (
                <div className="animate-fade-in">
                  <Chatbot />
                </div>
              )}

              {activeTab === 'community' && (
                <div className="animate-fade-in">
                  <CommunityBlog />
                </div>
              )}
            </div>

          </div>

          {/* Removed bottom interactive grid section per user request */}

        </div>
        {/* Floating Animated Assistant Widget */}
        <AnimatedChatbot />
      </PwaShell>
    </CivicProvider>
  );
}

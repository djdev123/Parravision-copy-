import React, { useState, useEffect } from 'react';
import { useCivic } from '../context/CivicContext';
import { Language } from '../types';
import { 
  ArrowRight, 
  Map, 
  Vote, 
  MessageSquare, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Info, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  Globe2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: 'voting' | 'blog' | 'chatbot' | 'community') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language, translateText } = useCivic();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images from generated assets
  const slides = [
    {
      id: 'slide-1',
      // Generated river walkway image
      imageUrl: '/src/assets/images/river_walkway_1780115753690.png',
      badge: {
        en: 'RIVER REJUVENATION',
        zh: '滨河走廊复兴',
        hn: 'नदी कायाकल्प'
      },
      title: {
        en: 'Floating Wetlands & Eco-Trail',
        zh: '漂浮式生态湿地过滤漫步道',
        hn: 'फ्लोटिंग वेटलैंड्स वॉकवे'
      },
      description: {
        en: 'A continuous community-designed pontoon system utilizing native reed beds to naturally clean urban runoff entering the Parramatta River.',
        zh: '由社区发起的连续漂浮浮桥系统，植入本土芦苇植物床天然净化流入帕拉马塔河的城市雨水。',
        hn: 'देशी पौधों के साथ एक सतत पोंटून प्रणाली जो पैरामाटा नदी में प्रवेश करने वाले पानी को प्राकृतिक रूप से साफ करती है।'
      },
      actionText: {
        en: 'Read Public Newsroom',
        zh: '阅读公共新闻网',
        hn: 'पब्लिक न्यूज़ पढ़ें'
      },
      targetTab: 'blog' as const
    },
    {
      id: 'slide-2',
      // Generated Centenary Square cooling canopy image
      imageUrl: '/src/assets/images/cooling_canopy_1780115773352.png',
      badge: {
        en: 'CLIMATE RESILIENCE',
        zh: '气候韧性与防暑',
        hn: 'जलवायु शमन प्रयास'
      },
      title: {
        en: 'Centenary Square Cold Canopy',
        zh: '百年广场移动森林降温阵列',
        hn: 'सेंटेनरी स्क्वायर हीट कूलिंग'
      },
      description: {
        en: 'Combatting urban heat islands exceeding 52°C with Eucalyptus potted forests, shading sails, and active purified graywater cooling mist sprayers.',
        zh: '引入高密度的桉树盆栽移动林、遮阳蓬和中水净化喷雾系统，缓解极端盛夏酷暑，降低地表物理温度。',
        hn: 'eucalyptus पेड़ वनों, छाया आवरणों और कूलिंग धुंध स्प्रेयर द्वारा शहर के संचय तापमान को मात दें।'
      },
      actionText: {
        en: 'Explore Micro-Polls',
        zh: '查看微型投票',
        hn: 'पल्स पोल देखें'
      },
      targetTab: 'voting' as const
    },
    {
      id: 'slide-3',
      // Generated digital twin overlay image
      imageUrl: '/src/assets/images/digital_twin_1780115794410.png',
      badge: {
        en: 'SMART CITY GIS',
        zh: '三维智能数字孪生',
        hn: 'स्मार्ट सिटी डिजिटल ट्विन'
      },
      title: {
        en: 'AI-Powered Urban Twin',
        zh: 'AI 赋能城市数字孪生规划',
        hn: 'एआई-संचालित शहरी योजना twin'
      },
      description: {
        en: 'Harness real-time zoning intelligence, query town codes instantly with our smart Chatbot, and preview local spatial council briefs.',
        zh: '汇聚即时土地性质参数，通过 AI Planning Assistant 专家问答系统，极速评估建筑改扩建方案。',
        hn: 'उन्नत 3D ज़ोनिंग डेटा, टाउन कोड प्रश्नों के लिए एआई चैटबॉट, और स्थानीय स्थानिक परिषद ब्रीफिंग देखें।'
      },
      actionText: {
        en: 'Consult AI Planner',
        zh: '咨询 AI 规划助手',
        hn: 'एआई प्लानर से पूछें'
      },
      targetTab: 'chatbot' as const
    }
  ];

  // Auto-play interval for the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Translations helper inside the component
  const t = (key: keyof typeof HOME_TRANSLATIONS) => {
    return HOME_TRANSLATIONS[key][language] || HOME_TRANSLATIONS[key]['en'];
  };

  return (
    <div className="space-y-10 animate-fade-in" id="homepage-root">
      
      {/* 1. HERO SLIDER */}
      <div className="relative h-[28rem] sm:h-[32rem] w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-950" id="homepage-carousel-slider">
        {/* Carousel Slides */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent z-20" />
              <img
                src={slide.imageUrl}
                alt={slide.title[language] || slide.title['en']}
                className="w-full h-full object-cover select-none scale-105 transform hover:scale-100 transition-transform duration-[8000ms]"
                referrerPolicy="no-referrer"
              />

              {/* Slide Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-10 md:p-12 text-white flex flex-col justify-end max-w-4xl">
                <span className="inline-block text-[10px] font-mono font-bold text-teal-400 bg-teal-950/80 border border-teal-800 px-3 py-1 rounded-full uppercase tracking-widest mb-3 max-w-max">
                  {slide.badge[language] || slide.badge['en']}
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-medium tracking-tight mb-2">
                  {slide.title[language] || slide.title['en']}
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm md:text-base tracking-normal max-w-2xl leading-relaxed mb-6 font-sans">
                  {slide.description[language] || slide.description['en']}
                </p>
                <div>
                  <button
                    onClick={() => onNavigate(slide.targetTab)}
                    className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all hover:translate-x-1 duration-200"
                  >
                    {slide.actionText[language] || slide.actionText['en']}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slide Controls (Arrows & Indicators) */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-4">
          {/* Next/Prev buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrevSlide}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/10 transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/10 transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1.5 bg-neutral-900/50 backdrop-blur-md border border-white/10 p-1.5 rounded-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'bg-teal-400 w-4' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. WELCOME STATEMENT & BRIEF INFORMATION OF SITE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-neutral-200/60 p-8 sm:p-10 rounded-2xl shadow-xs" id="welcome-intro-block">
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-widest font-sans">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            {t('platformIntroduction')}
          </div>
          <h1 className="text-3xl font-display font-medium text-neutral-800 tracking-tight leading-none" id="welcome-main-heading">
            {translateText('appName')} &mdash; {t('siteMissionTitle')}
          </h1>
          <p className="text-neutral-500 text-sm font-sans leading-relaxed">
            {t('descriptionFirst')}
          </p>
          <p className="text-neutral-500 text-sm font-sans leading-relaxed">
            {t('descriptionSecond')}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-400 font-mono pt-2">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
              {t('dataSecurityBadge')}
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4 text-teal-500 shrink-0" />
              {t('councilIntegratedBadge')}
            </span>
            <span className="flex items-center gap-1">
              <Globe2 className="w-4 h-4 text-teal-500 shrink-0" />
              {t('multilingualBadge')}
            </span>
          </div>
        </div>

        {/* Stat Highlights Card right side */}
        <div className="md:col-span-4 bg-neutral-50 border border-neutral-100 p-6 rounded-2xl flex flex-col justify-between space-y-6" id="welcome-stat-panel">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-600 uppercase tracking-widest font-sans border-b border-neutral-200 pb-2">
              {t('smartCityStats')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-neutral-400 uppercase font-sans font-medium">{t('engagementRate')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-neutral-800">84.3%</span>
                  <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+5.1%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase font-sans font-medium">{t('activeProposals')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-neutral-800">42</span>
                  <span className="text-neutral-400 text-[10px]">{t('communityLed')}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase font-sans font-medium">{t('repliesResolved')}</p>
                <span className="text-2xl font-mono font-bold text-neutral-800">1,854</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-teal-50 text-teal-800 p-3 rounded-xl border border-teal-100 text-[10px] font-sans">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{t('regulatoryNotes')}</span>
          </div>
        </div>
      </div>

      {/* 3. PLATFORM CORE MODULES NAVIGATION GRID */}
      <div className="space-y-6" id="homepage-platforms-grid">
        <div className="space-y-1.5 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-medium text-neutral-800 tracking-tight">
            {t('modulesHeading')}
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm font-sans">
            {t('modulesSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Interactive GIS Map */}
          <div 
            onClick={() => {
              // The map itself is visible layout-wide on the left.
              // Instruct users to scroll or use left block. Or simply guide them.
              const el = document.getElementById('left-layout-column');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group block bg-white border border-neutral-200/60 p-5 rounded-2xl hover:border-teal-500 hover:shadow-md transition-all cursor-pointer relative"
            id="nav-card-gis"
          >
            <div className="h-10 w-10 flex items-center justify-center bg-teal-50 text-teal-600 border border-teal-100 rounded-xl mb-4 group-hover:bg-teal-600 group-hover:text-white transition-all">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-1 font-sans">
              {t('gisMapTitle')}
            </h3>
            <p className="text-neutral-500 text-xs font-sans leading-relaxed mb-4">
              {t('gisMapDesc')}
            </p>
            <span className="text-[10px] font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1 uppercase font-sans mt-auto">
              {t('highlightGisAction')}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 2: Pulse Polling & Expert Pitches */}
          <div 
            onClick={() => onNavigate('voting')}
            className="group block bg-white border border-neutral-200/60 p-5 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
            id="nav-card-voting"
          >
            <div className="h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Vote className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-1 font-sans">
              {t('pollsTitle')}
            </h3>
            <p className="text-neutral-500 text-xs font-sans leading-relaxed mb-4">
              {t('pollsDesc')}
            </p>
            <span className="text-[10px] font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 uppercase font-sans mt-auto">
              {t('highlightActionText')}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 3: AI Urban Planning Assistant */}
          <div 
            onClick={() => onNavigate('chatbot')}
            className="group block bg-white border border-neutral-200/60 p-5 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer relative"
            id="nav-card-chatbot"
          >
            <div className="h-10 w-10 flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="absolute top-4 right-4 text-[9px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Live AI
            </span>
            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-1 font-sans">
              {t('aiAssistantTitle')}
            </h3>
            <p className="text-neutral-500 text-xs font-sans leading-relaxed mb-4">
              {t('aiAssistantDesc')}
            </p>
            <span className="text-[10px] font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 uppercase font-sans mt-auto">
              {t('highlightAIAction')}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          {/* Card 4: Community Blog & Bullettin */}
          <div 
            onClick={() => onNavigate('community')}
            className="group block bg-white border border-neutral-200/60 p-5 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
            id="nav-card-community"
          >
            <div className="h-10 w-10 flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-1 font-sans">
              {t('communityBlogTitle')}
            </h3>
            <p className="text-neutral-500 text-xs font-sans leading-relaxed mb-4">
              {t('communityBlogDesc')}
            </p>
            <span className="text-[10px] font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 uppercase font-sans mt-auto">
              {t('highlightCommunityAction')}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* 4. PARRAMATTA VISION FOCUS STATEMENT BLOCK */}
      <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-10 border border-neutral-800 relative overflow-hidden" id="governance-alignment-block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.1),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-white text-xl sm:text-2xl font-display font-medium tracking-tight">
              {t('smartCityVisionHeading')}
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-sans leading-relaxed">
              {t('smartCityGoalText')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3">
                <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-teal-950/80 text-teal-400 border border-teal-900 font-mono text-xs font-bold">1</div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-sans">{t('focusWaterwaysTitle')}</h4>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">{t('focusWaterwaysDesc')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-teal-950/80 text-teal-400 border border-teal-900 font-mono text-xs font-bold">2</div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-sans">{t('focusThermalTitle')}</h4>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">{t('focusThermalDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-center space-y-3" id="briefing-promo-box">
            <Calendar className="w-8 h-8 text-teal-400 animate-pulse" />
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-widest font-sans">
              {t('upcomingBriefingHeader')}
            </h4>
            <p className="text-[10px] text-neutral-400 font-sans tracking-wide">
              {t('upcomingBriefingDesc')}
            </p>
            <button 
              onClick={() => onNavigate('blog')}
              className="text-[10px] font-sans font-bold bg-white text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-all uppercase tracking-wider cursor-pointer shadow-xs"
            >
              {t('upcomingActionBtn')}
            </button>
          </div>
        </div>
      </div>



    </div>
  );
};

// High quality UI dictionary supporting English, Simplified Chinese, and Hindi
const HOME_TRANSLATIONS = {
  platformIntroduction: {
    en: 'Civic Platform Introduction',
    zh: '城市市民协作平台推介',
    hn: 'नागरिक मंच का परिचय'
  },
  siteMissionTitle: {
    en: 'Digital Ecosystem & City Showcase',
    zh: '数字城市生态与智能橱窗',
    hn: 'डिजिटल पारिस्थितिकी तंत्र और शहर शो'
  },
  descriptionFirst: {
    en: 'Welcome to Parravision, the official smart city civic engagement application for the City of Parramatta. This platform bridges the physical assets of Parramatta with full-stack digital civic technology, allowing people who work, study, or reside here to engage seamlessly in local urban design reviews.',
    zh: '欢迎来到帕拉米眼 (Parravision)，这是专为帕拉马塔市打造的智能城市民意互动协作平台。该系统将帕拉马塔的真实物理地标与数字城市规划科技无缝衔接，使本地工作、学习、或居住的市民能够毫无障碍地参与各板块城建审讯。',
    hn: 'पैराविज़न में स्वागत है, जो पैरामाटा शहर के लिए आधिकारिक स्मार्ट सिटी नागरिक जुड़ाव अनुप्रयोग है। यह मंच पैरामाटा के भौतिक संसाधनों को डिजिटल नागरिक प्रौद्योगिकी के साथ जोड़ता है।'
  },
  descriptionSecond: {
    en: 'Through dynamic geographical mapping (GIS overlay), micro-pulse polling, on-demand AI code chatbots, and public community blogs, you hold real influence. Check our active projects such as the Centenary Square Mist forest and Parramatta River eco-filtration corridor, and collaborate with town council decisions with our customized design frameworks.',
    zh: '通过互动的地理地图（GIS覆盖图层）、微脉搏民意调查、即时 AI 建筑区划机器人，以及市民自治博客，您能发挥真正的决策影响力。快速点击百年广场大暑防沙森林、帕拉马塔河生态路灯走廊等明星城建项目，协同推进市议会决策。',
    hn: 'भौगोलिक मानचित्रण (GIS ओवरले), माइक्रो-पल्स पोलिंग, और एआई चैटबॉट्स के माध्यम से, आप शहर और नगर योजना निर्णयों को प्रभावित कर सकते हैं।'
  },
  dataSecurityBadge: {
    en: 'Secure Local Storage Data',
    zh: '本地客户端持久安全数据',
    hn: 'सुरक्षित स्थानीय डेटा संग्रहण'
  },
  councilIntegratedBadge: {
    en: 'Council Consulted Framework',
    zh: '对接议会公开审讯条例',
    hn: 'परिषद विचार-विमर्श ढांचा'
  },
  multilingualBadge: {
    en: 'Native Multilingual Translatability',
    zh: '原生中文/印地语三语互译',
    hn: 'बहुभाषी अनुवाद'
  },
  smartCityStats: {
    en: 'Live Engagement Metrics',
    zh: '实态协同参与指标',
    hn: 'सक्रिय नागरिक आँकड़े'
  },
  engagementRate: {
    en: 'Civic Engagement Rate',
    zh: '市民总回馈参与比率',
    hn: 'नागरिक सहभागिता दर'
  },
  activeProposals: {
    en: 'Active Expert Proposals',
    zh: '进驻及审核中的专家建言',
    hn: 'सक्रिय विशेषज्ञ प्रस्ताव'
  },
  communityLed: {
    en: 'Community Led',
    zh: '社区主导',
    hn: 'समुदाय के नेतृत्व में'
  },
  repliesResolved: {
    en: 'AI Inquiries Handled',
    zh: 'AI 规约咨询累积承办量',
    hn: 'एआई प्रश्न संसाधित'
  },
  regulatoryNotes: {
    en: 'All civic projections are automatically cross-checked with City of Parramatta Council Codes.',
    zh: '所有由市民提交的提案将自动对接帕拉马塔市议会相关土地区划条规库。',
    hn: 'सभी नागरिक अनुमानों को स्वचालित रूप से शहर के नियमों के साथ जांचा जाता है।'
  },
  modulesHeading: {
    en: 'Discover Our Smart Core Utilities',
    zh: '探索帕拉米眼智能核心板块',
    hn: 'हमारे स्मार्ट कोर यूटिलिटी का पता लगाएं'
  },
  modulesSubheading: {
    en: 'Each system connects structural civic requirements with interactive design interfaces. Toggle them to explore.',
    zh: '每个子系统将特定的城市政策规约同互动交互相交。点击卡片可快速进行功能页面跳转。',
    hn: 'प्रत्येक प्रणाली इंटरैक्टिव डिजाइनों के साथ जुड़ती है। अन्वेषण करने के लिए उन्हें टॉगल करें।'
  },
  gisMapTitle: {
    en: 'Interactive GIS Map',
    zh: '互动 GIS 三维地图',
    hn: 'इंटरैक्टिव सीबीडी मानचित्र'
  },
  gisMapDesc: {
    en: 'Review thermal heat sensors, warning corridors, and community project counts directly over crucial hot zones.',
    zh: '在左侧三维地理覆盖网格中，点击高亮热区，实时盘点热浪传感器、安防路灯覆盖与本地项目进度。',
    hn: 'सीधे अत्यधिक गर्म क्षेत्रों पर थर्मल सेंसर, चेतावनी गलियारा, और स्थानीय परियोजना काउंट की समीक्षा करें।'
  },
  highlightGisAction: {
    en: 'Filter via Left Map',
    zh: '直接点击左侧地图筛选',
    hn: 'बाएँ मानचित्र द्वारा फ़िल्टर'
  },
  pollsTitle: {
    en: 'Pulse voting & Pitches',
    zh: '微民调投票与专家建言',
    hn: 'पल्स वोटिंग और पिचें'
  },
  pollsDesc: {
    en: 'Cast your vote regarding pedestrian-friendly boundaries, or submit detailed solutions to the pitching dynamic feed.',
    zh: '针对中央商办区人行步道限速发声表决，或利用结构化方案向议会递交城市空间升级方案。',
    hn: 'पैदल यात्री-अनुकूल सीमाओं के संबंध में मतदान करें, या पिचिंग फ़ीड में नागरिक समाधान जमा करें।'
  },
  highlightActionText: {
    en: 'Cast Your Ballots',
    zh: '立刻参与民调与建言',
    hn: 'मतदान करें'
  },
  aiAssistantTitle: {
    en: 'AI Town Planner Chat',
    zh: 'AI 城市规划决策小助手',
    hn: 'एआई टाउन प्लानर चैट'
  },
  aiAssistantDesc: {
    en: 'Instantly consult zoning rules, municipal parameters, and council agenda briefs with fully grounded smart logic.',
    zh: '实时咨询城市发展区划指标、容积率、退界规约，全自动提炼市议会繁琐的长篇会议摘要。',
    hn: 'पूरी तरह से प्रमाणित स्मार्ट तर्क के साथ ज़ोनिंग नियमों और परिषद कार्यवृत्त से परामर्श लें।'
  },
  highlightAIAction: {
    en: 'Start Chat Consultation',
    zh: '启动 AI 规约对话咨询',
    hn: 'चैट परामर्श शुरू करें'
  },
  communityBlogTitle: {
    en: 'Public Community Blog',
    zh: '社区微型快讯墙博客',
    hn: 'सार्वजनिक समुदाय ब्लॉग'
  },
  communityBlogDesc: {
    en: 'Participate in citizen reports, document active local issues, and post text-only news verified locally.',
    zh: '鼓励居民自主采编现场快讯，记录身边的城建环境变化，发帖讨论河畔治安等生活琐事。',
    hn: 'नाकारिक रिपोर्टों में भाग लें, स्थानीय मुद्दों पर पोस्ट करें और समाचार साझा करें।'
  },
  highlightCommunityAction: {
    en: 'Join Community Forum',
    zh: '加入社区自治论坛',
    hn: 'समुदाय मंच में शामिल हों'
  },
  smartCityVisionHeading: {
    en: 'The Parramatta 2026-2030 Smart Vision',
    zh: '帕拉马塔 2026-2030 智慧城市行动纲要',
    hn: 'पैरामाटा 2026-2030 स्मार्ट विज़न'
  },
  smartCityGoalText: {
    en: 'Our vision for the Greater Sydney Central CBD is to foster a climate-resilient, pedestrian-first, culturally authentic capital. In collaboration with Dharug representatives, ecologists, and design engineering firms, our key objectives seek to mitigate urban heat and activate night aesthetics responsibly.',
    zh: '我们对大悉尼中央商务区核心区的未来展望，是打造成一个低热岛负荷、行人为先、文化真实性突出的西部首都。在与达鲁格原住民长老、环保学者和工程事务所联合规划下，力推低噪凉爽的城市绿洲、夜色智能灯光和自适应街道微气候建设。',
    hn: 'ग्रेटर सिडनी सेंट्रल सीबीडी के लिए हमारा दृष्टिकोण एक जलवायु-लचीला, पैदल यात्री-प्रथम और सांस्कृतिक रूप से प्रामाणिक राजधानी को बढ़ावा देना है।'
  },
  focusWaterwaysTitle: {
    en: 'Fauna-Preserving Light Networks',
    zh: '夜行性动物友好型路灯网',
    hn: 'जीव-संरक्षण प्रकाश नेटवर्क'
  },
  focusWaterwaysDesc: {
    en: 'Adaptive LED grids that dim to protect critical bat circles along the Foreshore while reducing crime risks by 28%.',
    zh: '借助红外传感器，自适应调节河道走廊路灯色温，避开稀有微型蝙蝠夜间复苏频段，保障夜行安全。',
    hn: 'Foreshore के किनारे रात की सुरक्षा और दुर्लभ नदी चमगादड़ों के संरक्षण के बीच एक संतुलन प्राप्त करना।'
  },
  focusThermalTitle: {
    en: 'Active Thermal Shading Mist Sails',
    zh: '自净化中水雾化降温蓬',
    hn: 'थर्मल शेडिंग मिस्ट सेल'
  },
  focusThermalDesc: {
    en: 'Purified misting structures linked with fountains to lower concrete pavement temperates by up to 4.5°C during maximum heat.',
    zh: '抽取并过滤地表蓄水，在百年广场等酷暑重灾区定时布设环保温凉细密喷雾，迅速降温 4.5℃。',
    hn: 'दशकों की गर्मी में कंक्रीट फुटपाथ के तापमान को 4.5°C तक कम करने के लिए स्वचालित मिस्ट नोड्स का निर्माण।'
  },
  upcomingBriefingHeader: {
    en: 'Next Scheduled Public Briefing',
    zh: '下一场议会公开辩论听证会',
    hn: 'अगली निर्धारित सार्वजनिक ब्रीफिंग'
  },
  upcomingBriefingDesc: {
    en: 'Parramatta CBD Waterfront and thermal strategies review with Councillor Evans.',
    zh: 'Claire Evans 议员关于中央商务区防暑与水资源环保战略论证。',
    hn: 'पार्षद क्लेयर इवांस के साथ सीबीडी वाटरफ्रंट थर्मल शमन समीक्षा।'
  },
  upcomingActionBtn: {
    en: 'Review Briefing Notes',
    zh: '速览本次会议纪要提要',
    hn: 'ब्रीफिंग नोट्स की समीक्षा करें'
  }
};

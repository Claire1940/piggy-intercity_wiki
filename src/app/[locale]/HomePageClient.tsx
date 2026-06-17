"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Castle,
  Check,
  ChevronDown,
  Compass,
  Gem,
  Gift,
  GraduationCap,
  MapPin,
  Rocket,
  Sparkles,
  Swords,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  if (linkData) {
    const href = locale === "en" ? linkData.url : `/${locale}${linkData.url}`;
    return (
      <Link
        href={href}
        className={`${className || ""} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

// Module header with an icon badge + title + intro
function ModuleHeader({
  icon: Icon,
  linkData,
  title,
  intro,
  locale,
}: {
  icon: React.ComponentType<{ className?: string }>;
  linkData: { url: string; title: string } | null | undefined;
  title: string;
  intro: string;
  locale: string;
}) {
  return (
    <div className="mb-8 text-center scroll-reveal md:mb-12">
      <div className="mb-3 flex items-center justify-center gap-3 md:mb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))] md:h-12 md:w-12">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </span>
        <h2 className="text-3xl font-bold md:text-5xl">
          <LinkedTitle linkData={linkData} locale={locale}>
            {title}
          </LinkedTitle>
        </h2>
      </div>
      <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
        {intro}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.piggy-intercity.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Piggy Intercity Wiki",
        description:
          "Complete Piggy Intercity Wiki covering codes, quests, map locations, items, weapons, base building, characters, choices, and beginner survival tips for the choice-driven open world RPG on Roblox.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Piggy Intercity - Choice-Driven Open World RPG",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Piggy Intercity Wiki",
        alternateName: "Piggy Intercity",
        url: siteUrl,
        description:
          "Complete Piggy Intercity Wiki resource hub for codes, quests, map, items, weapons, base building, characters, choices, and survival guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Piggy Intercity Wiki - Choice-Driven Open World RPG",
        },
        sameAs: [
          "https://www.roblox.com/games/86852362398411/Piggy-Intercity",
          "https://www.roblox.com/communities/12874996/piggy-intercity",
          "https://discord.com/invite/piggy",
          "https://www.reddit.com/r/RobloxPiggy/",
          "https://www.youtube.com/@DaMiniToon",
          "https://x.com/DaRealMiniToon",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Piggy: Intercity",
        gamePlatform: ["Roblox", "PC", "Mobile", "Xbox"],
        applicationCategory: "Game",
        genre: ["RPG", "Survival", "Open World", "Multiplayer"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 16,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/86852362398411/Piggy-Intercity",
        },
      },
      {
        "@type": "VideoObject",
        name: "Piggy: Intercity - Official Overview Trailer",
        description:
          "Official Piggy: Intercity overview trailer by MiniToon showcasing the choice-driven open world RPG gameplay in Evalia.",
        uploadDate: "2025-04-25",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/nzvMQLvB4Ac",
        url: "https://www.youtube.com/watch?v=nzvMQLvB4Ac",
      },
    ],
  };

  // Demo rewards accordion state
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 border bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] md:mb-6 md:px-4 md:py-2"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-medium md:text-sm">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold leading-[1.05] sm:text-5xl md:mb-6 md:text-7xl">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[hsl(var(--nav-theme))] text-white rounded-lg text-base font-semibold transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)] md:px-8 md:py-4 md:text-lg"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/86852362398411/Piggy-Intercity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border rounded-lg text-base font-semibold transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-lg"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域之后 */}
      <section className="px-4 py-10 md:py-12">
        <div className="container mx-auto max-w-5xl scroll-reveal">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="nzvMQLvB4Ac"
              title="Piggy: Intercity - Official Overview Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（位于视频区之后、Latest Updates 之前） */}
      <section className="px-4 py-14 bg-white/[0.02] md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center scroll-reveal md:mb-12">
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <a href="#codes" onClick={(e) => { e.preventDefault(); scrollToSection("codes"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "0ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[0].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>
            <a href="#release-play-link" onClick={(e) => { e.preventDefault(); scrollToSection("release-play-link"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "50ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[1].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>
            <a href="#beginner-guide" onClick={(e) => { e.preventDefault(); scrollToSection("beginner-guide"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "100ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[2].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>
            <a href="#demo-rewards" onClick={(e) => { e.preventDefault(); scrollToSection("demo-rewards"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "150ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[3].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>
            <a href="#quests-choices" onClick={(e) => { e.preventDefault(); scrollToSection("quests-choices"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "200ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[4].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>
            <a href="#map-locations" onClick={(e) => { e.preventDefault(); scrollToSection("map-locations"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "250ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[5].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>
            <a href="#items-weapons" onClick={(e) => { e.preventDefault(); scrollToSection("items-weapons"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "300ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[6].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>
            <a href="#base-minigames" onClick={(e) => { e.preventDefault(); scrollToSection("base-minigames"); }} className="group block rounded-xl border border-border bg-card p-4 text-left cursor-pointer transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] scroll-reveal md:p-6" style={{ animationDelay: "350ms" }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                <DynamicIcon name={t.tools.cards[7].icon} className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold md:text-base">{t.tools.cards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Codes and Rewards (code-cards) */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Gift}
            linkData={moduleLinkMap["piggyCodes"]}
            title={t.modules.piggyCodes.title}
            intro={t.modules.piggyCodes.intro}
            locale={locale}
          />
          <div className="grid grid-cols-1 gap-4 scroll-reveal md:grid-cols-2 lg:grid-cols-3">
            {t.modules.piggyCodes.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col p-5 bg-white/5 border border-border rounded-xl transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-2.5 py-1 text-xs font-medium">
                    <Gift className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
                    {item.label}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-[hsl(var(--nav-theme-light))]">
                  {item.status}
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Reward: </span>
                  {item.reward}
                </p>
                <p className="mb-2 text-sm text-muted-foreground">
                  {item.howToGet}
                </p>
                <p className="mt-auto pt-2 text-xs text-muted-foreground/80 border-t border-border">
                  {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 4: 模块之间的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Release Date and Play Link (table) */}
      <section id="release-play-link" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Rocket}
            linkData={moduleLinkMap["piggyReleasePlay"]}
            title={t.modules.piggyReleasePlay.title}
            intro={t.modules.piggyReleasePlay.intro}
            locale={locale}
          />
          <div className="overflow-hidden rounded-xl border border-border scroll-reveal">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <div className="col-span-2">Page</div>
              <div className="col-span-3">Official Name</div>
              <div className="col-span-4">Purpose</div>
              <div className="col-span-3">Player Action</div>
            </div>
            {t.modules.piggyReleasePlay.items.map((item: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 px-6 py-5 border-b border-border last:border-b-0 md:grid-cols-12 md:gap-4 md:items-center"
              >
                <div className="md:col-span-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-2.5 py-1 text-xs font-medium">
                    {item.page}
                  </span>
                </div>
                <div className="md:col-span-3 font-semibold">
                  {item.officialName}
                </div>
                <div className="md:col-span-4 text-sm text-muted-foreground">
                  {item.purpose}
                </div>
                <div className="md:col-span-3 text-sm text-muted-foreground">
                  {item.playerAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Beginner Guide (step-by-step) */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={GraduationCap}
            linkData={moduleLinkMap["piggyBeginnerGuide"]}
            title={t.modules.piggyBeginnerGuide.title}
            intro={t.modules.piggyBeginnerGuide.intro}
            locale={locale}
          />
          <div className="space-y-3 scroll-reveal md:space-y-4">
            {t.modules.piggyBeginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 p-4 bg-white/5 border border-border rounded-xl transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:gap-4 md:p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] md:h-12 md:w-12">
                  <span className="text-base font-bold text-[hsl(var(--nav-theme-light))] md:text-xl">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold md:mb-2 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mb-1 text-sm font-medium text-[hsl(var(--nav-theme-light))]">
                    {step.action}
                  </p>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Demo Rewards and Save Data (accordion) */}
      <section id="demo-rewards" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Gem}
            linkData={moduleLinkMap["piggyDemoRewards"]}
            title={t.modules.piggyDemoRewards.title}
            intro={t.modules.piggyDemoRewards.intro}
            locale={locale}
          />
          <div className="space-y-2 scroll-reveal">
            {t.modules.piggyDemoRewards.faqs.map((faq: any, index: number) => (
              <div
                key={index}
                className="overflow-hidden border border-border rounded-xl"
              >
                <button
                  onClick={() =>
                    setFaqExpanded(faqExpanded === index ? null : index)
                  }
                  className="flex items-center justify-between w-full p-5 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${faqExpanded === index ? "rotate-180" : ""}`}
                  />
                </button>
                {faqExpanded === index && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 模块之间的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 5: Quests and Story Choices (step-by-step) */}
      <section id="quests-choices" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Compass}
            linkData={moduleLinkMap["piggyQuestsChoices"]}
            title={t.modules.piggyQuestsChoices.title}
            intro={t.modules.piggyQuestsChoices.intro}
            locale={locale}
          />
          <div className="space-y-3 scroll-reveal md:space-y-4">
            {t.modules.piggyQuestsChoices.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 p-4 bg-white/5 border border-border rounded-xl transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:gap-4 md:p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] md:h-12 md:w-12">
                  <span className="text-base font-bold text-[hsl(var(--nav-theme-light))] md:text-xl">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold md:mb-2 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                  <p className="flex items-start gap-2 text-sm text-[hsl(var(--nav-theme-light))]">
                    <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                    {step.playerTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Map and Locations (card-list) */}
      <section id="map-locations" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MapPin}
            linkData={moduleLinkMap["piggyMapLocations"]}
            title={t.modules.piggyMapLocations.title}
            intro={t.modules.piggyMapLocations.intro}
            locale={locale}
          />
          <div className="grid grid-cols-1 gap-4 scroll-reveal md:grid-cols-2 lg:grid-cols-3">
            {t.modules.piggyMapLocations.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-border rounded-xl transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold">{item.name}</h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {item.type}
                  </span>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">Best for: </span>
                  {item.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 7: Items and Weapons Tier List (tier-grid) */}
      <section id="items-weapons" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Swords}
            linkData={moduleLinkMap["piggyItemsWeapons"]}
            title={t.modules.piggyItemsWeapons.title}
            intro={t.modules.piggyItemsWeapons.intro}
            locale={locale}
          />
          <div className="space-y-6 scroll-reveal">
            {t.modules.piggyItemsWeapons.tiers.map((tier: any, ti: number) => (
              <div key={ti}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme))] text-white font-bold">
                    {tier.tier}
                  </span>
                  <h3 className="font-bold text-lg text-[hsl(var(--nav-theme-light))]">
                    {tier.label}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {tier.entries.map((entry: any, ei: number) => (
                    <div
                      key={ei}
                      className="p-4 bg-white/5 border border-border rounded-xl transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                        <span className="font-semibold">{entry.name}</span>
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                          {entry.role}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Base Building and Minigames (card-list) */}
      <section id="base-minigames" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Castle}
            linkData={moduleLinkMap["piggyBaseMinigames"]}
            title={t.modules.piggyBaseMinigames.title}
            intro={t.modules.piggyBaseMinigames.intro}
            locale={locale}
          />
          <div className="grid grid-cols-1 gap-4 scroll-reveal md:grid-cols-2">
            {t.modules.piggyBaseMinigames.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-border rounded-xl transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Castle className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold text-[hsl(var(--nav-theme-light))]">
                    {item.name}
                  </h3>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {item.category}
                  </span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">Player value: </span>
                  {item.playerValue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/piggy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/DaRealMiniToon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/RobloxPiggy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@DaMiniToon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

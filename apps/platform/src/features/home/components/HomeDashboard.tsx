"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BookOpen,
  BookOpenCheck,
  BookText,
  Bookmark,
  Calculator,
  CalendarDays,
  Check,
  Circle,
  CircleDot,
  Bot,
  ChevronRight,
  Clock3,
  Compass,
  FileText,
  Flame,
  GraduationCap,
  Hand,
  HandHeart,
  Headphones,
  Heart,
  Landmark,
  MessageCircle,
  Moon,
  NotebookPen,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sun,
  Sunrise,
  Sunset,
  UsersRound,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { isAvailableRoute } from "@/core/config/env";
import { useTranslations } from "@/core/i18n";
import type {
  ChallengeViewModel,
  HomeViewModel,
  IconKey,
  SectionStatus,
  ToolKey,
} from "../types/home-view-model";

const icons: Record<IconKey, LucideIcon> = {
  bookOpen: BookOpen,
  bookCheck: BookOpenCheck,
  bookText: BookText,
  landmark: Landmark,
  hands: HandHeart,
  settings: Activity,
  graduation: GraduationCap,
  users: UsersRound,
  headphones: Headphones,
  heart: Heart,
  calculator: Calculator,
  compass: Compass,
  clock: Clock3,
  beads: CircleDot,
  calendar: CalendarDays,
  quran: BookOpen,
  bookmark: Bookmark,
  note: NotebookPen,
  discussion: MessageCircle,
  article: FileText,
};

const prayerIcons: Record<HomeViewModel["prayers"]["items"][number]["key"], LucideIcon> = {
  fajr: Sunrise,
  dhuhr: Sun,
  asr: Sun,
  maghrib: Sunset,
  isha: Moon,
};

const toolLabels: Record<ToolKey, { title: "zakatTitle" | "inheritanceTitle" | "qiblaTitle" | "prayerTimeTitle" | "tasbihTitle" | "hijriCalendarTitle"; subtitle: "calculator" | "finder" | "checkNow" | "digital" | "calendar" }> = {
  zakat: { title: "zakatTitle", subtitle: "calculator" },
  inheritance: { title: "inheritanceTitle", subtitle: "calculator" },
  qibla: { title: "qiblaTitle", subtitle: "finder" },
  prayerTime: { title: "prayerTimeTitle", subtitle: "checkNow" },
  tasbih: { title: "tasbihTitle", subtitle: "digital" },
  hijriCalendar: { title: "hijriCalendarTitle", subtitle: "calendar" },
};

function RoutedControl({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className: string;
  children: ReactNode;
  label: string;
}) {
  return isAvailableRoute(href) ? (
    <Link className={className} href={href} aria-label={label}>{children}</Link>
  ) : (
    <button className={className} type="button" aria-label={label} aria-disabled="true">{children}</button>
  );
}

function SectionNotice({ status }: { status: SectionStatus }) {
  const { home } = useTranslations();
  if (status === "ready" || status === "empty") return null;
  const notice = status === "loading" ? home.loading : home.error;
  return <p className={`hv-section-notice is-${status}`} role={status === "error" ? "alert" : "status"}>{notice}</p>;
}

function SectionHeading({
  id,
  title,
  action,
  mobileTitle,
}: {
  id: string;
  title: string;
  action: string;
  mobileTitle?: string;
}) {
  const { t } = useTranslations();
  return (
    <div className="hv-section-heading">
      <h2 id={id}>{mobileTitle ? <><span className="hv-heading-desktop">{title}</span><span className="hv-heading-mobile">{mobileTitle}</span></> : title}</h2>
      <button type="button" aria-disabled="true">{action || t("viewAll")}{id === "explore-title" && <ChevronRight aria-hidden="true" />}</button>
    </div>
  );
}

function Icon({ name, className }: { name: IconKey; className?: string }) {
  const Component = icons[name];
  return <Component className={className} aria-hidden="true" />;
}

function formatNumber(value: number, language: string): string {
  return new Intl.NumberFormat(language).format(value);
}

function formatTime(value: string | null, language: string, unavailable: string): string {
  if (!value) return unavailable;
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(2000, 0, 1, Number(match[1]), Number(match[2]));
  return new Intl.DateTimeFormat(language, { hour: "numeric", minute: "2-digit" }).format(date);
}

function DashboardStat({
  icon: IconComponent,
  label,
  value,
  detail,
  className = "",
  title,
  mobileLabel,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  className?: string;
  title?: string;
  mobileLabel?: string;
}) {
  return (
    <article className={`hv-stat-card ${className}`} title={title}>
      <IconComponent aria-hidden="true" />
      <div>
        <small className={mobileLabel ? "hv-stat-label-desktop" : undefined}>{label}</small>
        {mobileLabel && <small className="hv-stat-label-mobile">{mobileLabel}</small>}
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  );
}

function ChallengeProgress({ item, language }: { item: ChallengeViewModel; language: string }) {
  const { home } = useTranslations();
  const valueText = item.progress === null ? home.shortHint : `${item.progress}%`;
  return (
    <div className="hv-challenge-row">
      <span className="hv-challenge-row__icon"><Activity aria-hidden="true" /></span>
      <span className="hv-challenge-row__title">{home[item.key]}</span>
      <span
        className="hv-progress-track hv-progress-track--challenge"
        role="progressbar"
        aria-label={home[item.key]}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={item.progress ?? undefined}
        aria-valuetext={valueText}
      >
        <span style={{ inlineSize: item.progress === null ? "0%" : `${item.progress}%` }} />
      </span>
      <small>{item.progress === null ? home.unavailable : `${formatNumber(item.progress, language)}%`}</small>
    </div>
  );
}

export function HomeDashboard({ viewModel }: { viewModel: HomeViewModel }) {
  const { home: t, shell: labels, language } = useTranslations();
  const [slide, setSlide] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeTrack = viewModel.audio.items[trackIndex] ?? null;

  const formattedCountdown = useMemo(() => {
    if (viewModel.countdownMinutes === null) return t.unavailable;
    const hours = Math.floor(viewModel.countdownMinutes / 60);
    const minutes = viewModel.countdownMinutes % 60;
    return [
      ...(hours > 0 ? [`${formatNumber(hours, language)} ${t.hours}`] : []),
      `${formatNumber(minutes, language)} ${t.minutes}`,
    ].join(" ");
  }, [language, t.hours, t.minutes, t.unavailable, viewModel.countdownMinutes]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const ended = () => setPlaying(false);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", ended);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", ended);
    };
  }, [activeTrack?.source]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const moveTrack = (delta: number) => {
    const next = Math.min(Math.max(trackIndex + delta, 0), viewModel.audio.items.length - 1);
    if (next === trackIndex) return;
    setTrackIndex(next);
    setCurrentTime(0);
    setPlaying(false);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !activeTrack) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const timeLabel = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = formatNumber(Math.floor(value % 60), language).padStart(2, "0");
    return `${formatNumber(minutes, language)}:${seconds}`;
  };

  const slideCount = viewModel.inspiration.items.length;
  const goToSlide = (index: number) => {
    if (slideCount === 0) return;
    setSlide((index + slideCount) % slideCount);
  };

  const prayerName = viewModel.nextPrayer ? t[viewModel.nextPrayer] : t.unavailable;
  const streakValue = viewModel.streakDays === null
    ? t.unavailable
    : formatNumber(viewModel.streakDays, language);

  return (
    <div className="hv-dashboard">
      <section className="hv-journey hv-card" aria-labelledby="journey-title">
        <div className="hv-journey__art" aria-hidden="true" />
        <div className="hv-journey__mobile-greeting">
          <p><Hand aria-hidden="true" />{labels.greeting}{viewModel.displayName ? `, ${viewModel.displayName}` : ""}</p>
          <span>{viewModel.hijriDate} · {viewModel.weekday}</span>
        </div>
        <div className="hv-journey__top">
          <h1 id="journey-title">{t.journey}</h1>
        </div>
        <div className="hv-stat-grid">
          <DashboardStat icon={BookOpen} label={t.continueReading} mobileLabel={t.quickContinue} value={t.unavailable} detail={t.shortHint} className="hv-stat-card--continue" />
          <DashboardStat icon={Flame} label={t.dailyStreak} mobileLabel={t.quickStreak} value={streakValue} detail={viewModel.streakDays === null ? t.shortHint : t.days} className="hv-stat-card--streak" />
          <DashboardStat icon={Clock3} label={t.nextPrayer} mobileLabel={t.quickPrayer} value={prayerName} detail={viewModel.nextPrayer ? formattedCountdown : t.shortHint} className="hv-stat-card--next-prayer" />
          <DashboardStat icon={CalendarDays} label={t.hijriDate} value={viewModel.hijriDayMonth} detail={`${viewModel.hijriYear} ${t.yearSuffix}`} className="hv-stat-card--hijri" title={viewModel.prayerMethod ?? t.prayerMethodPending} />
          <DashboardStat icon={BookText} label={t.dailyAyah} value={t.unavailable} detail={t.shortHint} className="hv-stat-card--ayah" />
          <RoutedControl className="hv-stat-card hv-stat-card--ask" href="/ai" label={t.askAi}>
            <Bot aria-hidden="true" />
            <div>
              <small className="hv-stat-label-desktop">{t.askAi}</small><small className="hv-stat-label-mobile">{t.quickAsk}</small>
              <strong className="hv-stat-value-desktop">{t.askAnything}</strong><strong className="hv-stat-value-mobile">{t.anything}</strong>
              <span className="hv-stat-detail-desktop">{t.learnInstantly}</span><span className="hv-stat-detail-mobile">{t.learnInstantly}</span>
            </div>
          </RoutedControl>
        </div>
      </section>

      <div className="hv-dashboard-columns">
        <div className="hv-dashboard-primary">
          <section className="hv-section-block hv-section-block--inspiration" aria-labelledby="inspiration-title">
            <SectionHeading id="inspiration-title" title={t.dailyInspiration} action={labels.viewAll} />
            <div className="hv-inspiration-row" role="region" aria-roledescription="carousel" aria-label={t.dailyInspiration}>
              {viewModel.inspiration.items.map((item, index) => {
                const content = item.content;
                const IconComponent = icons[item.icon];
                const title = t[item.key];
                return (
                  <article
                    className={`hv-inspiration hv-inspiration--${index}${slide === index ? " is-current" : ""}`}
                    key={item.key}
                    style={content?.imageUrl ? { backgroundImage: `linear-gradient(90deg, color-mix(in srgb, var(--surface) 82%, transparent), color-mix(in srgb, var(--surface) 42%, transparent)), url("${content.imageUrl}")` } : undefined}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${title} ${formatNumber(index + 1, language)}/${formatNumber(slideCount, language)}`}
                  >
                    <div className="hv-inspiration__copy">
                      <span className="hv-inspiration__badge"><IconComponent aria-hidden="true" />{title}</span>
                      {content?.arabic && <p className={`hv-inspiration__arabic ${item.key === "dailyAyah" ? "is-quran" : "is-hadith"}`} lang="ar" dir="rtl">{content.arabic}</p>}
                      <strong className={content?.translation ? undefined : "is-empty"}>{content?.translation ?? t.emptyContentLine}</strong>
                      {content?.reference && <small>{content.reference}</small>}
                    </div>
                  </article>
                );
              })}
              <button className="hv-carousel-button hv-carousel-button--prev" type="button" aria-label={t.previous} onClick={() => goToSlide(slide - 1)}>
                <ArrowLeft aria-hidden="true" />
              </button>
              <button className="hv-carousel-button hv-carousel-button--next" type="button" aria-label={t.next} onClick={() => goToSlide(slide + 1)}>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
            <div className="hv-carousel-dots" role="group" aria-label={t.dailyInspiration}>
              {viewModel.inspiration.items.map((item, index) => (
                <button
                  type="button"
                  key={item.key}
                  aria-label={`${t.goToSlide} ${formatNumber(index + 1, language)}`}
                  aria-pressed={slide === index}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </section>

          <section className="hv-section-block hv-section-block--explore" aria-labelledby="explore-title">
            <SectionHeading id="explore-title" title={t.explore} mobileTitle={t.exploreModules} action={t.allModules} />
            <div className="hv-module-grid">
              {viewModel.modules.map((item) => {
                const title = item.key === "audio" ? t.audio : item.key === "family" ? t.family : labels[item.key];
                const subtitle = t[item.subtitleKey];
                const IconComponent = icons[item.icon];
                return (
                  <RoutedControl
                    className="hv-module-card"
                    href={item.href}
                    key={item.key}
                    label={title}
                  >
                    <IconComponent className="hv-module-icon" aria-hidden="true" />
                    <strong>{title}</strong>
                    <span>{subtitle}</span>
                  </RoutedControl>
                );
              })}
            </div>
          </section>

          <section className="hv-section-block hv-section-block--learning" aria-labelledby="learning-title">
            <SectionHeading id="learning-title" title={t.continueLearning} action={labels.viewAll} />
            <SectionNotice status={viewModel.learning.status} />
            <div className="hv-learning-grid">
              {viewModel.learning.items.map((item) => {
                const IconComponent = icons[item.icon];
                const label = labels[item.key];
                return (
                    <article className="hv-learning-card hv-card" key={item.key}>
                    <div className="hv-learning-cover"><IconComponent aria-hidden="true" /></div>
                    <div className="hv-learning-copy">
                      <strong>{label}</strong>
                      <span>{item.title || t.nothingToContinue}</span>
                      <small>{item.location ?? t.unavailable}</small>
                      <div className="hv-learning-progress">
                      <div
                        className="hv-progress-track"
                        role="progressbar"
                        aria-label={`${label}: ${t.progressLabel}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={item.progress ?? undefined}
                        aria-valuetext={item.progress === null ? t.shortHint : `${formatNumber(item.progress, language)}%`}
                      ><span style={{ inlineSize: `${item.progress ?? 0}%` }} /></div>
                      <b>{item.progress === null ? t.unavailable : `${formatNumber(item.progress, language)}%`}</b>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="hv-dashboard-side" aria-label={t.planner}>
          <section className="hv-panel hv-panel--planner" aria-labelledby="planner-title">
            <SectionHeading id="planner-title" title={t.planner} action={labels.viewAll} />
            {viewModel.prayers.status === "empty" && <p className="hv-panel-note">{t.prayerPendingShort}</p>}
            <ul className="hv-prayer-list">
              {viewModel.prayers.items.map((prayer) => {
                const PrayerIcon = prayerIcons[prayer.key];
                return (
                  <li key={prayer.key}>
                    <span className="hv-prayer-symbol"><PrayerIcon aria-hidden="true" /></span>
                    <strong>{t[prayer.key]}</strong>
                    <span>{formatTime(prayer.time, language, t.unavailable)}</span>
                    {prayer.passed ? <Check aria-label={t.completed} /> : <Circle aria-label={t.upcoming} />}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="hv-panel hv-panel--goals" aria-labelledby="goals-title">
            <SectionHeading id="goals-title" title={t.goals} action={t.edit} />
            <ul className="hv-goal-list">
              {viewModel.goals.items.map((goal) => (
                <li key={goal.key}>
                  <span className={`hv-check${goal.completed ? " is-done" : ""}`}>
                    {goal.completed === true ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}
                  </span>
                  <span>{t[goal.key]}</span>
                  <span className="hv-goal-list__result">
                    {goal.completed === true ? <Check aria-label={t.completed} /> : <Circle aria-label={t.upcoming} />}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="hv-panel hv-panel--progress" aria-labelledby="progress-title">
            <SectionHeading id="progress-title" title={t.progress} action={labels.viewAll} />
            <ul className="hv-progress-list">
              {viewModel.progress.items.map((item) => (
                <li key={item.key}>
                  <Icon name={item.icon} />
                  <span>{t[item.key]}</span>
                  <strong>{item.value === null ? t.unavailable : formatNumber(item.value, language)}</strong>
                </li>
              ))}
            </ul>
            <div className="hv-streak-strip">
              <Flame aria-hidden="true" />
              <span>{t.currentStreak}</span>
              <strong>{streakValue}</strong>
              <small>{t.days}</small>
            </div>
          </section>
        </aside>
      </div>

      <div className="hv-lower-grid">
        <section className="hv-panel hv-panel--tools" aria-labelledby="tools-title">
          <SectionHeading id="tools-title" title={t.islamicTools} action={labels.viewAll} />
          <div className="hv-tools-grid">
            {viewModel.tools.map((item) => {
              const ToolIcon = icons[item.icon];
              const copy = toolLabels[item.key];
              return (
                <RoutedControl className="hv-tool-card" href={item.href} key={item.key} label={t[copy.title]}>
                  <ToolIcon aria-hidden="true" />
                  <strong>{t[copy.title]}</strong>
                  <span>{t[copy.subtitle]}</span>
                </RoutedControl>
              );
            })}
          </div>
        </section>

        <section className="hv-panel hv-listen-panel" aria-labelledby="listen-title">
          <SectionHeading id="listen-title" title={t.listenLearn} action={labels.viewAll} />
          <audio ref={audioRef} src={activeTrack?.source} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
          <div className="hv-reciter">
            <span className="hv-reciter__avatar"><Headphones aria-hidden="true" /></span>
            <div>
              <strong>{activeTrack?.reciter ?? t.noData}</strong>
              <small>{activeTrack?.title ?? t.audioUnavailable}</small>
            </div>
          </div>
          <div className="hv-audio-controls" aria-label={t.listenLearn}>
            <button type="button" aria-label={t.previous} disabled={!activeTrack || trackIndex === 0} onClick={() => moveTrack(-1)}><SkipBack aria-hidden="true" /></button>
            <button type="button" aria-label={playing ? t.pause : t.play} disabled={!activeTrack} onClick={togglePlayback}>
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <button type="button" aria-label={t.next} disabled={!activeTrack || trackIndex >= viewModel.audio.items.length - 1} onClick={() => moveTrack(1)}><SkipForward aria-hidden="true" /></button>
            <span className="hv-audio-time" aria-live="off">{activeTrack ? `${timeLabel(currentTime)} / ${timeLabel(duration)}` : `${t.unavailable} / ${t.unavailable}`}</span>
            <input
              aria-label={t.seek}
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              disabled={!activeTrack}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
            />
            <Volume2 aria-hidden="true" />
            <input aria-label={t.volume} type="range" min={0} max={1} step={0.05} value={volume} disabled={!activeTrack} onChange={(event) => setVolume(Number(event.target.value))} />
            <AudioLines className="hv-audio-wave" aria-hidden="true" />
          </div>
        </section>

        <section className="hv-panel hv-panel--community" aria-labelledby="community-title">
          <SectionHeading id="community-title" title={t.communityTitle} action={labels.viewAll} />
          <ul className="hv-discussion-list">
            {viewModel.community.items.map((item) => {
              const ItemIcon = icons[item.icon];
              return (
                <li key={item.key}>
                  <RoutedControl className="hv-discussion-link" href={item.href} label={t[item.key]}>
                    <ItemIcon aria-hidden="true" />
                    <span>{t[item.key]}<small>{item.summary ?? (item.key === "latestDiscussions" ? t.discussionDesc : item.key === "popularQuestions" ? t.questionsDesc : t.articlesDesc)}</small></span>
                  </RoutedControl>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="hv-panel hv-panel--challenges" aria-labelledby="challenges-title">
          <SectionHeading id="challenges-title" title={t.challenges} action={labels.viewAll} />
          <div className="hv-challenge-list">
            {viewModel.challenges.items.map((item) => <ChallengeProgress key={item.key} item={item} language={language} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

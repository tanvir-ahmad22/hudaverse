"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BookOpenCheck,
  BookText,
  Bookmark,
  Bell,
  ChevronDown,
  Crown,
  Download,
  Globe,
  GraduationCap,
  HandHeart,
  History,
  Home,
  Menu,
  NotebookPen,
  Scale,
  Search,
  Settings,
  Settings2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { isAvailableRoute } from "@/core/config/env";
import { LANGUAGES, useTranslations } from "@/core/i18n";
import { Logo } from "./Logo";
import { bottomTabItems, navigationItems } from "./navigation";

interface ShellUser {
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  premium: boolean | null;
  notificationCount: number | null;
}

const navIcons = {
  home: Home,
  "book-open": BookOpen,
  "book-open-check": BookOpenCheck,
  "book-text": BookText,
  scale: Scale,
  "hands-praying": HandHeart,
  "settings-2": Settings2,
  "graduation-cap": GraduationCap,
  "users-round": UsersRound,
  bookmark: Bookmark,
  "notebook-pen": NotebookPen,
  download: Download,
  history: History,
  settings: Settings,
  user: UserRound,
} as const;

export function SidebarNavItem({
  item,
  active,
  label,
  onNavigate,
}: {
  item: (typeof navigationItems)[number];
  active?: boolean;
  label: string;
  onNavigate?: () => void;
}) {
  const Icon = navIcons[item.icon];
  const className = `hv-nav-item${active ? " is-active" : ""}`;
  if (!isAvailableRoute(item.href)) {
    return (
      <button className={className} aria-disabled="true" type="button">
        <Icon aria-hidden="true" />
        <span>{label}</span>
      </button>
    );
  }
  return (
    <Link
      className={className}
      aria-current={active ? "page" : undefined}
      href={item.href}
      onClick={onNavigate}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

export function PremiumCard() {
  const { home } = useTranslations();
  return (
    <section className="hv-premium" aria-labelledby="premium-title">
      <div className="hv-premium__symbol"><Crown aria-hidden="true" /></div>
      <div className="hv-premium__content">
        <h2 id="premium-title">{home.premiumCardTitle}</h2>
        <p>{home.premiumCardBody}</p>
        <button type="button" aria-disabled="true">{home.upgradeNow}</button>
      </div>
    </section>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { t, home } = useTranslations();
  const pathname = usePathname();
  return (
    <aside className="hv-sidebar">
      <Link className="hv-sidebar__brand" href="/dashboard" onClick={onNavigate} aria-label={t("home")}>
        <Logo tone="light" />
      </Link>
      <nav aria-label={t("menu")} className="hv-sidebar__nav">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.key}
            item={item}
            active={pathname === item.href}
            label={t(item.key)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
      <PremiumCard />
      <div className="hv-sidebar__quote" aria-label={home.emptyQuote} role="img" />
    </aside>
  );
}

function LanguagePicker() {
  const { t, language, selectLanguage } = useTranslations();
  return (
    <details className="hv-language">
      <summary className="hv-icon-button" aria-label={t("language")}>
        <Globe aria-hidden="true" />
      </summary>
      <div className="hv-language__menu" role="group" aria-label={t("language")}>
        {LANGUAGES.map((code) => (
          <button
            type="button"
            key={code}
            aria-current={language === code ? "true" : undefined}
            onClick={(event) => {
              selectLanguage(code);
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </details>
  );
}

function NotificationButton({ count }: { count: number | null }) {
  const { t } = useTranslations();
  const shownCount = count === null ? null : new Intl.NumberFormat().format(count);
  return (
    <button
      className="hv-icon-button hv-header__bell"
      aria-label={t("notifications")}
      type="button"
      aria-disabled="true"
    >
      <Bell aria-hidden="true" />
      {count !== null && count > 0 && <span aria-hidden="true">{shownCount}</span>}
    </button>
  );
}

export function Header({ user }: { user: ShellUser }) {
  const { t, home } = useTranslations();
  const searchRef = useRef<HTMLInputElement>(null);
  const displayName = user.displayName?.trim() || t("profile");

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="hv-header">
      <div className="hv-header__greeting">
        <strong>{t("greeting")}{user.displayName ? `, ${user.displayName}` : ""}</strong>
        <span>{home.welcomeLine}</span>
      </div>
      <label className="hv-searchbox">
        <Search aria-hidden="true" />
        <input ref={searchRef} aria-label={t("search")} placeholder={t("search")} />
        <kbd>{home.searchShortcut}</kbd>
      </label>
      <LanguagePicker />
      <NotificationButton count={user.notificationCount} />
      <button
        className="hv-user-menu"
        type="button"
        aria-label={`${t("profile")}: ${displayName}`}
        aria-disabled="true"
      >
        <span className="hv-avatar" aria-hidden="true">
          {user.avatarUrl ? <Image src={user.avatarUrl} alt="" width={36} height={36} /> : <UserRound />}
        </span>
        <span className="hv-user-menu__labels">
          <strong>{displayName}</strong>
          {user.premium === true && <small>{t("premiumMember")}</small>}
        </span>
        <ChevronDown aria-hidden="true" />
      </button>
    </header>
  );
}

export function MobileTopBar({
  onMenu,
  menuButtonRef,
  notificationCount,
}: {
  onMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  notificationCount: number | null;
}) {
  const { t } = useTranslations();
  return (
    <header className="hv-mobile-top">
      <button ref={menuButtonRef} className="hv-icon-button" type="button" aria-label={t("menu")} onClick={onMenu}>
        <Menu aria-hidden="true" />
      </button>
      <Link className="hv-mobile-top__brand" href="/dashboard" aria-label={t("home")}>
        <Logo tone="dark" compact />
      </Link>
      <NotificationButton count={notificationCount} />
    </header>
  );
}

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslations();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      "a[href], button:not([aria-disabled='true']), select, input, [tabindex]:not([tabindex='-1'])",
    );
    focusables?.[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="hv-drawer-scrim"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="hv-drawer" role="dialog" aria-modal="true" aria-label={t("menu")} ref={dialogRef}>
        <div className="hv-drawer__head">
          <Logo tone="dark" />
          <LanguagePicker />
          <button className="hv-icon-button" onClick={onClose} aria-label={t("close")} type="button">
            <X aria-hidden="true" />
          </button>
        </div>
        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
}

export function BottomTabs() {
  const { t } = useTranslations();
  const pathname = usePathname();
  return (
    <nav className="hv-bottom-tabs" aria-label={t("menu")}>
      {bottomTabItems.map((item) => {
        const Icon = navIcons[item.icon as keyof typeof navIcons];
        const active = pathname === item.href;
        const content = <><Icon aria-hidden="true" /><span>{t(item.key)}</span></>;
        return isAvailableRoute(item.href) ? (
          <Link key={item.key} href={item.href} aria-current={active ? "page" : undefined}>{content}</Link>
        ) : (
          <button key={item.key} type="button" aria-disabled="true">{content}</button>
        );
      })}
    </nav>
  );
}

export function AppShell({
  children,
  user,
}: {
  children: ReactNode;
  user: ShellUser;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslations();
  const closeDrawer = () => {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div className="hv-app-shell">
      <a className="hv-skip-link" href="#main-content">{t("skipContent")}</a>
      <div className="hv-desktop-sidebar"><Sidebar /></div>
      <div className="hv-main-column">
        <Header user={user} />
        <MobileTopBar
          onMenu={() => setDrawerOpen(true)}
          menuButtonRef={menuButtonRef}
          notificationCount={user.notificationCount}
        />
        <main id="main-content" className="hv-main-content">{children}</main>
      </div>
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
      <BottomTabs />
    </div>
  );
}

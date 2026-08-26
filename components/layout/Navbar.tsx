"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { NAVBAR_HEIGHT, useNavbarVisibility } from "@/lib/useNavbarVisibility";

const NAV_HEIGHT = NAVBAR_HEIGHT;

const navItems: {
  label: string;
  href: string;
  external?: boolean;
}[] = [
  { label: "Возможности", href: "/#features" },
  { label: "Библиотека", href: SITE.library, external: true },
  { label: "Тарифы", href: "/pricing" },
];

function BurgerIcon({ open }: { open: boolean }) {
  const ease = [0.4, 0, 0.2, 1] as const;
  // Three bars stacked at vertical center; in closed state we translate them apart,
  // in open state they meet in the middle and rotate to form an X.
  const barClass =
    "absolute left-[3px] right-[3px] top-1/2 -mt-[1.2px] h-[2.4px] rounded-full bg-current origin-center";
  return (
    <div className="relative w-[22px] h-[22px]" aria-hidden>
      <motion.span
        className={barClass}
        initial={false}
        animate={{ y: open ? 0 : -5, rotate: open ? 45 : 0 }}
        transition={{ duration: 0.25, ease }}
      />
      <motion.span
        className={barClass}
        initial={false}
        animate={{ opacity: open ? 0 : 1, x: open ? 10 : 0 }}
        transition={{ duration: 0.2, ease }}
      />
      <motion.span
        className={barClass}
        initial={false}
        animate={{ y: open ? 0 : 5, rotate: open ? -45 : 0 }}
        transition={{ duration: 0.25, ease }}
      />
    </div>
  );
}

export function Navbar() {
  const { hidden, scrolled } = useNavbarVisibility();
  const [open, setOpen] = useState(false);
  const headerHidden = hidden && !open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur-md will-change-transform",
          "transition-[transform,background-color,border-color] duration-300 ease-out",
          "bg-[color-mix(in_srgb,var(--bg-primary)_92%,transparent)]",
          (scrolled || open) && "border-b-[1px] border-[var(--border)]",
          headerHidden ? "-translate-y-full" : "translate-y-0",
        )}
        style={{ height: NAV_HEIGHT }}
      >
        <div className="app-container h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              aria-label="SDViGApp — на главную"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
            >
              <Logo height={34} />
            </Link>
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => {
                const className =
                  "text-[15px] font-semibold text-text-secondary hover:text-accent transition-colors relative group";
                const content = (
                  <>
                    {item.label}
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </>
                );
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {content}
                    </a>
                  );
                }
                return (
                  <Link key={item.href} href={item.href} className={className}>
                    {content}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LinkButton
              href={`${SITE.webApp}/login`}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              className="hidden lg:inline-flex"
            >
              Вход / Регистрация
            </LinkButton>
            <button
              type="button"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--border)] bg-bg-elevated text-text-primary"
            >
              <BurgerIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="overlay"
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed left-0 right-0 bottom-0 z-30 bg-black/30 backdrop-blur-[2px] cursor-default"
              style={{ top: NAV_HEIGHT }}
            />

            <motion.nav
              key="drawer"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-bg-primary overflow-y-auto"
              style={{ top: NAV_HEIGHT }}
            >
              <div className="app-container py-10 flex flex-col">
                <ul className="flex flex-col">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.12 + i * 0.05,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="border-b-[1px] border-[var(--border)]"
                    >
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-5 text-[28px] font-bold text-text-primary hover:text-accent transition-colors"
                        >
                          {item.label}
                          <span className="text-text-muted text-[20px]">→</span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-5 text-[28px] font-bold text-text-primary hover:text-accent transition-colors"
                        >
                          {item.label}
                          <span className="text-text-muted text-[20px]">→</span>
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.32,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="mt-10"
                >
                  <LinkButton
                    href={`${SITE.webApp}/login`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="lg"
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    Вход / Регистрация
                  </LinkButton>
                  <p className="mt-6 text-[14px] text-text-muted">
                    Нужна помощь? Пиши в{" "}
                    <a
                      href={SITE.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline decoration-2 underline-offset-4"
                    >
                      Telegram
                    </a>
                    .
                  </p>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

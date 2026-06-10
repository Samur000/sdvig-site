"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrainHero } from "@/components/illustrations/BrainHero";
import { SITE } from "@/lib/site";

const rotatingWords = [
  "под тебя",
  "без стыда",
  "без стриков",
  "без давления",
  "в твоём ритме",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const current = rotatingWords[index];

  return (
    <section className="relative pt-20 md:pt-24 pb-24 md:pb-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Badge>
              <Zap size={16} strokeWidth={2.5} className="text-accent fill-accent" />
              Веб-версия работает в браузере
            </Badge>

            <h1 className="text-h1 mt-8 text-text-primary">
              Твой мозг работает иначе.
              <br />
              <span className="text-accent">SDViGApp</span> работает{" "}
              <span className="relative inline-block align-baseline">
                <span className="invisible whitespace-nowrap" aria-hidden>
                  {rotatingWords.reduce((a, b) =>
                    a.length > b.length ? a : b,
                  )}
                </span>
                <span className="absolute inset-0 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={current}
                      initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="block whitespace-nowrap text-accent"
                    >
                      {current}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h1>

            <p className="mt-8 text-[18px] md:text-[20px] leading-relaxed text-text-secondary max-w-[540px]">
              Один ритм для дня, задач, финансов и привычек.
              <br />
              Без стыда. Без перегруза. Без 7 приложений.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <LinkButton
                href={SITE.webApp}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                Открыть в браузере
                <ArrowRight size={20} strokeWidth={2.5} />
              </LinkButton>
              <LinkButton href="#download" variant="secondary" size="lg">
                Скачать
                <ArrowRight size={20} strokeWidth={2.5} />
              </LinkButton>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] text-text-muted">
              {[
                "Бесплатно",
                "Без регистрации",
                "Данные на твоём устройстве",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="text-accent shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <BrainHero />
          </div>
        </div>
      </Container>
    </section>
  );
}

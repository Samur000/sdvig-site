"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { AppsChaos } from "@/components/illustrations/AppsChaos";
import { ZigzagGraph } from "@/components/illustrations/ZigzagGraph";
import { StreakCounter } from "@/components/illustrations/StreakCounter";
import { cn } from "@/lib/cn";

type Block = {
  id: string;
  title: string;
  text: string;
  illustration: React.ReactNode;
  bg: "primary" | "secondary";
  reverse?: boolean;
};

const blocks: Block[] = [
  {
    id: "block-1",
    title: "7 приложений для одного дня",
    text: "Заметки в одном, тудушка в другом, трекер привычек в третьем, финансы в четвёртом. К вечеру ты не помнишь где что записал. А если помнишь — забыл какой пароль.",
    illustration: <AppsChaos />,
    bg: "primary",
  },
  {
    id: "block-2",
    title: "Ты начинаешь — и бросаешь",
    text: "Не потому что ленивый. Просто система не была твоей. Каждое приложение требует, чтобы ты подстроился под него. А должно быть наоборот.",
    illustration: <ZigzagGraph />,
    bg: "secondary",
    reverse: true,
  },
  {
    id: "block-3",
    title: "Один пропуск — и всё",
    text: "Сломал стрик. Мотивация исчезла. Стыдно открывать приложение. Через неделю удаляешь и ищешь новое. Знакомая петля?",
    illustration: <StreakCounter />,
    bg: "primary",
  },
];

function ParallaxBlock({ block }: { block: Block }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative py-24 md:py-[140px]",
        block.bg === "secondary" ? "bg-bg-secondary" : "bg-bg-primary",
      )}
    >
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            block.reverse && "lg:[direction:rtl]",
          )}
        >
          <motion.div
            style={{ y }}
            className={cn("relative", block.reverse && "lg:[direction:ltr]")}
          >
            {block.illustration}
          </motion.div>
          <div className={cn(block.reverse && "lg:[direction:ltr]")}>
            <h3 className="text-h3 text-text-primary">{block.title}</h3>
            <p className="mt-6 text-[18px] md:text-[20px] leading-relaxed text-text-secondary max-w-[480px]">
              {block.text}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ParallaxPain() {
  return (
    <div>
      <div className="bg-bg-primary pt-24 md:pt-[140px] pb-12 md:pb-20">
        <Container>
          <h2 className="text-h2 text-center text-text-primary">Знакомо?</h2>
        </Container>
      </div>

      {blocks.map((block) => (
        <ParallaxBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

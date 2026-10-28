import { useCallback, useEffect, useRef, useState } from "react";

import { dashboardExchanges, dashboardFallback } from "@/config/dashboard-demo";

export type ChatMessage = { id: number; from: "user" | "bot"; text: string };

const REPLY_DELAY_MS = 1100;

const answerFor = (question: string): string => {
  const text = question.toLowerCase();
  const match = dashboardExchanges.find((exchange) =>
    exchange.keywords.some((keyword) => text.includes(keyword)),
  );
  return match ? match.reply : dashboardFallback;
};

/** The assistant panel's conversation: ask something and an example answer follows. */
export const useAssistantChat = () => {
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const send = useCallback((text: string) => {
    const question = text.trim();
    if (question === "") return;
    const userId = nextId.current++;
    const botId = nextId.current++;
    setMessages((current) => [...current, { id: userId, from: "user", text: question }]);
    setDraft("");
    setIsReplying(true);
    timer.current = setTimeout(() => {
      setMessages((current) => [...current, { id: botId, from: "bot", text: answerFor(question) }]);
      setIsReplying(false);
    }, REPLY_DELAY_MS);
  }, []);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setMessages([]);
    setDraft("");
    setIsReplying(false);
  }, []);

  return { messages, draft, isReplying, setDraft, send, reset };
};

export type AssistantChat = ReturnType<typeof useAssistantChat>;

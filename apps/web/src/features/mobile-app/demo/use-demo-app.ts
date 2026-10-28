import { useCallback, useEffect, useRef, useState } from "react";

import { assistantExchanges, assistantFallback } from "@/config/mobile-app";

import type { ChatMessage, Detail, Route, Tab, ThemeChoice } from "./app-types";
import type { ClaimForm } from "./claim-screen";
import type { LeaveFilter } from "./leave-screen";

const REPLY_DELAY_MS = 1100;
const INITIAL_ROUTE: Route = { tab: "home", detail: null };
const INITIAL_CLAIM: ClaimForm = { title: "", category: "Travel", amount: "", isSent: false };

const answerFor = (question: string): string => {
  const text = question.toLowerCase();
  const match = assistantExchanges.find((exchange) =>
    exchange.keywords.some((keyword) => text.includes(keyword)),
  );
  return match ? match.reply : assistantFallback;
};

/** All the state of the demo app, and the things a visitor (or the tour) can do in it. */
export const useDemoApp = () => {
  const [route, setRoute] = useState<Route>(INITIAL_ROUTE);
  const [theme, setTheme] = useState<ThemeChoice>("light");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [leaveFilter, setLeaveFilter] = useState<LeaveFilter>("all");
  const [cancelledIds, setCancelledIds] = useState<readonly string[]>([]);
  const [claim, setClaim] = useState<ClaimForm>(INITIAL_CLAIM);
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const nextMessageId = useRef(1);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isCheckedIn) return;
    const timer = setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isCheckedIn]);

  useEffect(
    () => () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    },
    [],
  );

  const goTab = useCallback((tab: Tab) => {
    setRoute({ tab, detail: null });
  }, []);

  const open = useCallback((detail: Detail) => {
    setRoute((current) => ({ ...current, detail }));
  }, []);

  const back = useCallback(() => {
    setRoute((current) => ({ ...current, detail: null }));
  }, []);

  const toggleCheckIn = useCallback(() => {
    setIsCheckedIn((current) => !current);
    setElapsedSeconds(0);
  }, []);

  const cancelLeave = useCallback((id: string) => {
    setCancelledIds((current) => [...current, id]);
  }, []);

  const changeClaim = useCallback((changes: Partial<ClaimForm>) => {
    setClaim((current) => ({ ...current, ...changes, isSent: false }));
  }, []);

  const submitClaim = useCallback(() => {
    setClaim((current) => ({ ...current, isSent: true }));
  }, []);

  const send = useCallback((text: string) => {
    const question = text.trim();
    if (question === "") return;
    const userId = nextMessageId.current++;
    const botId = nextMessageId.current++;
    setMessages((current) => [...current, { id: userId, from: "user", text: question }]);
    setDraft("");
    setIsReplying(true);
    replyTimer.current = setTimeout(() => {
      setMessages((current) => [...current, { id: botId, from: "bot", text: answerFor(question) }]);
      setIsReplying(false);
    }, REPLY_DELAY_MS);
  }, []);

  const reset = useCallback(() => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    setRoute(INITIAL_ROUTE);
    setTheme("light");
    setIsCheckedIn(false);
    setElapsedSeconds(0);
    setLeaveFilter("all");
    setCancelledIds([]);
    setClaim(INITIAL_CLAIM);
    setMessages([]);
    setDraft("");
    setIsReplying(false);
  }, []);

  return {
    route,
    theme,
    isCheckedIn,
    elapsedSeconds,
    leaveFilter,
    cancelledIds,
    claim,
    messages,
    draft,
    isReplying,
    setTheme,
    setLeaveFilter,
    setDraft,
    goTab,
    open,
    back,
    toggleCheckIn,
    cancelLeave,
    changeClaim,
    submitClaim,
    send,
    reset,
  };
};

export type DemoApp = ReturnType<typeof useDemoApp>;

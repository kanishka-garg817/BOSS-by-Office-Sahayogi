import { ArrowLeft, Mic, Send } from "lucide-react";
import Image from "next/image";

import robotImage from "@/assets/brand/assistant-robot.png";
import { assistantSuggestions } from "@/config/mobile-app";

import type { ChatMessage } from "./app-types";

type AssistantScreenProps = {
  messages: readonly ChatMessage[];
  draft: string;
  isReplying: boolean;
  onDraft: (text: string) => void;
  onSend: (text: string) => void;
  onBack: () => void;
};

export const AssistantScreen = ({
  messages,
  draft,
  isReplying,
  onDraft,
  onSend,
  onBack,
}: AssistantScreenProps) => (
  <>
    <header className="flex shrink-0 items-center px-4 py-3">
      <button
        type="button"
        data-demo="back"
        aria-label="Back"
        onClick={onBack}
        className="flex size-9 items-center justify-center rounded-full border border-app-line text-app-muted"
      >
        <ArrowLeft className="size-5" />
      </button>
    </header>
    <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-3">
      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <Image src={robotImage} alt="" className="w-20" sizes="80px" />
        <p className="text-sm text-app-ink">Hello! I&apos;m your AI Assistant</p>
        <p className="bg-linear-to-r from-app-blue to-app-red bg-clip-text text-2xl font-extrabold text-transparent">
          Sahayogi
        </p>
      </div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <p
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${message.from === "user" ? "bg-app-blue text-white" : "bg-app-soft text-app-ink"}`}
          >
            {message.text}
          </p>
        </div>
      ))}
      {isReplying ? (
        <p className="w-14 rounded-2xl bg-app-soft px-3.5 py-2.5 text-sm tracking-widest text-app-muted motion-safe:animate-pulse">
          ...
        </p>
      ) : null}
    </div>
    {messages.length === 0 ? (
      <div className="flex shrink-0 flex-wrap gap-2 px-4 pb-2">
        {assistantSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              onSend(suggestion);
            }}
            className="rounded-full border border-app-line bg-app-card px-3 py-1.5 text-xs font-semibold text-app-ink"
          >
            {suggestion}
          </button>
        ))}
      </div>
    ) : null}
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSend(draft);
      }}
      className="mx-4 mb-4 flex shrink-0 items-center gap-2 rounded-full border-2 border-app-blue/70 bg-app-card px-3.5 py-2"
    >
      <Mic aria-hidden="true" className="size-5 text-app-muted" />
      <input
        data-demo="assistant-input"
        aria-label="Ask anything"
        value={draft}
        onChange={(event) => {
          onDraft(event.target.value);
        }}
        placeholder="Ask anything..."
        className="min-w-0 flex-1 bg-transparent text-sm text-app-ink placeholder:text-app-muted"
      />
      <button type="submit" data-demo="assistant-send" aria-label="Send" className="text-app-blue">
        <Send className="size-5" />
      </button>
    </form>
  </>
);

import { ArrowUp, Clock, Mic, SquarePen, X } from "lucide-react";
import Image from "next/image";

import robotImage from "@/assets/brand/assistant-robot.png";
import { dashboardSuggestions } from "@/config/dashboard-demo";

import type { AssistantChat } from "./use-assistant-chat";

/** The Sahayogi side panel: suggestions to tap, a conversation, and a box to type in. */
type AssistantPanelProps = { chat: AssistantChat; onClose: () => void };

export const AssistantPanel = ({ chat, onClose }: AssistantPanelProps) => (
  <aside
    aria-label="Sahayogi assistant"
    data-tour="assistant"
    className="flex h-full w-85 flex-col border-l border-app-line bg-app-card"
  >
    <header className="flex items-center gap-2 border-b border-app-line px-4 py-3">
      <Image src={robotImage} alt="" className="w-7" sizes="28px" />
      <h2 className="flex-1 text-base font-bold text-app-ink">Sahayogi</h2>
      <Clock aria-hidden="true" className="size-4 text-app-muted" />
      <SquarePen aria-hidden="true" className="size-4 text-app-muted" />
      <button
        type="button"
        aria-label="Close Sahayogi"
        onClick={onClose}
        className="flex size-6 items-center justify-center text-app-muted"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </header>

    <div className="scrollbar-none flex-1 space-y-3 overflow-y-auto px-4 py-4">
      <p className="text-base font-bold text-app-ink">How can I help?</p>
      {chat.messages.length === 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {dashboardSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              data-tour="suggestion"
              onClick={() => {
                chat.send(suggestion);
              }}
              className="flex items-center justify-between rounded-xl border border-app-line px-3 py-2.5 text-left text-sm text-app-ink hover:bg-app-soft"
            >
              {suggestion}
              <ArrowUp aria-hidden="true" className="size-3.5 rotate-45 text-app-muted" />
            </button>
          ))}
        </div>
      ) : null}
      {chat.messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <p
            className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm ${message.from === "user" ? "bg-app-blue text-white" : "bg-app-soft text-app-ink"}`}
          >
            {message.text}
          </p>
        </div>
      ))}
      {chat.isReplying ? (
        <p className="w-14 rounded-2xl bg-app-soft px-3.5 py-2.5 text-sm tracking-widest text-app-muted motion-safe:animate-pulse">
          ...
        </p>
      ) : null}
    </div>

    <form
      onSubmit={(event) => {
        event.preventDefault();
        chat.send(chat.draft);
      }}
      className="m-3 rounded-2xl border border-app-line p-3"
    >
      <input
        data-tour="assistant-input"
        aria-label="Ask Sahayogi"
        value={chat.draft}
        onChange={(event) => {
          chat.setDraft(event.target.value);
        }}
        placeholder="Ask anything..."
        className="w-full bg-transparent text-sm text-app-ink placeholder:text-app-muted"
      />
      <div className="mt-3 flex items-center justify-end gap-3">
        <Mic aria-hidden="true" className="size-4 text-app-muted" />
        <button
          type="submit"
          data-tour="assistant-send"
          aria-label="Send"
          className="flex size-8 items-center justify-center rounded-lg bg-app-blue text-white"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-app-muted">
        AI can make mistakes. Check important information.
      </p>
    </form>
  </aside>
);

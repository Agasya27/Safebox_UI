import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="pointer-events-auto fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-black/20 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label="Open assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="pointer-events-auto fixed bottom-6 right-6 z-40 w-80 max-w-[calc(100%-3rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/15 transition-colors duration-300 dark:shadow-black/30">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Assistant</p>
            <p className="text-xs text-muted-foreground">Static preview</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Close assistant"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 py-3 text-sm">
        <div className="flex flex-col gap-2 text-muted-foreground">
          <p className="rounded-2xl bg-muted px-3 py-2 text-foreground">Hi there! This is a static chat preview for the dashboard.</p>
          <p className="rounded-2xl bg-muted px-3 py-2 text-foreground">Type in the box below to outline your question - send will be enabled once live.</p>
        </div>
      </div>

      <form className="border-t border-border bg-muted/30 px-4 py-3">
        <label className="sr-only" htmlFor="chat-draft">
          Message the assistant
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id="chat-draft"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write your message..."
            rows={2}
            className="flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-inner outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
          />
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-1 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground opacity-60"
            aria-disabled="true"
            title="Send coming soon"
            disabled
          >
            <Send className="h-3.5 w-3.5" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;

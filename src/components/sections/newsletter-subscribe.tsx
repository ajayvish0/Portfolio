"use client";

import * as React from "react";
import { BUTTONDOWN_USERNAME } from "@/lib/site";

// Buttondown's embed form (same endpoint and fields as its embed snippet),
// styled to match the site. No API key is involved: the endpoint takes a plain
// form post. Submitting opens Buttondown's confirmation page in a new tab, and
// Buttondown emails a confirmation link (double opt-in) before the address is
// subscribed. NewsletterSubscribe reveals the form under a button row when
// clicked; NewsletterCard shows it inline, always open.
const BUTTONDOWN_ACTION = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;
const BUTTONDOWN_ARCHIVE = `https://buttondown.com/${BUTTONDOWN_USERNAME}`;
const FORM_ID = "newsletter-subscribe";
// What readers get and how often: a specific promise converts better than "subscribe".
const PITCH =
  "One email when a new post is out: practical write-ups on LLM apps, voice agents, and the production bugs behind them.";

// Matches what Buttondown accepts in practice: one @, a dot in the domain, no spaces.
// The browser's type="email" check alone lets through addresses like "me@localhost".
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_MAX_LENGTH = 254;

// false while rendering on the server and before hydration, true after. Until
// then the form keeps the browser's own email check, so it still works without JS.
const noopSubscribe = () => () => {};
function useHydrated() {
  return React.useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function NewsletterSubscribe({
  className,
  submitClassName,
  showArchive = false,
}: {
  className: string;
  /** Overrides the Subscribe button's colors, for pages with their own palette. */
  submitClassName?: string;
  /** Link to past issues. Pass hasSentIssues() so an empty archive is never linked. */
  showArchive?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={FORM_ID}
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        Subscribe to my newsletter
      </button>

      {/* order-last + basis-full: drops below the whole button row. */}
      {open && (
        <div id={FORM_ID} className="order-last basis-full">
          <p className="mb-3 max-w-md text-sm text-foreground/70">{PITCH}</p>
          <NewsletterForm
            inputId="newsletter-email"
            inputRef={inputRef}
            submitClassName={submitClassName}
            showArchive={showArchive}
          />
        </div>
      )}
    </>
  );
}

/** An always-open signup box, for the end of a list of posts. */
export function NewsletterCard({ showArchive = false }: { showArchive?: boolean }) {
  return (
    <aside
      aria-labelledby="newsletter-card-title"
      data-search-ignore
      className="mt-8 rounded-lg border border-border bg-card p-5"
    >
      <p id="newsletter-card-title" className="font-medium text-foreground">
        Subscribe to my newsletter
      </p>
      <p className="mt-1 mb-4 text-sm text-foreground/70">{PITCH}</p>
      <NewsletterForm inputId="newsletter-card-email" showLabel={false} showArchive={showArchive} />
    </aside>
  );
}

function validateEmail(value: string): string | null {
  if (!value) return "Enter your email address.";
  if (value.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(value)) {
    return "Enter a valid email address, like you@example.com.";
  }
  return null;
}

function NewsletterForm({
  inputId,
  inputRef,
  showLabel = true,
  showArchive = false,
  submitClassName = "border-[var(--md-primary)] bg-[var(--md-primary)] text-[var(--md-primary-fg)] hover:opacity-90",
}: {
  inputId: string;
  inputRef?: React.Ref<HTMLInputElement>;
  showLabel?: boolean;
  showArchive?: boolean;
  submitClassName?: string;
}) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null);
  const statusRef = React.useRef<HTMLDivElement>(null);
  // Set once a valid address is sent, so a double click can't open two tabs.
  const sentRef = React.useRef(false);
  const hydrated = useHydrated();
  const errorId = `${inputId}-error`;
  const noteId = `${inputId}-note`;

  // Keyboard and screen reader users land on the confirmation when the form goes away.
  React.useEffect(() => {
    if (submittedEmail) statusRef.current?.focus();
  }, [submittedEmail]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (sentRef.current) {
      event.preventDefault();
      return;
    }
    const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const value = email.trim();
    const message = validateEmail(value);
    if (message) {
      event.preventDefault();
      setError(message);
      input.focus();
      return;
    }
    // Send the trimmed address, then swap to the confirmation note once the
    // browser has posted the form to Buttondown's tab.
    input.value = value;
    sentRef.current = true;
    setError(null);
    setTimeout(() => setSubmittedEmail(value), 0);
  }

  if (submittedEmail) {
    return (
      <div
        ref={statusRef}
        role="status"
        tabIndex={-1}
        className="max-w-md text-sm text-foreground/70 outline-none"
      >
        <p>
          <span className="font-medium text-foreground">Almost done.</span> Buttondown has opened a
          new tab and sent a confirmation link to{" "}
          <span className="font-medium text-foreground break-all">{submittedEmail}</span>. Click it to
          finish subscribing.
        </p>
        <p className="mt-2">
          Not in your inbox? Check spam or promotions, or{" "}
          <button
            type="button"
            onClick={() => {
              sentRef.current = false;
              setSubmittedEmail(null);
              setEmail("");
            }}
            className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
          >
            use a different email
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      action={BUTTONDOWN_ACTION}
      method="post"
      target="_blank"
      noValidate={hydrated}
      onSubmit={handleSubmit}
      className="max-w-md"
    >
      <label
        htmlFor={inputId}
        className={showLabel ? "mb-2 block text-sm font-medium text-foreground" : "sr-only"}
      >
        Email
      </label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id={inputId}
          type="email"
          name="email"
          required
          maxLength={EMAIL_MAX_LENGTH}
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${errorId} ${noteId}` : noteId}
          className="h-9 min-w-0 flex-1 rounded-sm border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:border-destructive"
        />
        <input type="hidden" name="embed" value="1" />
        <button
          type="submit"
          className={`h-9 shrink-0 rounded-sm border px-4 text-sm font-medium transition-colors ${submitClassName}`}
        >
          Subscribe
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <p id={noteId} className="mt-2 text-xs text-muted-foreground">
        Your email is only used to send new posts. It is never shared or sold. No spam;
        every email has a one-click unsubscribe link.{" "}
        {showArchive && (
          <>
            <a
              href={BUTTONDOWN_ARCHIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:no-underline"
            >
              Past issues<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {" · "}
          </>
        )}
        <a
          href="https://buttondown.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:no-underline"
        >
          Powered by Buttondown<span className="sr-only"> (privacy policy, opens in a new tab)</span>
        </a>
        .
      </p>
    </form>
  );
}

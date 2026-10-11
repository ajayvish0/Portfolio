import "server-only";
import { BUTTONDOWN_USERNAME } from "@/lib/site";

// Server-only: BUTTONDOWN_API_KEY has no NEXT_PUBLIC_ prefix, so Next.js never
// inlines it into browser code, and "server-only" fails the build if a client
// component imports this module.
const API_KEY = process.env.BUTTONDOWN_API_KEY;
const SENT_EMAILS_URL = "https://api.buttondown.com/v1/emails?status=sent&page_size=1";
// Re-check at most once an hour; a newly sent issue shows up within that window.
const REVALIDATE_SECONDS = 3600;

/**
 * Whether buttondown.com/<username> has at least one sent issue, so a
 * "Past issues" link leads somewhere worth seeing. Fails closed: with no key,
 * an API error, or a timeout, it returns false and the link stays hidden.
 */
export async function hasSentIssues(): Promise<boolean> {
  if (!API_KEY) return false;
  try {
    const res = await fetch(SENT_EMAILS_URL, {
      headers: { Authorization: `Token ${API_KEY}` },
      // Requests with an Authorization header are only cached when asked to.
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.warn(`[buttondown] ${BUTTONDOWN_USERNAME}: sent-issues check failed (${res.status})`);
      return false;
    }
    const data = (await res.json()) as { count?: number };
    return (data.count ?? 0) > 0;
  } catch (error) {
    console.warn(`[buttondown] ${BUTTONDOWN_USERNAME}: sent-issues check failed`, error);
    return false;
  }
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PERSON } from "@/lib/site";

// Shared by every opengraph-image route: the link preview on LinkedIn, X, Slack...
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** A dark card with the portrait on the left and a title, subtitle and line of text. */
export async function renderOgCard({
  title,
  subtitle,
  text,
}: {
  title: string;
  subtitle: string;
  text: string;
}) {
  const photo = await readFile(join(process.cwd(), "public", PERSON.photo));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  // Long post titles drop a size so they stay within three lines.
  const titleSize = title.length > 40 ? 56 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background: "#111111",
          color: "#f5f5f5",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img
          src={photoSrc}
          alt=""
          width={280}
          height={280}
          style={{ borderRadius: 9999, objectFit: "cover" }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: titleSize, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 40, marginTop: 16, color: "#c9c9c9" }}>{subtitle}</div>
          <div style={{ fontSize: 28, marginTop: 32, color: "#9a9a9a", lineHeight: 1.4 }}>
            {text}
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? SITE.name;
  const pillar = searchParams.get("pillar") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FAF8F3",
          fontFamily: "serif",
          color: "#1A1D1F",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#5C8B7F",
            }}
          />
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#6B6E72",
            }}
          >
            {pillar || SITE.shortName}
          </div>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 60 : 78,
            lineHeight: 1.08,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#6B6E72",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontFamily: "serif",
                fontSize: 28,
                color: "#1A1D1F",
              }}
            >
              {SITE.author}
              <span style={{ color: "#5C8B7F" }}>.</span>
            </div>
          </div>
          <div>ruchitdalwadi.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

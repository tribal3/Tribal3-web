import { ImageResponse } from "next/og";
import { DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const OG_ALT = `${SITE_NAME} — Premium Digital Experiences`;

export function createOgImage() {
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
          background: "linear-gradient(135deg, #030712 0%, #0b1120 55%, #06283b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 68,
                height: 68,
                borderRadius: 18,
                background: "#22d3ee",
                color: "#030712",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              T3
            </div>
            <div style={{ marginLeft: 20, fontSize: 36, fontWeight: 700, letterSpacing: 4 }}>
              TRIBAL 3
            </div>
          </div>

          <div style={{ marginTop: 48, fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            Premium Digital Experiences
          </div>

          <div style={{ marginTop: 26, fontSize: 34, color: "#22d3ee" }}>
            Web Development · E-Commerce · UI/UX · SEO · Digital Marketing
          </div>

          <div style={{ marginTop: 26, fontSize: 25, color: "#9ca3af", maxWidth: 940 }}>
            {DESCRIPTION}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <span style={{ color: "#e5e7eb" }}>{SITE_URL.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#22d3ee" }}>360° Digital Solutions</span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
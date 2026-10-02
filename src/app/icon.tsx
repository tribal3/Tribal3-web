import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030712 0%, #06283b 100%)",
          color: "#22d3ee",
          fontSize: 220,
          fontWeight: 700,
          letterSpacing: -8,
          fontFamily: "sans-serif",
        }}
      >
        T3
      </div>
    ),
    size
  );
}
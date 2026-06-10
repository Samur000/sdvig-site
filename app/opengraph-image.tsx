import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SDViGApp — твой мозг работает иначе. SDViGApp работает под тебя.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAFAFA",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "#0A0A0B",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(10,10,11,0.04) 39px, rgba(10,10,11,0.04) 40px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1A9E75",
              border: "3px solid #0A0A0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAFAFA",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            S
          </div>
          SDViGApp
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            Твой мозг работает иначе.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#1A9E75",
              maxWidth: 980,
              marginTop: 8,
            }}
          >
            SDViGApp работает под тебя.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#52525B",
              marginTop: 40,
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Один ритм для дня, задач, финансов и привычек. Без стыда. Без
            перегруза. Без 7 приложений.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 320,
            height: 320,
            border: "3px solid #0A0A0B",
            borderRadius: 24,
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 200,
            boxShadow: "12px 12px 0 #0A0A0B",
          }}
        >
          🧠
        </div>
      </div>
    ),
    size,
  );
}

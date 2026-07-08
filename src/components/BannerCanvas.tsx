"use client";

import React from "react";

interface BannerCanvasProps {
  username: string;
  profileImage?: string | null;
}

/**
 * The actual banner template rendered as a styled DOM element.
 * This component is captured by html-to-image to generate the PNG.
 *
 * Dimensions: 1600 x 900px (Optimized 16:9 Aspect Ratio)
 * Design: Luxurious gold & brown gradient, robotics/data motifs,
 *         PrismaX branding, verified badge, circular profile avatar,
 *         premium centered username.
 */
const BannerCanvas = React.forwardRef<HTMLDivElement, BannerCanvasProps>(
  ({ username, profileImage }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "1600px",
          height: "900px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Outfit', 'Inter', sans-serif",
          background: "linear-gradient(135deg, #0C0A08 0%, #1A1208 25%, #0F0D0A 50%, #18130C 75%, #0C0A08 100%)",
        }}
      >
        {/* === Layer 1: Subtle Grid Pattern === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(212, 168, 67, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 168, 67, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* === Layer 2: Radial Glow Blobs === */}
        {/* Gold glow - top right */}
        <div
          style={{
            position: "absolute",
            width: "900px",
            height: "900px",
            top: "-400px",
            right: "-200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 168, 67, 0.18) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Brown glow - bottom left */}
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            bottom: "-300px",
            left: "-150px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 104, 64, 0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Amber warm center glow */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200, 144, 60, 0.06) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* === Layer 3: Circuit / Data Decorative Lines === */}
        {/* Diagonal circuit line 1 */}
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "550px",
            top: "-100px",
            left: "220px",
            background: "linear-gradient(to bottom, transparent, rgba(212, 168, 67, 0.2), transparent)",
            transform: "rotate(25deg)",
          }}
        />
        {/* Diagonal circuit line 2 */}
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "650px",
            top: "-150px",
            right: "320px",
            background: "linear-gradient(to bottom, transparent, rgba(200, 144, 60, 0.15), transparent)",
            transform: "rotate(-20deg)",
          }}
        />
        {/* Horizontal data line */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "1px",
            bottom: "120px",
            left: 0,
            background: "linear-gradient(to right, transparent, rgba(212, 168, 67, 0.12), rgba(139, 104, 64, 0.1), transparent)",
          }}
        />
        {/* Horizontal data line - upper */}
        <div
          style={{
            position: "absolute",
            width: "70%",
            height: "1px",
            top: "120px",
            right: 0,
            background: "linear-gradient(to left, transparent, rgba(212, 168, 67, 0.08), transparent)",
          }}
        />

        {/* === Layer 4: Data Nodes / Particles === */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${2 + (i % 4) * 2}px`,
              height: `${2 + (i % 4) * 2}px`,
              borderRadius: "50%",
              background: i % 3 === 0
                ? "rgba(240, 208, 120, 0.5)"
                : i % 3 === 1
                ? "rgba(212, 168, 67, 0.4)"
                : "rgba(200, 144, 60, 0.3)",
              top: `${50 + (i * 49) % 800}px`,
              left: `${80 + (i * 97) % 1440}px`,
              boxShadow: `0 0 ${4 + i * 2}px ${
                i % 3 === 0
                  ? "rgba(240, 208, 120, 0.3)"
                  : i % 3 === 1
                  ? "rgba(212, 168, 67, 0.2)"
                  : "rgba(200, 144, 60, 0.15)"
              }`,
            }}
          />
        ))}

        {/* === Layer 5: Robotics / Circuit Board Motifs === */}
        {[...Array(6)].map((_, i) => (
          <div key={`circuit-${i}`}>
            <div
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "1.5px solid rgba(212, 168, 67, 0.3)",
                background: "rgba(212, 168, 67, 0.08)",
                top: `${150 + i * 110}px`,
                left: `${120 + i * 270}px`,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "40px",
                height: "1px",
                background: "rgba(212, 168, 67, 0.15)",
                top: `${154 + i * 110}px`,
                left: `${128 + i * 270}px`,
              }}
            />
          </div>
        ))}

        {/* === Layer 6: PrismaX Logo - Top Left === */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* P(x) Mathematical Logo */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#D4A843",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              textShadow: "0 0 15px rgba(212, 168, 67, 0.4)",
            }}
          >
            P<span style={{ fontSize: "16px", verticalAlign: "sub" }}>(x)</span>
          </div>
          {/* Brand text */}
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "3px",
              background: "linear-gradient(135deg, #F0D078, #D4A843, #A07830)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
            }}
          >
            PrismaX
          </span>
        </div>

        {/* === Layer 7: Verified Badge - Top Right === */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "50px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "8px",
            background: "rgba(212, 168, 67, 0.08)",
            border: "1px solid rgba(212, 168, 67, 0.2)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4"
              stroke="#D4A843"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#D4A843"
              strokeWidth="1.5"
              opacity="0.5"
            />
          </svg>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#D4A843",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Verified Member
          </span>
        </div>

        {/* === Layer 8: Central Content === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "60px",
          }}
        >
          {/* Circular Profile Avatar */}
          <div
            style={{
              position: "relative",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              border: "4px solid #D4A843",
              background: "rgba(20, 18, 16, 0.9)",
              boxShadow: "0 0 40px rgba(212, 168, 67, 0.25)",
              overflow: "hidden",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              /* Fallback/Default Avatar Icon */
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}

            {/* Overlapping small verified checkmark */}
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                background: "#D4A843",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #0C0A08",
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#0C0A08"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Small "community member" label above username */}
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "rgba(212, 168, 67, 0.6)",
              marginBottom: "12px",
            }}
          >
            Community Member
          </div>

          {/* Username */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              textAlign: "center",
              background: "linear-gradient(135deg, #F0D078 0%, #D4A843 35%, #F0E8D8 50%, #D4A843 65%, #A07830 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(212, 168, 67, 0.25))",
              maxWidth: "1300px",
              padding: "0 40px",
              wordBreak: "break-word" as const,
            }}
          >
            {username}
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: "20px",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(168, 152, 128, 0.6)",
            }}
          >
            Real-World Behavior • Advanced Models • Quality
          </div>

          {/* Decorative gold line under tagline */}
          <div
            style={{
              marginTop: "16px",
              width: "120px",
              height: "2px",
              borderRadius: "1px",
              background: "linear-gradient(to right, transparent, #D4A843, transparent)",
            }}
          />
        </div>

        {/* === Layer 9: Bottom Bar === */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50px",
            right: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(168, 152, 128, 0.35)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              prismax.io
            </span>
            <span
              style={{
                fontSize: "9px",
                color: "rgba(212, 168, 67, 0.3)",
              }}
            >
              •
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(168, 152, 128, 0.3)",
                letterSpacing: "0.5px",
              }}
            >
              Robotics · Data · Excellence
            </span>
          </div>

          {/* Right: year and badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 8px",
                borderRadius: "4px",
                background: "rgba(212, 168, 67, 0.06)",
                border: "1px solid rgba(212, 168, 67, 0.12)",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D4A843" opacity="0.5" />
              </svg>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "rgba(212, 168, 67, 0.4)",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Premium
              </span>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(168, 152, 128, 0.35)",
                letterSpacing: "1px",
              }}
            >
              {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {/* === Layer 10: Gradient Border Overlay === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "0px",
            border: "1px solid transparent",
            background: `linear-gradient(transparent, transparent) padding-box,
              linear-gradient(135deg, rgba(212, 168, 67, 0.25), rgba(200, 144, 60, 0.12), rgba(139, 104, 64, 0.08)) border-box`,
            pointerEvents: "none" as const,
          }}
        />

        {/* === Layer 11: Corner Accents (Gold) === */}
        {/* Top-left corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "80px",
            height: "80px",
            borderTop: "2px solid rgba(212, 168, 67, 0.3)",
            borderLeft: "2px solid rgba(212, 168, 67, 0.3)",
          }}
        />
        {/* Top-right corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60px",
            height: "60px",
            borderTop: "1px solid rgba(212, 168, 67, 0.15)",
            borderRight: "1px solid rgba(212, 168, 67, 0.15)",
          }}
        />
        {/* Bottom-left corner */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "60px",
            height: "60px",
            borderBottom: "1px solid rgba(200, 144, 60, 0.15)",
            borderLeft: "1px solid rgba(200, 144, 60, 0.15)",
          }}
        />
        {/* Bottom-right corner */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "80px",
            height: "80px",
            borderBottom: "2px solid rgba(200, 144, 60, 0.3)",
            borderRight: "2px solid rgba(200, 144, 60, 0.3)",
          }}
        />

        {/* === Layer 12: Hexagonal Data Motif (left side) === */}
        <svg
          style={{
            position: "absolute",
            bottom: "80px",
            left: "60px",
            opacity: 0.08,
          }}
          width="100"
          height="110"
          viewBox="0 0 80 90"
          fill="none"
        >
          <path
            d="M40 5 L72 25 L72 65 L40 85 L8 65 L8 25 Z"
            stroke="#D4A843"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M40 20 L58 32 L58 56 L40 68 L22 56 L22 32 Z"
            stroke="#D4A843"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        {/* === Layer 13: Data Flow Dots (right side) === */}
        <svg
          style={{
            position: "absolute",
            top: "140px",
            right: "70px",
            opacity: 0.1,
          }}
          width="60"
          height="180"
          viewBox="0 0 60 120"
          fill="none"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx="30"
              cy={10 + i * 30}
              r="3.5"
              fill="#D4A843"
              opacity={1 - i * 0.15}
            />
          ))}
          <line
            x1="30"
            y1="13"
            x2="30"
            y2="167"
            stroke="#D4A843"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
        </svg>
      </div>
    );
  }
);

BannerCanvas.displayName = "BannerCanvas";

export default BannerCanvas;

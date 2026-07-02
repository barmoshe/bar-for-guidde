import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-guidde application page, matching the
// page's look — Guidde's real brand, read live off guidde.com: white surface,
// giant near-black display type with a blue (#0062FF) highlight phrase, a red
// (#CB0000) lowercase wordmark with a period, and a blue CTA pill. Rendered at
// build time by next/og (Satori), so it uses a flexbox-only subset of CSS and
// plain hex colours (Latin text only). Next colocates this file with the route
// and wires the og:image / twitter:image tags automatically.

export const alt =
  'Bar Moshe for Guidde — Full Stack Engineer. React, Node, TypeScript; event-driven pipelines on Temporal; open-source tooling on npm with an MCP server.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 48px',
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(720px 420px at 50% -10%, rgba(0,98,255,0.10), transparent 65%), radial-gradient(520px 340px at 90% 100%, rgba(248,197,33,0.14), transparent 60%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row: red lowercase wordmark + blue application pill */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 44,
              fontWeight: 700,
              color: '#cb0000',
              letterSpacing: '-0.02em',
            }}
          >
            bar moshe.
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 20,
              padding: '8px 18px',
              borderRadius: 999,
              backgroundColor: 'rgba(0,98,255,0.10)',
              fontSize: 22,
              fontWeight: 500,
              color: '#0062ff',
            }}
          >
            for Guidde · Application
          </div>
        </div>

        {/* Headline: their giant weight-400 type with a blue highlight */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 68,
              fontWeight: 400,
              color: '#000000',
              letterSpacing: '-0.03em',
              lineHeight: 1.06,
              maxWidth: '1020px',
            }}
          >
            The&nbsp;
            <span style={{ color: '#0062ff' }}>full-stack engineer</span>
            &nbsp;to build features end to end
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#40434f',
              marginTop: '24px',
              maxWidth: '940px',
              lineHeight: 1.4,
            }}
          >
            React, Node, TypeScript. Event-driven pipelines on Temporal, open-source
            tooling on npm with an MCP server, and video tooling every workday.
          </div>
        </div>

        {/* Foot meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 25,
            color: '#9aa0b4',
          }}
        >
          <div style={{ display: 'flex' }}>github.com/barmoshe</div>
          <div
            style={{
              display: 'flex',
              padding: '12px 26px',
              borderRadius: 8,
              backgroundColor: '#0062ff',
              fontWeight: 600,
              fontSize: 22,
              color: '#ffffff',
              letterSpacing: '0.05em',
            }}
          >
            FULL STACK ENGINEER · TEL AVIV
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

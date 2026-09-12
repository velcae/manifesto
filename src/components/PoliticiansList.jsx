import React from "react";
import { Link } from "react-router-dom";
import { politicians } from "../data/politiciansData";

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (name) {
    case "users":
      return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "badge":
      return <svg {...common}><path d="M12 2l2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8L12 2Z" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M7 17 17 7" /><path d="M9 7h8v8" /></svg>;
    default:
      return null;
  }
}

function PoliticianCard({ politician }) {
  const slug = politician.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  
  return (
    <Link
      to={`/politicians/${slug}`}
      style={{
        display: "block",
        background: "#fff",
        border: "1px solid #ddd5ca",
        borderRadius: "12px",
        padding: "8px 10px 8px",
        boxShadow: "0 1px 0 rgba(0,0,0,.03)",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,.03)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: "#efe9df",
          color: "#8a847d",
          display: "grid",
          placeItems: "center",
          flex: "0 0 auto",
          fontSize: "13px",
          fontWeight: 700
        }}>
          {politician.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: "13px", lineHeight: "1", letterSpacing: "-0.04em", fontWeight: 700, color: "#1d1915", marginTop: "1px" }}>
            {politician.name}
          </div>
          <div style={{ marginTop: "1px", color: "#67615a", fontSize: "10px" }}>{politician.role}</div>
          <div style={{ marginTop: "1px", color: "#67615a", fontSize: "10px" }}>{politician.region}</div>
        </div>
      </div>

      <div style={{ marginTop: "6px", fontSize: "10px", color: "#49443f" }}>
        {politician.promises} promises
      </div>
      
      <div style={{ marginTop: "4px", height: "6px", background: "#e6dccd", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
        <div style={{ background: "#d05b2d", width: `${politician.kept}%` }} />
        <div style={{ background: "#f17f55", width: `${politician.broken}%` }} />
        <div style={{ background: "#cdbb99", width: `${politician.pending}%` }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "2px", marginTop: "6px", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#1c1a17" }}>{politician.kept}%</div>
          <div style={{ fontSize: "9px", color: "#66625b", marginTop: "2px" }}>Kept</div>
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#1c1a17" }}>{politician.broken}%</div>
          <div style={{ fontSize: "9px", color: "#66625b", marginTop: "2px" }}>Broken</div>
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#1c1a17" }}>{politician.pending}%</div>
          <div style={{ fontSize: "9px", color: "#66625b", marginTop: "2px" }}>Pending</div>
        </div>
      </div>
    </Link>
  );
}

export default function PoliticiansList() {
  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Anthropic Sans';
          src: url('https://assets-proxy.anthropic.com/claude-ai/v2/assets/v1/cc27851ad-CFxw3nG7.woff2') format('woff2');
          font-weight: 300 800;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Anthropic Serif';
          src: url('https://assets-proxy.anthropic.com/claude-ai/v2/assets/v1/c66fc489e-C-BHYa_K.woff2') format('woff2');
          font-weight: 300 800;
          font-style: normal;
          font-display: swap;
        }
        :root {
          --bg: #f7f5f0;
          --line: #ded7cd;
          --line2: #d9d2c7;
          --text: #1f1b17;
          --muted: #6a645d;
          --accent: #d35c29;
          --sand: #efe9df;
          --sand2: #e6dccd;
        }
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body {
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          overflow-y: auto;
        }
        .page { min-height: 100vh; display: flex; flex-direction: column; overflow: visible; background: linear-gradient(180deg, rgba(255,255,255,.25), rgba(247,245,240,.15)); }
        .politiciansGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; padding: 12px; }
      `}</style>

      <div className="page">
        <div style={{ width: "min(1450px, calc(100% - 44px))", margin: "0 auto", flex: "1 1 auto", padding: "40px 22px" }}>

          <div className="politiciansGrid">
            {politicians.map((politician) => (
              <PoliticianCard key={politician.name} politician={politician} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

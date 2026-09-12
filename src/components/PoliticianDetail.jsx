import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPoliticianBySlug, getPoliticianPromises } from "../data/politiciansData";

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
    case "arrow-left":
      return <svg {...common}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "file":
      return <svg {...common}><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5" /><path d="M9 13h6" /><path d="M9 17h6" /></svg>;
    case "badge":
      return <svg {...common}><path d="M12 2l2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8L12 2Z" /></svg>;
    case "avatar":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    default:
      return null;
  }
}

function Metric({ icon, value, label }) {
  return (
    <div style={{ textAlign: "center", padding: "8px" }}>
      <div style={{ width: "36px", height: "36px", margin: "0 auto 4px", borderRadius: "999px", background: "#efe9df", color: "#5e5b57", display: "grid", placeItems: "center" }}>
        <Icon name={icon} size={14} />
      </div>
      <div style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.05em", color: "#1c1a17", lineHeight: "1" }}>
        {value}
      </div>
      <div style={{ marginTop: "2px", fontSize: "10px", color: "#66625b", lineHeight: "1.2" }}>{label}</div>
    </div>
  );
}

export default function PoliticianDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedPromiseId, setSelectedPromiseId] = useState(null);
  const politician = getPoliticianBySlug(slug);

  if (!politician) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1>Politician not found</h1>
          <button onClick={() => navigate("/politicians")} style={{ padding: "10px 20px", marginTop: "20px" }}>
            Back to Politicians
          </button>
        </div>
      </div>
    );
  }

  const promises = getPoliticianPromises(politician.name, politician.region);
  const currentPromise = promises.find((p) => p.id === selectedPromiseId) || promises[0];
  const keptCount = Math.round((politician.promises * politician.kept) / 100);
  const brokenCount = Math.round((politician.promises * politician.broken) / 100);
  const pendingCount = Math.round((politician.promises * politician.pending) / 100);

  useEffect(() => {
    if (promises.length > 0 && !selectedPromiseId) {
      setSelectedPromiseId(promises[0].id);
    }
  }, [politician, promises, selectedPromiseId]);

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
        .politicianLayout { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto 1fr; gap: 18px; padding: 16px 0 12px; min-height: 160px; }
        .politicianTopLeft { grid-column: 1; grid-row: 1; }
        .politicianTopRight { grid-column: 2; grid-row: 1; }
        .politicianBottomLeft { grid-column: 1; grid-row: 2; overflow-y: auto; }
        .politicianBottomRight { grid-column: 2; grid-row: 1 / 3; overflow-y: auto; }
        .promiseList { display: flex; flex-direction: column; gap: 6px; padding: 2px; }
        .promiseItem { background: #fff; border: 1px solid #ded7cd; border-radius: 12px; padding: 10px; box-shadow: 0 1px 0 rgba(0,0,0,.03); font-size: 12px; line-height: 1.3; color: #1f1b17; cursor: pointer; transition: all 0.2s; text-align: left; }
        .promiseItem:hover { background: #fcfbf8; box-shadow: 0 4px 12px rgba(0,0,0,.08); }
        .promiseItem.activePromise { background: #fff8f3; border-color: #d35c29; }
        .statusPill { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 4px 8px; font-size: 10px; font-weight: 700; letter-spacing: .01em; flex: 0 0 auto; margin-bottom: 4px; }
        .statusKept { background: rgba(104, 160, 64, 0.15); color: #68A040; }
        .statusBroken { background: rgba(200, 80, 48, 0.15); color: #C85030; }
        .statusPending { background: rgba(176, 160, 128, 0.15); color: #B0A080; }
        .statusDot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; flex: 0 0 auto; }
        .statusDot.statusKept { background: #68A040; }
        .statusDot.statusBroken { background: #C85030; }
        .statusDot.statusPending { background: #B0A080; }
        .promiseDetailCard { background: #fff; border: 1px solid #ddd5ca; border-radius: 12px; padding: 16px; box-shadow: 0 1px 0 rgba(0,0,0,.03); }
        .promiseDetailTitle { margin: 10px 0 8px; font-size: 20px; line-height: 1; letter-spacing: -.05em; font-family: 'Anthropic Serif', Georgia, serif; }
        .promiseSection { padding-top: 10px; }
        .promiseSectionTitle { margin-bottom: 4px; font-size: 11px; font-weight: 700; font-family: 'Anthropic Serif', Georgia, serif; color: #322d28; text-transform: uppercase; letter-spacing: .12em; }
        .promiseSection p { margin: 0; color: #4f4a44; font-size: 12px; line-height: 1.55; }
        .sourceList { margin: 0; padding-left: 18px; color: #4f4a44; }
        .sourceList li { margin: 0 0 6px; }
        .sourceList a { color: #1f1b17; text-decoration: underline; text-underline-offset: 2px; font-size: 12px; cursor: pointer; }
        .sectionLabel { margin-bottom: 4px; font-size: 11px; font-weight: 700; font-family: 'Anthropic Serif', Georgia, serif; color: #322d28; text-transform: uppercase; letter-spacing: .12em; }
        .reportCard { background: #fff; border: 1px solid #ddd5ca; border-radius: 12px; padding: 16px; box-shadow: 0 1px 0 rgba(0,0,0,.03); text-align: center; }
        .reportCard button { background: #d35c29; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-size: 14px; font-weight: 700; cursor: pointer; width: 100%; transition: background 0.2s; }
        .reportCard button:hover { background: #b84920; }
        @media (max-width: 1200px) {
          .politicianLayout { grid-template-columns: 1fr; }
          .politicianBottomRight { grid-column: 1; grid-row: 3; }
        }
      `}</style>

      <div className="page">
        <div style={{ width: "min(1450px, calc(100% - 44px))", margin: "0 auto", flex: "1 1 auto", paddingTop: "8px" }}>
          <button
            onClick={() => navigate("/politicians")}
            style={{
              marginTop: "0px",
              marginBottom: "8px",
              background: "transparent",
              border: "none",
              color: "#1f1b17",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "4px 0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              lineHeight: "1.2",
              height: "auto"
            }}
          >
            <Icon name="arrow-left" size={14} />
            <span>Back to all politicians</span>
          </button>

          <div className="politicianLayout">
            {/* Top Left - Profile */}
            <section className="politicianTopLeft">
              <div style={{ display: "flex", gap: "10px", padding: "16px", background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  background: "#efe9df",
                  color: "#8a847d",
                  display: "grid",
                  placeItems: "center",
                  flex: "0 0 auto",
                  fontSize: "24px",
                  fontWeight: 700
                }}>
                  {politician.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1px" }}>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1d1915", letterSpacing: "-0.04em" }}>
                      {politician.name}
                    </h2>
                    <Icon name="shield" size={12} />
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#1d1915", marginBottom: "2px" }}>
                    {politician.role}
                  </div>
                  <div style={{ fontSize: "10px", color: "#67615a" }}>
                    {politician.region} • Independent
                  </div>
                </div>
              </div>
            </section>

            {/* Top Right - Metrics */}
            <section className="politicianTopRight">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "12px", background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
                <Metric icon="file" value={politician.promises} label="Total promises" />
                <Metric icon="badge" value={`${politician.kept}%`} label={`${keptCount} kept`} />
                <Metric icon="file" value={`${politician.broken}%`} label={`${brokenCount} broken`} />
                <Metric icon="badge" value={`${politician.pending}%`} label={`${pendingCount} pending`} />
              </div>
            </section>

            {/* Bottom Left - Promises List + Progress + Report Card */}
            <section className="politicianBottomLeft">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Progress Bar */}
                <div style={{ padding: "12px", background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
                  <div style={{ height: "6px", background: "#e6dccd", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                    <div style={{ background: "#d05b2d", width: `${politician.kept}%` }} />
                    <div style={{ background: "#f17f55", width: `${politician.broken}%` }} />
                    <div style={{ background: "#cdbb99", width: `${politician.pending}%` }} />
                  </div>
                  <div style={{ marginTop: "8px", display: "flex", gap: "12px", fontSize: "11px" }}>
                    <span><i style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#d05b2d", marginRight: "4px" }} />Kept</span>
                    <span><i style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#f17f55", marginRight: "4px" }} />Broken</span>
                    <span><i style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#cdbb99", marginRight: "4px" }} />Pending</span>
                  </div>
                </div>

                {/* Promises List */}
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div className="sectionLabel">Promises</div>
                  <div className="promiseList" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {promises.map((promise) => (
                      <button
                        key={promise.id}
                        className={`promiseItem ${currentPromise?.id === promise.id ? "activePromise" : ""}`}
                        onClick={() => setSelectedPromiseId(promise.id)}
                      >
                        <div className={`statusDot status${promise.status}`} />
                        <div style={{ fontWeight: 700 }}>{promise.title}</div>
                        <div style={{ fontSize: "11px", color: "#67615a", marginTop: "2px" }}>{promise.date} • {promise.category}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Report Card */}
                <div className="reportCard">
                  <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "#1f1b17" }}>
                    Know something we don't?
                  </div>
                  <button>Submit Anonymous Report</button>
                </div>
              </div>
            </section>

            {/* Bottom Right - Promise Detail */}
            <aside className="politicianBottomRight">
              {currentPromise ? (
                <article className="promiseDetailCard">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "10px" }}>
                    <div className={`statusPill status${currentPromise.status}`}>{currentPromise.status}</div>
                    <div style={{ fontSize: "11px", color: "#6b665f" }}>{currentPromise.date}</div>
                  </div>

                  <h3 className="promiseDetailTitle">{currentPromise.title}</h3>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", color: "#665f57", fontSize: "11px", borderBottom: "1px solid #ece6dc", paddingBottom: "10px", marginBottom: "10px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <Icon name="file" size={12} />
                      Promise made on: {currentPromise.date}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <Icon name="badge" size={12} />
                      Category: {currentPromise.category}
                    </span>
                  </div>

                  <div className="promiseSection">
                    <div className="promiseSectionTitle">Promise Description</div>
                    <p>{currentPromise.description}</p>
                  </div>

                  <div className="promiseSection">
                    <div className="promiseSectionTitle">Status</div>
                    <p>{currentPromise.statusDetail}</p>
                  </div>

                  <div className="promiseSection">
                    <div className="promiseSectionTitle">Sources</div>
                    <ul className="sourceList">
                      {currentPromise.sources.map((source) => (
                        <li key={source.text}>
                          <a href={source.url} target="_blank" rel="noreferrer">{source.text}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="promiseSection">
                    <div className="promiseSectionTitle">Evidence</div>
                    {currentPromise.evidence.length > 0 ? (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
                        {currentPromise.evidence.map((evidence) => (
                          <div key={evidence.title} style={{ border: "1px solid #e5ddd2", borderRadius: "12px", background: "#fcfbf8", padding: "10px" }}>
                            <div style={{ width: "100%", height: "110px", borderRadius: "10px", background: "linear-gradient(135deg, #efe7da, #f8f4ee)", display: "grid", placeItems: "center", color: "#948b80", marginBottom: "8px" }}>
                              <Icon name="file" size={18} />
                            </div>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1d1915" }}>{evidence.title}</div>
                            <div style={{ marginTop: "2px", fontSize: "10px", color: "#6d6760" }}>{evidence.date}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: "#6b665f", fontSize: "12px", background: "#fcfbf8", border: "1px dashed #e1d9ce", borderRadius: "12px", padding: "12px" }}>
                        No supporting evidence attached yet.
                      </div>
                    )}
                  </div>
                </article>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

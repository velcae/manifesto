import React, { useState } from "react";
import { anonymousReports, caseReviews, transparencyUpdates } from "../data/reportsData";

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
    case "filter":
      return <svg {...common}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
    case "check":
      return <svg {...common}><polyline points="20 6 9 17 4 12" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "alert":
      return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case "folder":
      return <svg {...common}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
    case "trending":
      return <svg {...common}><polyline points="23 6 13.5 15.5 8.5 10.5 1 17" /><polyline points="17 6 23 6 23 12" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    case "user":
      return <svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    default:
      return null;
  }
}

function StatusBadge({ status, type = "report" }) {
  const getStyle = () => {
    const baseStyle = {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "999px",
      padding: "4px 8px",
      fontSize: "10px",
      fontWeight: 700,
      whiteSpace: "nowrap",
      fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    };

    switch(status) {
      case "Verified":
      case "Closed":
      case "Final Outcome":
        return { ...baseStyle, background: "rgba(104, 160, 64, 0.15)", color: "#68A040" };
      case "Pending":
      case "Investigation":
        return { ...baseStyle, background: "rgba(200, 80, 48, 0.15)", color: "#C85030" };
      case "Rejected":
        return { ...baseStyle, background: "rgba(200, 80, 48, 0.15)", color: "#C85030" };
      case "Open":
        return { ...baseStyle, background: "rgba(176, 160, 128, 0.15)", color: "#B0A080" };
      case "In Review":
      case "Evidence Collected":
        return { ...baseStyle, background: "rgba(211, 92, 41, 0.15)", color: "#d35c29" };
      default:
        return baseStyle;
    }
  };

  const labels = {
    "Verified": "Verified",
    "Pending": "Pending",
    "Rejected": "Rejected",
    "Open": "Open",
    "In Review": "In Review",
    "Closed": "Closed",
    "Investigation": "Investigation",
    "Evidence Collected": "Evidence Collected",
    "Final Outcome": "Final Outcome"
  };

  return <span style={getStyle()}>{labels[status] || status}</span>;
}

function ReportCard({ report, onExpand, expanded }) {
  return (
    <div 
      style={{
        background: "#fff",
        border: "1px solid #ddd5ca",
        borderRadius: "12px",
        padding: "10px 12px",
        marginBottom: "6px",
        cursor: "pointer",
        boxShadow: "0 1px 0 rgba(0,0,0,.03)",
        transition: "border-color .18s ease, box-shadow .18s ease"
      }}
      onClick={() => onExpand(report.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(211, 92, 41, 0.55)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ddd5ca";
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,.03)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "9px",
              fontWeight: 700,
              color: "#fff",
              backgroundColor: "#6a645d",
              padding: "2px 6px",
              borderRadius: "6px",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }}>
              {report.category}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1d1915", marginBottom: "4px", lineHeight: "1.2", fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif" }}>
            {report.description}
          </p>
          <div style={{ display: "flex", gap: "16px", fontSize: "10px", color: "#6a645d", fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <span>📅 {report.date}</span>
            <span>👤 {report.relatedPolitician}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flex: "0 0 auto" }}>
          <StatusBadge status={report.status} type="report" />
          <div style={{ fontSize: "16px", color: "#6a645d", fontWeight: 600 }}>
            {expanded ? "−" : "+"}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div style={{
          marginTop: "10px",
          paddingTop: "10px",
          borderTop: "1px solid #ede8dd",
          fontSize: "12px",
          color: "#49443f",
          lineHeight: "1.5",
          fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
          <p style={{ margin: "0 0 8px 0" }}><strong style={{ color: "#1d1915" }}>Detail Laporan:</strong></p>
          <p style={{ margin: "0 0 8px 0" }}>{report.fullDescription}</p>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#8a847d" }}>
            <span>📤 Disubmit: {report.submittedDate}</span>
            {report.verificationDate && <span>✓ Diverifikasi: {report.verificationDate}</span>}
          </div>
          {report.rejectionReason && (
            <div style={{ marginTop: "8px", padding: "8px", backgroundColor: "rgba(200, 80, 48, 0.1)", borderLeft: "3px solid #C85030", fontSize: "10px" }}>
              <strong>Alasan Penolakan:</strong> {report.rejectionReason}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CaseCard({ caseData, onExpand, expanded }) {
  return (
    <div 
      style={{
        background: "#fff",
        border: "1px solid #ddd5ca",
        borderRadius: "12px",
        padding: "10px 12px",
        marginBottom: "6px",
        cursor: "pointer",
        boxShadow: "0 1px 0 rgba(0,0,0,.03)",
        transition: "border-color .18s ease, box-shadow .18s ease"
      }}
      onClick={() => onExpand(caseData.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(211, 92, 41, 0.55)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ddd5ca";
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,.03)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1d1915", marginBottom: "4px", lineHeight: "1.2", fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif" }}>
            {caseData.title}
          </p>
          <div style={{ display: "flex", gap: "16px", fontSize: "10px", color: "#6a645d", marginBottom: "6px", fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <span>👤 {caseData.politician}</span>
            <span>📅 {caseData.submittedDate}</span>
          </div>
          <div style={{ fontSize: "10px", color: "#49443f", fontStyle: "italic", fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {caseData.lastFollowUpActivity}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flex: "0 0 auto" }}>
          <StatusBadge status={caseData.status} type="case" />
          <div style={{ fontSize: "16px", color: "#6a645d", fontWeight: 600 }}>
            {expanded ? "−" : "+"}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{
          marginTop: "10px",
          paddingTop: "10px",
          borderTop: "1px solid #ede8dd",
          fontSize: "12px",
          color: "#49443f",
          fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
          <p style={{ margin: "0 0 8px 0", color: "#1d1915" }}>
            <strong>Deskripsi:</strong> {caseData.description}
          </p>
          <div style={{ marginBottom: "8px" }}>
            <strong style={{ fontSize: "11px", color: "#1d1915" }}>📋 Timeline Aktivitas:</strong>
            <div style={{ marginTop: "6px", paddingLeft: "12px", borderLeft: "2px solid #d0ccc0" }}>
              {caseData.updates.map((update, idx) => (
                <div key={idx} style={{ marginBottom: "6px", fontSize: "10px" }}>
                  <div style={{ fontWeight: 600, color: "#1d1915" }}>{update.date}</div>
                  <div style={{ color: "#6a645d" }}>{update.activity}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: "10px", color: "#8a847d", display: "flex", gap: "16px" }}>
            <span>📁 Bukti: {caseData.evidenceCount} dokumen</span>
            <span>🔄 Update: {caseData.lastFollowUpDate}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TransparencyCard({ update, onExpand, expanded }) {
  const getStatusColor = (status) => {
    switch(status) {
      case "Investigation": return "#d35c29";
      case "Evidence Collected": return "#68A040";
      case "Final Outcome": return "#C85030";
      default: return "#8a847d";
    }
  };

  return (
    <div 
      style={{
        background: "#fff",
        border: "1px solid #ddd5ca",
        borderRadius: "12px",
        padding: "10px 12px",
        paddingLeft: "14px",
        marginBottom: "6px",
        cursor: "pointer",
        position: "relative",
        boxShadow: "0 1px 0 rgba(0,0,0,.03)",
        transition: "border-color .18s ease, box-shadow .18s ease",
        borderLeft: `4px solid ${getStatusColor(update.status)}`
      }}
      onClick={() => onExpand(update.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(211, 92, 41, 0.55)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ddd5ca";
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,.03)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1d1915", marginBottom: "4px", lineHeight: "1.2", fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif" }}>
            {update.title}
          </p>
          <div style={{ display: "flex", gap: "16px", fontSize: "10px", color: "#6a645d", marginBottom: "6px", fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <span>📅 {update.date}</span>
            <span>🔗 Kasus: #{update.relatedCases}</span>
          </div>
          <p style={{ margin: "0", fontSize: "11px", color: "#49443f", fontStyle: "italic", lineHeight: "1.4", fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {update.summary}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flex: "0 0 auto" }}>
          <StatusBadge status={update.status} type="transparency" />
          <div style={{ fontSize: "16px", color: "#6a645d", fontWeight: 600 }}>
            {expanded ? "−" : "+"}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{
          marginTop: "10px",
          paddingTop: "10px",
          borderTop: "1px solid #ede8dd",
          fontSize: "12px",
          color: "#49443f",
          lineHeight: "1.5",
          fontFamily: "'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
          <p style={{ margin: "0 0 6px 0" }}><strong style={{ color: "#1d1915" }}>Detail Investigasi:</strong></p>
          <p style={{ margin: "0 0 8px 0" }}>{update.details}</p>
          <div style={{ fontSize: "10px", color: "#8a847d" }}>
            🔬 Penginvestigasi: {update.investigatorName}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Reports() {
  const [expandedReports, setExpandedReports] = useState({});
  const [expandedCases, setExpandedCases] = useState({});
  const [expandedUpdates, setExpandedUpdates] = useState({});

  const [reportFilters, setReportFilters] = useState({
    status: "All",
    category: "All"
  });

  const [caseFilters, setCaseFilters] = useState({
    status: "All"
  });

  const toggleReportExpand = (id) => {
    setExpandedReports(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCaseExpand = (id) => {
    setExpandedCases(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleUpdateExpand = (id) => {
    setExpandedUpdates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredReports = anonymousReports.filter(report => {
    if (reportFilters.status !== "All" && report.status !== reportFilters.status) return false;
    if (reportFilters.category !== "All" && report.category !== reportFilters.category) return false;
    return true;
  });

  const filteredCases = caseReviews.filter(caseData => {
    if (caseFilters.status !== "All" && caseData.status !== caseFilters.status) return false;
    return true;
  });

  const reportCategories = ["All", ...new Set(anonymousReports.map(r => r.category))];
  const reportStatuses = ["All", "Pending", "Verified", "Rejected"];
  const caseStatuses = ["All", "Open", "In Review", "Closed"];

  return (
    <main style={{
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f8f6f1"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        padding: "16px 0",
        flex: 1,
        minHeight: 0,
        overflowY: "auto"
      }}>
        {/* Page Header */}
        <div style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          marginBottom: "20px"
        }}>
          <h2 style={{
            margin: 0,
            fontSize: "28px",
            lineHeight: "1",
            letterSpacing: "-.05em",
            fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            color: "#1f1b17"
          }}>
            Reports & Transparency
          </h2>
        </div>

        {/* Section 1: Anonymous Reports */}
        <div style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px"
          }}>
            <Icon name="folder" size={20} />
            <h3 style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.1",
              letterSpacing: "-.05em",
              fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              color: "#1f1b17"
            }}>
              Anonymous Reports
            </h3>
            <span style={{
              fontSize: "11px",
              backgroundColor: "#e5dbc8",
              color: "#49443f",
              padding: "3px 7px",
              borderRadius: "6px",
              fontWeight: 700
            }}>
              {filteredReports.length}
            </span>
          </div>



          {/* Filters */}
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "12px",
            flexWrap: "wrap"
          }}>
            <select 
              value={reportFilters.status} 
              onChange={(e) => setReportFilters({...reportFilters, status: e.target.value})}
              style={{
                border: "1px solid #d9d2c7",
                background: "#fff",
                borderRadius: "12px",
                padding: "6px 10px",
                color: "#3a3732",
                fontSize: "11px",
                height: "30px",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {reportStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select 
              value={reportFilters.category} 
              onChange={(e) => setReportFilters({...reportFilters, category: e.target.value})}
              style={{
                border: "1px solid #d9d2c7",
                background: "#fff",
                borderRadius: "12px",
                padding: "6px 10px",
                color: "#3a3732",
                fontSize: "11px",
                height: "30px",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {reportCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Reports List */}
          <div>
            {filteredReports.map(report => (
              <ReportCard 
                key={report.id} 
                report={report} 
                onExpand={toggleReportExpand}
                expanded={expandedReports[report.id]}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Case Review */}
        <div style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px"
          }}>
            <Icon name="clock" size={20} />
            <h3 style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.1",
              letterSpacing: "-.05em",
              fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              color: "#1f1b17"
            }}>
              Case Review
            </h3>
            <span style={{
              fontSize: "11px",
              backgroundColor: "#e5dbc8",
              color: "#49443f",
              padding: "3px 7px",
              borderRadius: "6px",
              fontWeight: 700
            }}>
              {filteredCases.length}
            </span>
          </div>



          {/* Filter */}
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "12px"
          }}>
            <select 
              value={caseFilters.status} 
              onChange={(e) => setCaseFilters({...caseFilters, status: e.target.value})}
              style={{
                border: "1px solid #d9d2c7",
                background: "#fff",
                borderRadius: "12px",
                padding: "6px 10px",
                color: "#3a3732",
                fontSize: "11px",
                height: "30px",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {caseStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Cases List */}
          <div>
            {filteredCases.map(caseData => (
              <CaseCard 
                key={caseData.id} 
                caseData={caseData} 
                onExpand={toggleCaseExpand}
                expanded={expandedCases[caseData.id]}
              />
            ))}
          </div>
        </div>

        {/* Section 3: Transparency Hub */}
        <div style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          marginBottom: "24px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px"
          }}>
            <Icon name="trending" size={20} />
            <h3 style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.1",
              letterSpacing: "-.05em",
              fontFamily: "'Anthropic Serif', Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              color: "#1f1b17"
            }}>
              Transparency Hub
            </h3>
            <span style={{
              fontSize: "11px",
              backgroundColor: "#e5dbc8",
              color: "#49443f",
              padding: "3px 7px",
              borderRadius: "6px",
              fontWeight: 700
            }}>
              {transparencyUpdates.length}
            </span>
          </div>



          {/* Updates List */}
          <div>
            {transparencyUpdates.map(update => (
              <TransparencyCard 
                key={update.id} 
                update={update} 
                onExpand={toggleUpdateExpand}
                expanded={expandedUpdates[update.id]}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

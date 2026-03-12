export default function Results({ data }) {
  return (
    <div style={{ marginBottom: "48px" }}>

      {/* Score Hero */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px", padding: "36px",
        display: "grid", gridTemplateColumns: "auto 1fr",
        gap: "32px", alignItems: "center", marginBottom: "16px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "110px", height: "110px", borderRadius: "50%",
            background: `conic-gradient(#00e5a0 ${data.match_score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 30px rgba(0,229,160,0.2)"
          }}>
            <div style={{
              width: "86px", height: "86px", borderRadius: "50%",
              background: "#0a0a0f",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: "800", color: "#00e5a0" }}>
                {data.match_score}%
              </span>
            </div>
          </div>
          <p style={{ fontSize: "11px", color: "#6b6b80", marginTop: "10px", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "DM Mono, monospace" }}>Match Score</p>
        </div>

        <div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "#ffffff" }}>
            {data.score_label}
          </h2>
          <p style={{ color: "#b0b0cc", fontSize: "14px", lineHeight: "1.7", marginBottom: "20px", fontFamily: "DM Mono, monospace" }}>
            {data.score_summary}
          </p>
          <ProgressBar label="ATS Score" value={data.ats_score} color="#00e5a0" />
          <ProgressBar label="Hire Prob." value={data.hiring_probability} color="#0099ff" />
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <SkillCard title="✅ Matched Skills" skills={data.matched_skills} type="match" />
        <SkillCard title="⚠️ Missing Skills" skills={data.missing_skills} type="missing" />
      </div>

      {/* ATS Checks */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "28px", marginBottom: "16px",
        backdropFilter: "blur(20px)"
      }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#00e5a0", marginBottom: "20px", fontFamily: "DM Mono, monospace" }}>
          🤖 ATS Compatibility Check — <span style={{ color: "#ffffff" }}>{data.ats_score}/100</span>
        </p>
        {data.ats_checks?.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: "12px", padding: "12px 0",
            borderBottom: i < data.ats_checks.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            fontSize: "14px", lineHeight: "1.5", color: "#d0d0e8",
            fontFamily: "DM Mono, monospace"
          }}>
            <span style={{ fontSize: "16px" }}>{item.ok ? "✅" : "❌"}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      <div style={{
        background: "rgba(0,153,255,0.05)",
        border: "1px solid rgba(0,153,255,0.2)",
        borderRadius: "16px", padding: "28px", marginBottom: "16px",
        backdropFilter: "blur(20px)"
      }}>
        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#0099ff", marginBottom: "20px", fontFamily: "DM Mono, monospace" }}>
          💡 AI Improvement Suggestions
        </p>
        {data.suggestions?.map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: "16px", padding: "14px 0",
            borderBottom: i < data.suggestions.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            fontSize: "14px", lineHeight: "1.7", color: "#d0d0e8",
            fontFamily: "DM Mono, monospace"
          }}>
            <span style={{
              color: "#0099ff", fontFamily: "Syne, sans-serif",
              fontWeight: "800", fontSize: "20px", minWidth: "28px", lineHeight: "1.4"
            }}>{i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* Cover Letter */}
      {data.cover_letter && (
        <div style={{
          background: "rgba(0,229,160,0.04)",
          border: "1px solid rgba(0,229,160,0.15)",
          borderRadius: "16px", padding: "28px",
          backdropFilter: "blur(20px)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#00e5a0", fontFamily: "DM Mono, monospace" }}>
              📄 AI Generated Cover Letter
            </p>
            <button
              onClick={() => navigator.clipboard.writeText(data.cover_letter)}
              style={{
                background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)",
                color: "#00e5a0", borderRadius: "8px", padding: "8px 16px",
                fontSize: "12px", cursor: "pointer", fontFamily: "DM Mono, monospace"
              }}
            >Copy</button>
          </div>
          <p style={{ fontSize: "14px", lineHeight: "1.9", color: "#c8c8e0", whiteSpace: "pre-wrap", fontFamily: "DM Mono, monospace" }}>
            {data.cover_letter}
          </p>
        </div>
      )}
    </div>
  )
}

function ProgressBar({ label, value, color = "#00e5a0" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#6b6b80", minWidth: "90px", fontFamily: "DM Mono, monospace" }}>{label}</span>
      <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "3px", boxShadow: `0 0 10px ${color}50` }} />
      </div>
      <span style={{ fontSize: "13px", minWidth: "40px", textAlign: "right", color: "#ffffff", fontFamily: "DM Mono, monospace" }}>{value}%</span>
    </div>
  )
}

function SkillCard({ title, skills, type }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${type === "match" ? "rgba(0,229,160,0.15)" : "rgba(255,107,53,0.15)"}`,
      borderRadius: "16px", padding: "24px",
      backdropFilter: "blur(20px)"
    }}>
      <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: type === "match" ? "#00e5a0" : "#ff6b35", marginBottom: "16px", fontFamily: "DM Mono, monospace" }}>{title}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {skills?.length > 0 ? skills.map((s, i) => (
          <span key={i} style={{
            fontSize: "12px", padding: "6px 14px", borderRadius: "8px",
            background: type === "match" ? "rgba(0,229,160,0.1)" : "rgba(255,107,53,0.1)",
            border: `1px solid ${type === "match" ? "rgba(0,229,160,0.3)" : "rgba(255,107,53,0.3)"}`,
            color: type === "match" ? "#00e5a0" : "#ff6b35",
            fontFamily: "DM Mono, monospace"
          }}>{s}</span>
        )) : <span style={{ color: "#6b6b80", fontSize: "13px", fontFamily: "DM Mono, monospace" }}>None detected</span>}
      </div>
    </div>
  )
}
import { useState } from "react"
import UploadZone from "./components/UploadZone"
import Results from "./components/Results"
import "./index.css"

export default function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [history, setHistory] = useState([])
  const [activeTab, setActiveTab] = useState("analyze")

  const handleResults = (data) => {
    setResults(data)
    setHistory(prev => {
      const newEntry = { ...data, timestamp: new Date().toLocaleTimeString() }
      return [newEntry, ...prev].slice(0, 3)
    })
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #0a0a0f 50%, #0d0d1f 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 40px 80px",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "fixed", width: "600px", height: "600px", borderRadius: "50%", top: "-200px", left: "-200px", background: "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)", pointerEvents: "none", animation: "float1 8s ease-in-out infinite" }} />
      <div style={{ position: "fixed", width: "500px", height: "500px", borderRadius: "50%", bottom: "-150px", right: "-150px", background: "radial-gradient(circle, rgba(0,153,255,0.08) 0%, transparent 70%)", pointerEvents: "none", animation: "float2 10s ease-in-out infinite" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(0.95)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,229,160,0.3)} 50%{box-shadow:0 0 0 12px rgba(0,229,160,0)} }
        * { box-sizing: border-box; }
        textarea:focus { outline: none !important; }
      `}</style>

      {/* Header */}
      <header style={{ width: "100%", maxWidth: "1200px", padding: "36px 0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeUp 0.6s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #00e5a0, #00b377)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 4px 20px rgba(0,229,160,0.3)", animation: "pulse 3s ease infinite" }}>🎯</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", color: "#e8e8f0" }}>
            Auto<span style={{ color: "#00e5a0" }}>Apply</span> Intelligence
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {history.length > 0 && (
            <span style={{ fontSize: "12px", color: "#6b6b80", fontFamily: "DM Mono, monospace" }}>
              {history.length} analysis saved
            </span>
          )}
          <span style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.25)", color: "#00e5a0", fontSize: "11px", padding: "5px 12px", borderRadius: "20px", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "DM Mono, monospace" }}>AI Powered</span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "40px", maxWidth: "700px", animation: "fadeUp 0.6s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}>
        <div style={{ display: "inline-block", background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: "20px", padding: "6px 16px", fontSize: "12px", color: "#00e5a0", fontFamily: "DM Mono, monospace", letterSpacing: "1px", marginBottom: "24px" }}>✦ Smart Job Application Analyzer</div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "800", letterSpacing: "-2px", marginBottom: "20px", lineHeight: "1.05", color: "#e8e8f0" }}>
          Know Your Chances<br />
          <span style={{ background: "linear-gradient(135deg, #00e5a0, #0099ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Before You Apply</span>
        </h1>
        <p style={{ color: "#6b6b80", fontSize: "15px", lineHeight: "1.7", fontFamily: "DM Mono, monospace" }}>
          Upload your resume PDF + paste any job description.<br />
          Get instant match score, skill gap analysis, ATS check & AI cover letter.
        </p>
      </div>

      {/* Tabs (only show if history exists) */}
      {history.length > 0 && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["analyze", "history"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 20px", borderRadius: "8px", border: "1px solid",
              borderColor: activeTab === tab ? "rgba(0,229,160,0.4)" : "rgba(255,255,255,0.08)",
              background: activeTab === tab ? "rgba(0,229,160,0.1)" : "transparent",
              color: activeTab === tab ? "#00e5a0" : "#6b6b80",
              fontFamily: "DM Mono, monospace", fontSize: "12px",
              textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer"
            }}>
              {tab === "analyze" ? "⚡ Analyze" : `📋 History (${history.length})`}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      {activeTab === "analyze" ? (
        <>
          <div style={{ width: "100%", maxWidth: "1200px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", backdropFilter: "blur(20px)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)", animation: "fadeUp 0.6s 0.2s ease both", animationFillMode: "forwards", opacity: 0 }}>
            <UploadZone setResults={handleResults} setLoading={setLoading} setError={setError} loading={loading} />
          </div>

          {error && (
            <div style={{ width: "100%", maxWidth: "1200px", marginTop: "16px", background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.25)", borderRadius: "12px", padding: "16px 20px", color: "#ff6b35", fontSize: "13px", fontFamily: "DM Mono, monospace" }}>⚠️ {error}</div>
          )}

          {loading && (
            <div style={{ width: "100%", maxWidth: "1200px", marginTop: "32px", textAlign: "center", padding: "60px 0", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px" }}>
              <div style={{ width: "52px", height: "52px", border: "3px solid rgba(255,255,255,0.05)", borderTopColor: "#00e5a0", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
              <p style={{ color: "#6b6b80", fontSize: "13px", fontFamily: "DM Mono, monospace" }}>Analyzing your application with AI...</p>
            </div>
          )}

          {results && !loading && (
            <div style={{ width: "100%", maxWidth: "1200px", marginTop: "32px" }}>
              <Results data={results} />
            </div>
          )}
        </>
      ) : (
        /* History Tab */
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          {history.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => { setResults(item); setActiveTab("analyze") }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontSize: "28px", fontWeight: "800", color: "#00e5a0" }}>{item.match_score}%</span>
                  <div>
                    <p style={{ fontFamily: "Syne, sans-serif", fontSize: "16px", fontWeight: "700", color: "#ffffff" }}>{item.score_label}</p>
                    <p style={{ fontSize: "12px", color: "#6b6b80", fontFamily: "DM Mono, monospace" }}>ATS: {item.ats_score}/100 · {item.timestamp}</p>
                  </div>
                </div>
                <span style={{ fontSize: "12px", color: "#00e5a0", fontFamily: "DM Mono, monospace" }}>Click to view →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer style={{ marginTop: "64px", fontSize: "12px", color: "#3a3a4a", fontFamily: "DM Mono, monospace", textAlign: "center" }}>
        AutoApply Intelligence · Vinayak · SRKR Engineering College
      </footer>
    </div>
  )
}
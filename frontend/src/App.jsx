import { useState } from "react"
import UploadZone from "./components/UploadZone"
import Results from "./components/Results"
import "./index.css"

export default function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #0a0a0f 50%, #0d0d1f 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 24px 80px",
      position: "relative", overflow: "hidden"
    }}>
      {/* 3D floating orbs */}
      <div style={{
        position: "fixed", width: "600px", height: "600px",
        borderRadius: "50%", top: "-200px", left: "-200px",
        background: "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)",
        pointerEvents: "none", animation: "float1 8s ease-in-out infinite"
      }} />
      <div style={{
        position: "fixed", width: "500px", height: "500px",
        borderRadius: "50%", bottom: "-150px", right: "-150px",
        background: "radial-gradient(circle, rgba(0,153,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none", animation: "float2 10s ease-in-out infinite"
      }} />
      <div style={{
        position: "fixed", width: "300px", height: "300px",
        borderRadius: "50%", top: "40%", right: "10%",
        background: "radial-gradient(circle, rgba(120,0,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none", animation: "float1 12s ease-in-out infinite reverse"
      }} />

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
      <header style={{
        width: "100%", maxWidth: "860px",
        padding: "36px 0 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        animation: "fadeUp 0.6s ease both"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px",
            background: "linear-gradient(135deg, #00e5a0, #00b377)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 4px 20px rgba(0,229,160,0.3)",
            animation: "pulse 3s ease infinite"
          }}>🎯</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: "700", color: "#e8e8f0" }}>
            Auto<span style={{ color: "#00e5a0" }}>Apply</span> Intelligence
          </span>
        </div>
        <span style={{
          background: "rgba(0,229,160,0.08)",
          border: "1px solid rgba(0,229,160,0.25)",
          color: "#00e5a0", fontSize: "11px",
          padding: "5px 12px", borderRadius: "20px",
          letterSpacing: "1.5px", textTransform: "uppercase",
          fontFamily: "DM Mono, monospace",
          backdropFilter: "blur(10px)"
        }}>AI Powered</span>
      </header>

      {/* Hero */}
      <div style={{
        textAlign: "center", marginBottom: "52px", maxWidth: "640px",
        animation: "fadeUp 0.6s 0.1s ease both", opacity: 0,
        animationFillMode: "forwards"
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(0,229,160,0.08)",
          border: "1px solid rgba(0,229,160,0.2)",
          borderRadius: "20px", padding: "6px 16px",
          fontSize: "12px", color: "#00e5a0",
          fontFamily: "DM Mono, monospace",
          letterSpacing: "1px", marginBottom: "24px"
        }}>✦ Smart Job Application Analyzer</div>

        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(32px, 5vw, 54px)",
          fontWeight: "800", letterSpacing: "-2px",
          marginBottom: "20px", lineHeight: "1.05", color: "#e8e8f0"
        }}>
          Know Your Chances<br />
          <span style={{
            background: "linear-gradient(135deg, #00e5a0, #0099ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Before You Apply</span>
        </h1>
        <p style={{ color: "#6b6b80", fontSize: "15px", lineHeight: "1.7", fontFamily: "DM Mono, monospace" }}>
          Upload your resume PDF + paste any job description.<br />
          Get instant match score, skill gap analysis, ATS check & AI cover letter.
        </p>
      </div>

      {/* Main Card */}
      <div style={{
        width: "100%", maxWidth: "860px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px", padding: "40px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.1) inset",
        animation: "fadeUp 0.6s 0.2s ease both",
        animationFillMode: "forwards", opacity: 0,
        transform: "perspective(1000px) rotateX(1deg)"
      }}>
        <UploadZone
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
          loading={loading}
        />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          width: "100%", maxWidth: "860px", marginTop: "16px",
          background: "rgba(255,107,53,0.08)",
          border: "1px solid rgba(255,107,53,0.25)",
          borderRadius: "12px", padding: "16px 20px",
          color: "#ff6b35", fontSize: "13px",
          fontFamily: "DM Mono, monospace",
          backdropFilter: "blur(10px)"
        }}>⚠️ {error}</div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{
          width: "100%", maxWidth: "860px", marginTop: "32px",
          textAlign: "center", padding: "60px 0",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px", backdropFilter: "blur(20px)"
        }}>
          <div style={{
            width: "52px", height: "52px",
            border: "3px solid rgba(255,255,255,0.05)",
            borderTopColor: "#00e5a0",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 20px",
            boxShadow: "0 0 20px rgba(0,229,160,0.2)"
          }} />
          <p style={{ color: "#6b6b80", fontSize: "13px", fontFamily: "DM Mono, monospace" }}>
            Analyzing your application with AI...
          </p>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div style={{ width: "100%", maxWidth: "860px", marginTop: "32px" }}>
          <Results data={results} />
        </div>
      )}

      {/* Footer */}
      <footer style={{
        marginTop: "64px", fontSize: "12px", color: "#3a3a4a",
        fontFamily: "DM Mono, monospace", textAlign: "center"
      }}>
        AutoApply Intelligence · Vinayak · SRKR Engineering College
      </footer>
    </div>
  )
}
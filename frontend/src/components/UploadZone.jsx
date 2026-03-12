import { useState } from "react"
import axios from "axios"

export default function UploadZone({ setResults, setLoading, setError, loading }) {
  const [resume, setResume] = useState(null)
  const [jd, setJd] = useState("")
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setResume(file)
      setError("")
    } else {
      setError("Please upload a PDF file only.")
    }
  }

  const handleSubmit = async () => {
    if (!resume) return setError("Please upload your resume PDF.")
    if (!jd.trim()) return setError("Please paste the job description.")

    setLoading(true)
    setError("")
    setResults(null)

    const formData = new FormData()
    formData.append("resume", resume)
    formData.append("job_description", jd)

    try {
const res = await axios.post("https://autoapply-backend-rxkp.onrender.com/api/analyze", formData)      setResults(res.data)
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Is the backend running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px" }}>
        
        {/* PDF Upload */}
        <div>
          <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#6b6b80", display: "block", marginBottom: "8px" }}>
            📄 Resume PDF
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
            onClick={() => document.getElementById("resumeInput").click()}
            style={{
              background: dragging ? "rgba(0,229,160,0.05)" : "#111118",
              border: `2px dashed ${dragging ? "#00e5a0" : resume ? "rgba(0,229,160,0.4)" : "#2a2a3a"}`,
              borderRadius: "10px", padding: "40px 20px",
              textAlign: "center", cursor: "pointer",
              transition: "all 0.2s", minHeight: "160px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "8px"
            }}
          >
            <span style={{ fontSize: "32px" }}>{resume ? "✅" : "📁"}</span>
            <span style={{ fontSize: "13px", color: resume ? "#00e5a0" : "#6b6b80" }}>
              {resume ? resume.name : "Drop PDF here or click to upload"}
            </span>
            {!resume && <span style={{ fontSize: "11px", color: "#3a3a4a" }}>PDF files only</span>}
          </div>
          <input
            id="resumeInput" type="file" accept=".pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* Job Description */}
        <div>
          <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#6b6b80", display: "block", marginBottom: "8px" }}>
            💼 Job Description
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            style={{
              width: "100%", minHeight: "160px",
              background: "#111118", border: "1px solid #2a2a3a",
              borderRadius: "10px", color: "#e8e8f0",
              fontFamily: "DM Mono, monospace", fontSize: "13px",
              padding: "16px", resize: "vertical", outline: "none",
              lineHeight: "1.6"
            }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", background: "#00e5a0",
          color: "#0a0a0f", border: "none",
          borderRadius: "10px", padding: "16px",
          fontFamily: "Syne, sans-serif", fontSize: "15px",
          fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1, transition: "all 0.2s"
        }}
      >
        {loading ? "⏳ Analyzing..." : "⚡ Analyze My Application"}
      </button>
    </div>
  )
}
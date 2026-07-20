import ATSCard from "./components/ATSCard";
import ResumeSummary from "./components/ResumeSummary";
import Skills from "./components/Skills";
import Strengths from "./components/Strengths";
import Weaknesses from "./components/Weaknesses";
import Suggestions from "./components/Suggestions";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useState } from "react";
import "./App.css";
import API from "./api";
import generatePDF from "./utils/pdfGenerator";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [jobResult, setJobResult] = useState(null);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await API.post(
        "/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(response.data.analysis);

    } catch (error) {
      console.error(error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const matchJob = async () => {
    if (!file) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription) {
      alert("Please enter a Job Description.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {

      const response = await API.post(
        "/match-job",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setJobResult(response.data.result);

    } catch (error) {
      console.error(error);
      alert("Job Matching Failed.");
    }
  };

  return (
    <div className="app">

      <div className="container">

        <h1>🤖 AI Resume Analyzer</h1>

        <p>
          Analyze your resume, calculate ATS Score,
          identify strengths, weaknesses,
          suggestions and match it with
          Job Descriptions.
        </p>

        <div className="card">

          <h2>Upload Resume</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <br />
          <br />

          <button onClick={analyzeResume}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>

        {analysis && (

          <div className="results">

            {/* ATS SCORE */}

            <ATSCard score={analysis.ats_score} />

            <ResumeSummary summary={analysis.summary} />


            {/* SKILLS */}

            <Skills skills={analysis.skills} />

            {/* STRENGTHS */}

            <Strengths strengths={analysis.strengths} />

            {/* WEAKNESSES */}

            <Weaknesses weaknesses={analysis.weaknesses} />

            {/* SUGGESTIONS */}

            <Suggestions suggestions={analysis.suggestions} />

            {/* DOWNLOAD REPORT */}

            <div className="section-card">

              <h3>📄 Download Analysis Report</h3>

              <button
                onClick={() =>
                  generatePDF(analysis, jobResult)
                }
              >
                Download PDF Report
              </button>

            </div>

            {/* JOB DESCRIPTION */}

            <div className="section-card">

              <h3>💼 Job Description Matching</h3>

              <textarea
                rows="8"
                placeholder="Paste Job Description Here..."
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
              />

              <br />
              <br />

              <button onClick={matchJob}>
                Match Resume
              </button>

            </div>

            {/* MATCH RESULT */}

            {jobResult && (

              <div className="section-card">

                <h3>🎯 Match Score</h3>

                <h2>{jobResult.match_score}%</h2>

                <h3>✅ Matched Skills</h3>

                <div className="skill-container">

                  {jobResult.matched_skills.length > 0 ? (

                    jobResult.matched_skills.map((skill, index) => (

                      <span
                        key={index}
                        className="skill-badge"
                      >
                        {skill}
                      </span>

                    ))

                  ) : (

                    <p>No matching skills found.</p>

                  )}

                </div>

                <h3 style={{ marginTop: "25px" }}>
                  ❌ Missing Skills
                </h3>

                <div className="skill-container">

                  {jobResult.missing_skills.length > 0 ? (

                    jobResult.missing_skills.map((skill, index) => (

                      <span
                        key={index}
                        className="skill-badge missing"
                      >
                        {skill}
                      </span>

                    ))

                  ) : (

                    <p>No missing skills.</p>

                  )}

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </div >
  );
}

export default App;
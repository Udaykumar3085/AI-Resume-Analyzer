import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ATSCard({ score }) {
    return (
        <div className="score-card">
            <h2>ATS Score</h2>

            <div
                style={{
                    width: "220px",
                    height: "220px",
                    margin: "30px auto",
                }}
            >
                <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                        textSize: "18px",
                        pathColor: "#22c55e",
                        textColor: "#ffffff",
                        trailColor: "#334155",
                    })}
                />
            </div>

            <h3
                style={{
                    textAlign: "center",
                    color: "#22c55e",
                    marginTop: "20px",
                }}
            >
                {score >= 80
                    ? "Excellent ATS Score"
                    : score >= 60
                        ? "Good ATS Score"
                        : "Needs Improvement"}
            </h3>
        </div>
    );
}

export default ATSCard;
import jsPDF from "jspdf";

const generatePDF = (analysis, jobResult) => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("AI Resume Analyzer Report", 20, y);

    y += 20;

    doc.setFontSize(16);
    doc.text(`ATS Score: ${analysis.ats_score}/100`, 20, y);

    y += 15;

    doc.text("Skills:", 20, y);

    y += 10;

    analysis.skills.forEach((skill) => {
        doc.text("- " + skill, 25, y);
        y += 8;
    });

    y += 10;

    doc.text("Strengths:", 20, y);

    y += 10;

    analysis.strengths.forEach((item) => {
        doc.text("- " + item, 25, y);
        y += 8;
    });

    y += 10;

    doc.text("Weaknesses:", 20, y);

    y += 10;

    analysis.weaknesses.forEach((item) => {
        doc.text("- " + item, 25, y);
        y += 8;
    });

    y += 10;

    doc.text("Suggestions:", 20, y);

    y += 10;

    if (analysis.suggestions.length === 0) {
        doc.text("- Resume looks excellent!", 25, y);
        y += 8;
    } else {
        analysis.suggestions.forEach((item) => {
            doc.text("- " + item, 25, y);
            y += 8;
        });
    }

    if (jobResult) {
        y += 15;

        doc.text("Job Match Score:", 20, y);

        y += 10;

        doc.text(jobResult.match_score + "%", 25, y);
    }

    doc.save("AI_Resume_Report.pdf");
};

export default generatePDF;
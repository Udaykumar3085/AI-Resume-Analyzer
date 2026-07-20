function Header() {
    return (
        <header
            style={{
                background: "#2563eb",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "25px",
                textAlign: "center",
            }}
        >
            <h1>🤖 AI Resume Analyzer</h1>

            <p>
                Upload your resume, calculate ATS score and match it with job
                descriptions.
            </p>
        </header>
    );
}

export default Header;
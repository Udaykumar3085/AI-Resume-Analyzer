function Navbar() {
    return (
        <nav
            style={{
                background: "#2563eb",
                color: "white",
                padding: "18px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "12px",
                marginBottom: "25px",
            }}
        >
            <h2 style={{ margin: 0 }}>🤖 AI Resume Analyzer</h2>

            <div style={{ display: "flex", gap: "20px" }}>
                <span>Home</span>
                <span>Resume Analysis</span>
                <span>Job Match</span>
                <span>About</span>
            </div>
        </nav>
    );
}

export default Navbar;
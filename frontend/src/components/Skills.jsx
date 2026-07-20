function Skills({ skills }) {
    return (
        <div className="section-card">
            <h3>🛠 Skills</h3>

            <div className="skill-container">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="skill-badge"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Skills;
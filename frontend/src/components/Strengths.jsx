function Strengths({ strengths }) {
    return (
        <div className="section-card">
            <h3>💪 Strengths</h3>

            <ul>
                {strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Strengths;
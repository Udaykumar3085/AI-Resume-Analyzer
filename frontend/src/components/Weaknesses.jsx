function Weaknesses({ weaknesses }) {
    return (
        <div className="section-card">
            <h3>⚠ Weaknesses</h3>

            <ul>
                {weaknesses.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Weaknesses;
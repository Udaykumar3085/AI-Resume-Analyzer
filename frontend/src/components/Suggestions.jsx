function Suggestions({ suggestions }) {
    return (
        <div className="section-card">
            <h3>💡 Suggestions</h3>

            <ul>
                {suggestions.length === 0 ? (
                    <li>Your Resume looks Excellent!</li>
                ) : (
                    suggestions.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Suggestions;
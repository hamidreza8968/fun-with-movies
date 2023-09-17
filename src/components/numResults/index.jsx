function NumResults({movies}) {
    return (
        <p className="num-results">
            <span className="num-result">
                Found <strong>{movies.length}</strong> results
            </span>
            <span className="mobile-num-result">{movies.length}</span>
        </p>
    );
}
export default NumResults
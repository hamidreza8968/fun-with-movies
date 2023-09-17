function ErrorMessage({message}) {
    return (
        <p className="error">
            <span>🚫&nbsp;</span>{message}
        </p>
    );
}
export default ErrorMessage
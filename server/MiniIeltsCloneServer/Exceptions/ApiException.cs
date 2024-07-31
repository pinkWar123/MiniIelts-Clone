public class ApiValidationException : Exception
{
    public IDictionary<string, string[]> Errors { get; }

    public ApiValidationException(IDictionary<string, string[]> errors)
        : base()
    {
        Errors = errors;
    }
}

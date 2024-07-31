using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

public static class CustomGlobalExceptionHandler
{
    public static void Configure(IApplicationBuilder builder)
    {
        builder.Run(async context =>
        {
            var exceptionHandlerPathFeature =
                context.Features.Get<IExceptionHandlerPathFeature>();

            // Declare the problem results
            IResult problemResult;

            // Switch statement to match the custom exceptions
            switch (exceptionHandlerPathFeature?.Error)
            {
                // case UserAlreadyExistsException:
                // {
                //     var details = new ProblemDetails
                //     {
                //         Type = "https://httpstatuses.com/409",
                //         Title = "User already exists.",
                //         Status = StatusCodes.Status409Conflict,
                //     };

                //     problemResult = Results.Problem(details);
                //     break;
                // }

                // Other custom exceptions, say UnauthorizedException and return
                // a 401 Unauthorized problem details

                // This custom exception here contains validation errors from
                // Fluent Validation
                case ApiValidationException:
                    {
                        // Casting the exception to ApiValidationException to get the
                        // `Errors` property and send it back to the client
                        var exp = (ApiValidationException)exceptionHandlerPathFeature!.Error;

                        problemResult = Results.ValidationProblem
                        (
                            exp.Errors,
                            type: "https://httpstatuses.com/400",
                            statusCode: StatusCodes.Status400BadRequest
                        );
                        break;
                    }

                // If no custom exception is matched, return generic 500 Internal Server
                // error response
                default:
                    {
                        var details = new ProblemDetails
                        {
                            Type = "https://httpstatuses.com/500",
                            Title = "An error occurred while processing your request.",
                            Status = StatusCodes.Status500InternalServerError
                        };

                        problemResult = Results.Problem(details);
                        break;
                    }
            }

            await problemResult.ExecuteAsync(context);
        });
    }
}

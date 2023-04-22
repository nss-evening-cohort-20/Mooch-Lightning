using System.Text.Json;

namespace Mooch_Lightning.Utils;

public class ResponseFormatterMiddleware
{
    private readonly RequestDelegate _next;

    public ResponseFormatterMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        await _next.Invoke(context);

        if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
        {
            await context.Response.WriteAsync(JsonSerializer.Serialize(new ResponseModel("The User is not authorized to access this page!")));

            context.Response.Headers.Add("Error", "Authentication required");
        }
    }
}

public class ResponseModel
{
    public ResponseModel(string message)
    {
        Message = message;
    }

    public string Message { get; set; }
}
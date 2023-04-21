using Mooch_Lightning.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var firebaseProjectId = builder.Configuration.GetValue<string>("FirebaseProjectId");
var googleTokenUrl = $"https://securetoken.google.com/{firebaseProjectId}";

//vvvvvvvvvvvvvvvvvvvvvvvvvv Add Dependency Injections Here vvvvvvvvvvvvvvvvvvvvvvvvvvvv
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserMembershipRepository, UserMembershipRepository>();
//^^^^^^^^^^^^^^^^^^^^^^^^^^ Add Dependency Injections Here ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(options =>
    {
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
        options.AllowAnyHeader();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

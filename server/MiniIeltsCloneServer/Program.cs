using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Data.Repositories.ResultRepo;
using MiniIeltsCloneServer.Data.Repositories.StatisticRepo;
using MiniIeltsCloneServer.Data.Repositories.TestRepo;
using MiniIeltsCloneServer.Data.Seeding;
using MiniIeltsCloneServer.Exceptions;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Repositories;
using MiniIeltsCloneServer.Services.AnswerService;
using MiniIeltsCloneServer.Services.BlobService;
using MiniIeltsCloneServer.Services.DashboardService;
using MiniIeltsCloneServer.Services.ExerciseChoiceService;
using MiniIeltsCloneServer.Services.ExerciseService;
using MiniIeltsCloneServer.Services.QuestionChoiceService;
using MiniIeltsCloneServer.Services.ResultService;
using MiniIeltsCloneServer.Services.StatisticService;
using MiniIeltsCloneServer.Services.TestService;
using MiniIeltsCloneServer.Services.TokenService;
using MiniIeltsCloneServer.Services.UriService;
using MiniIeltsCloneServer.Services.UserService;
using MiniIeltsCloneServer.Settings;
using MiniIeltsCloneServer.Validators;
using Newtonsoft.Json;
using Hangfire;
using Hangfire.Dashboard;
using MiniIeltsCloneServer.Services.HangfireService;
using MiniIeltsCloneServer.Data.Repositories.FullTestRepo;
using MiniIeltsCloneServer.Services.FullTestService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<Amazon.S3.IAmazonS3>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddHangfire(x => x.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost";
    options.ConfigurationOptions = new StackExchange.Redis.ConfigurationOptions()
    {
        AbortOnConnectFail = true,
        EndPoints = { options.Configuration }
    };
});
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.Configure<AzureConfig>(builder.Configuration.GetSection("Azure"));
builder.Services.Configure<AWS>(builder.Configuration.GetSection("AWS"));
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme =
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]))
    };
    options.IncludeErrorDetails = true;
});
builder.Services.AddSingleton<IUriService>(o =>
{
    IHttpContextAccessor accessor = o.GetRequiredService<IHttpContextAccessor>();
    HttpRequest? request = accessor.HttpContext.Request;
    string? uri = string.Concat(request.Scheme, "://", request.Host.ToUriComponent());
    return new UriService(uri);
});
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<ITestRepository, TestRepository>();
builder.Services.AddScoped<IResultRepository, ResultRepository>();
builder.Services.AddScoped<IStatisticRepository, StatisticRepository>();
builder.Services.AddScoped<IFullTestRepository, FullTestRepository>();
builder.Services.AddScoped<ITestService, TestService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IExerciseChoiceService, ExerciseChoiceService>();
builder.Services.AddScoped<IQuestionChoiceService, QuestionChoiceService>();
builder.Services.AddScoped<IExerciseService, ExerciseService>();
builder.Services.AddScoped<IResultService, ResultService>();
builder.Services.AddScoped<IAnswerService, AnswerService>();
builder.Services.AddScoped<IStatisticService, StatisticService>();
builder.Services.AddScoped<IFullTestService, FullTestService>();
builder.Services.AddScoped<IHangfireService, HangfireService>();
// builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
// builder.Services.AddScoped<IAuthorizationHandler, PermissionAuthorizationHandler>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddValidatorsFromAssemblyContaining<CreateTestValidator>();
builder.Services.AddSingleton<AzureBlobService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
// builder.Services.AddProblemDetails();


// builder.Services.AddMediatR(cfg => {
//     cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
//     cfg.AddOpenBehavior(typeof(RequestResponseLoggingBehavior<,>));
//     cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
// });


var app = builder.Build();
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    IsReadOnlyFunc = (DashboardContext context) => true
});
app.UseHangfireDashboard();
// SeedDatabase(app.Services);
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    SeedData.Initialize(services, userManager).Wait();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();
// app.UseExceptionHandler(GlobalExceptionHandler.Configure);
app.UseMiddleware<GlobalExceptionHandler>();
app.MapControllers();
app.Run();


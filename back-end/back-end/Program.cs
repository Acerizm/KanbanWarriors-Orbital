using back_end.Models;
using back_end.Services;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<BackgroundImagesDatabaseSettings>(
    builder.Configuration.GetSection("BackgroundImagesDatabase"));

builder.Services.Configure<LiveRoomDatabaseSettings>(
    builder.Configuration.GetSection("LiveRoomDatabase"));

// Just keep adding services below
builder.Services.AddSingleton<BackgroundImagesServices>();
builder.Services.AddSingleton<VideosServices>();
builder.Services.AddSingleton<LiveRoomServices>();

builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v 0.2",
        Title = "KanbanWarriors APIs",
        Description = 
            "An ASP.NET Core Web Mircroservices backend done by Haiqel & Ashiqur." +
            " This UI exists during development only and for testing of APIs",
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // here all are the middleware
    // swagger will only show up in development mode
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        ////options.SwaggerEndpoint();
        //options.RoutePrefix = string.Empty;
    });
}

// Setting up CORS here
// reference -> https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0
app.UseCors(builder =>
{
    //Change the main front-end website here
    builder.WithOrigins("http://159.223.91.154:500").AllowAnyHeader();
    builder.WithOrigins("http://159.223.91.154:500").AllowAnyMethod();
    builder.WithOrigins("http://159.223.91.154:500").AllowAnyOrigin();

    //for our localhost
    builder.WithOrigins("http://localhost:3000").AllowAnyHeader();
    builder.WithOrigins("http://localhost:3000").AllowAnyMethod();
    builder.WithOrigins("http://localhost:3000").AllowAnyOrigin();
});


//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


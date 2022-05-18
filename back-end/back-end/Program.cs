using back_end.Models;
using back_end.Services;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<BackgroundImagesDatabaseSettings>(
    builder.Configuration.GetSection("BackgroundImagesDatabase"));
builder.Services.AddSingleton<BackgroundImagesServices>();
builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v0.1",
        Title = "KanbanWarriors APIs",
        Description = "An ASP.NET Core Web API done by Haiqel & Ashiqur",
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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


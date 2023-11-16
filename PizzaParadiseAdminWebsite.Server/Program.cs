using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using PizzaParadiseAdminWebsite.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AdminWebsiteDbContext>(options =>
  options.UseSqlServer(
    builder.Configuration.GetConnectionString("AdminWebsiteContext"),
    sqlServerOptions =>
        sqlServerOptions.CommandTimeout(120)
  ));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddMiniProfiler(options =>
{
    options.RouteBasePath = "/profiler";
    options.PopupRenderPosition = StackExchange.Profiling.RenderPosition.BottomRight;
    options.PopupStartHidden = true;
})
.AddEntityFramework();

var app = builder.Build();

app.UseMiniProfiler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

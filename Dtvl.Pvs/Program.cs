using Dtvl.Pvs;
using Rugal.PartialViewRender.Extentions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation();

builder.Services.AddPartialViews<DtvlPvs>(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("all", policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});
var app = builder.Build();

app.UseCors("all");

app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Overview}/{action=Router}/{id?}");

app.Run();

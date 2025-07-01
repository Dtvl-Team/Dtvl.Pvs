using Dtvl.Pvs;
using Dtvl.Pvs.Extension;
using Rugal.ImportMapper.Extensions;
using Rugal.PartialViewRender.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation();

builder.Services.AddDtvlPv();
builder.Services.AddImportMapper(builder.Configuration.GetSection("ImportMap"));

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("all", policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
//});
var app = builder.Build();

//app.UseCors("all");

app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Overview}/{action=Router}/{id?}");

app.Run();

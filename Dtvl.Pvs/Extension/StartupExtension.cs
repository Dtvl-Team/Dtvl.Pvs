using Microsoft.Extensions.DependencyInjection;
using Rugal.PartialViewRender.Extensions;

namespace Dtvl.Pvs.Extension;
public static class StartupExtension
{
    public static IServiceCollection AddDtvlPv(this IServiceCollection Services)
    {
        Services.AddPartialViews<DtvlPvs>("/PartialViews/Dtvl.Pvs/Views");
        return Services;
    }
}

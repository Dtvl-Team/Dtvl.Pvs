using Microsoft.AspNetCore.Mvc.Razor;
using Rugal.PartialViewRender.Models;

namespace Dtvl.Pvs;

public enum InputSlot
{
    InnerIcon,
    Label,
    ReadOnly,
    Clearable,
    IsSecure,

    SizeDefault,
    SizeComfortable,
    SizeCompact,
}

public static class InputExtention
{
    public static PvOption<DtvlPvs> UsingInputBase(this PvOption<DtvlPvs> Option)
    {
        Option
            .AddParentAttr("hide-details")
            .AddParentAttr(new
            {
                variant = "solo-filled",
                density = "compact",
                label = Option.GetSlotContent(InputSlot.Label),
            });

        Option.AddParentAttr("tabindex", "1", PropPassType.Fill);

        if (Option.HasSlot(InputSlot.ReadOnly))
            Option.AddParentAttr("v-bind:readonly", "true");
        if (!Option.HasSlot(InputSlot.ReadOnly) || Option.HasSlot(InputSlot.Clearable))
            Option.AddParentAttr("v-bind:clearable", "true");

        if (Option.HasSlot(InputSlot.IsSecure))
            Option.AddParentAttr("v-bind:type", "password");

        if (Option.TryGetSlotContent(InputSlot.InnerIcon, out var InnerIcon))
            Option.AddParentAttr("prepend-inner-icon", InnerIcon);

        if (Option.HasSlot(InputSlot.SizeDefault))
            Option.AddParentAttr("density", "default", PropPassType.Cover);
        else if (Option.HasSlot(InputSlot.SizeCompact))
            Option.AddParentAttr("density", "compact", PropPassType.Cover);
        else if (Option.HasSlot(InputSlot.SizeComfortable))
            Option.AddParentAttr("density", "comfortable", PropPassType.Cover);

        return Option;
    }
}

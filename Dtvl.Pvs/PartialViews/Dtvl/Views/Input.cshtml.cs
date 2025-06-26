using Microsoft.AspNetCore.Mvc.Razor;
using Rugal.PartialViewRender.Models;

namespace Dtvl.Pvs;

public enum InputSlot
{
    IconColor,

    InnerIcon,
    InnerEndIcon,
    //OuterIcon,
    //OuterEndIcon,

    Label,
    Placeholder,
    ReadOnly,
    Clearable,
    IsSecure,

    SizeDefault,
    SizeComfortable,
    SizeCompact,

    TextAlignStart,
    TextAlignCenter,
    TextAlignEnd,
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
            });

        Option.AddParentAttr("tabindex", "1", PropPassType.Fill);

        if (Option.TryGetSlotContent(InputSlot.Label, out var LabelContent))
            Option.AddParentAttr("v-bind:label", $"'{LabelContent}'");

        if (Option.HasSlot(InputSlot.ReadOnly))
            Option.AddParentAttr("v-bind:readonly", "true");
        if (!Option.HasSlot(InputSlot.ReadOnly) || Option.HasSlot(InputSlot.Clearable))
            Option.AddParentAttr("v-bind:clearable", "true");

        if (Option.HasSlot(InputSlot.IsSecure))
            Option.AddParentAttr("v-bind:type", "password");

        if (Option.TryGetSlotContent(InputSlot.InnerEndIcon, out var InnerEndIcon))
            Option.AddParentAttr("append-inner-icon", InnerEndIcon);

        //if (Option.TryGetSlotContent(InputSlot.OuterIcon, out var OuterIcon))
        //    Option.AddParentAttr("prepend-icon", OuterIcon);
        //if (Option.TryGetSlotContent(InputSlot.OuterEndIcon, out var OuterEndIcon))
        //    Option.AddParentAttr("append-icon", OuterEndIcon);

        var SizeSlots = new[] { InputSlot.SizeDefault, InputSlot.SizeCompact, InputSlot.SizeComfortable };
        var Density = Option.OrderFirstSlot(SizeSlots)?.ToSlotType<InputSlot>() switch
        {
            InputSlot.SizeDefault => "default",
            InputSlot.SizeComfortable => "comfortable",
            InputSlot.SizeCompact => "compact",
            _ => "compact"
        };
        Option.AddParentAttr("density", Density, PropPassType.Fill);

        var TextAlignSlots = new[] { InputSlot.TextAlignStart, InputSlot.TextAlignCenter, InputSlot.TextAlignEnd };
        var TextAlign = Option.OrderFirstSlot(TextAlignSlots)?.ToSlotType<InputSlot>() switch
        {
            InputSlot.TextAlignStart => "InputTextStart",
            InputSlot.TextAlignCenter => "InputTextCenter",
            InputSlot.TextAlignEnd => "InputTextEnd",
            _ => "InputTextStart"
        };
        Option.AddParentAttr("class", TextAlign, PropPassType.Append);

        return Option;
    }
    public static PvSlotsStore PassSlot_InputToIcon(this PvOption<DtvlPvs> Option)
    {
        var IconSlots = new PvSlotsStore();
        if (Option.TryGetSlot(InputSlot.IconColor, out var IconColorSlot))
            IconSlots.Add(IconSlot.Color, IconColorSlot);
        if (Option.TryGetSlot(InputSlot.InnerIcon, out var InnerIconSlot))
            IconSlots.Add(IconSlot.Icon, InnerIconSlot);

        return IconSlots;
    }
}

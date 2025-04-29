using Microsoft.AspNetCore.Razor.TagHelpers;
using Rugal.PartialViewRender.TagBase;

namespace Dtvl.Pvs;

[HtmlTargetElement("dtvl-pv")]
public class DtvlPvTag : PvTagBase<DtvlPvs>
{
    public DtvlPvTag(IServiceProvider Provider) : base(Provider)
    {
    }
}

public enum DtvlPvs
{
    #region Core
    Sidebar,
    Header,
    Bread,
    App,
    #endregion

    #region Card
    Card,
    FilterCard,
    #endregion

    #region Btn
    Btn,
    #endregion

    #region Table
    DataTable,
    #endregion

    #region Select
    Select,
    #endregion

    #region Checkbox
    Checkbox,
    #endregion

    #region Input
    Input,
    #endregion

    #region DatePicker
    DatePicker,
    #endregion

    #region Info
    InfoLine,
    #endregion

    #region Tree
    Tree,
    #endregion

    #region Modal
    Modal,
    SendModal,
    Alert,
    #endregion

    #region Container
    CollapseView,
    #endregion
}


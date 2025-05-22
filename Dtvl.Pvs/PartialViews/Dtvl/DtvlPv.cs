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
    SidebarGroup,
    SidebarChildren,
    Header,
    Bread,
    App,
    #endregion

    #region Container
    Card,
    FilterCard,
    Collapse,
    Collection,
    #endregion

    #region Tabbed
    Tabbed,
    Tab,
    TabContent,
    #endregion

    #region Btn
    Btn,
    #endregion

    #region Table
    DataTable,
    TableColumn,
    #endregion

    #region Items
    Select,
    List,
    #endregion

    #region Checkbox
    Checkbox,
    #endregion

    #region Input
    Input,
    Textarea,
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

    #region Image
    Image,
    #endregion

    #region Pop
    Menu,
    Modal,
    SendModal,
    Alert,
    #endregion
}


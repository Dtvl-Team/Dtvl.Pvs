namespace Dtvl.Pvs;

public enum ListSlot
{
    Datas,

    SizeDefault,
    SizeComfortable,
    SizeCompact,
}

public class PvListItem
{
    public string PvName { get; set; }
    public string Title { get; set; }
    public string Href { get; set; }
    public PvListItem(string PvName, string Title, string Href = null)
    {
        this.PvName = PvName;
        this.Title = Title;
        this.Href = Href;
    }
}
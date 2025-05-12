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
    public string Title { get; set; }
    public string Href { get; set; }
    public string PvName { get; set; }
    public PvListItem(string Title, string Href = null)
    {
        this.Title = Title;
        this.Href = Href;
    }
}
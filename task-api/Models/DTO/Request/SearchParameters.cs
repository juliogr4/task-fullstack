namespace task_api.Models.DTO.Request
{
    public class SearchParameters
    {
        public string? TaskStatus { get; set; }
        public string SortOrder { get; set; } = "ascending";
        public string? SearchText { get; set; }
        public int SelectedPage { get; set; } = 1;
    }
}
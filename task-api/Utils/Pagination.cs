using task_api.Models;

namespace task_api.Utils
{
    public class Pagination
    {
        public int PageSize { get; set; }
        public int SelectedPage { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage => TotalPages > SelectedPage;
        public bool HasPreviousPage => SelectedPage > 1;
        public int SkipRows { get; set; }
        public int MaxPageSize { get; set; }

        public Pagination(int pageSize, int selectedPage, int totalRecords, int maxPageSize)
        {
            MaxPageSize = maxPageSize;
            PageSize = (pageSize > MaxPageSize) ? MaxPageSize : pageSize;
            TotalRecords = totalRecords;
            SelectedPage = selectedPage;

            TotalPages = (int)Math.Ceiling((decimal)totalRecords / (decimal)PageSize);

            if (SelectedPage > TotalPages)
                SelectedPage = TotalPages;
            else if (SelectedPage <= 0)
                SelectedPage = 1;

            SkipRows = (SelectedPage - 1) * PageSize;
        }
    }
}

using task_api.Utils;

namespace task_api.Models.DTO.Response
{
    public class TaskResponse
    {
        public List<TaskItemResponse> TaskItems { get; set; }
        public Pagination Pagination { get; set; }
    }
}

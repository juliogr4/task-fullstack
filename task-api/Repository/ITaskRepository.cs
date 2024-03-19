using task_api.Models.DTO.Request;
using task_api.Models.Entity;
using task_api.Utils;

namespace task_api.Repository
{
    public interface ITaskRepository
    {
        Task<List<TaskItem>> GetTasks(SearchParameters searchParameters, Pagination pagination);
        Task<TaskItem> GetTask(int id);
        Task<int> GetTotalRecords(SearchParameters searchParameters);
        Task<int> UpdateTask(int id, string name);
        Task<int> DeleteTask(int id);
        Task<int> CreateTask(string name);
        Task<int> UpdateTaskStatus(int id);
    }
}

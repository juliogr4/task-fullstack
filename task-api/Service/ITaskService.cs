using task_api.Models;
using task_api.Models.DTO.Request;
using task_api.Models.DTO.Response;
using task_api.Models.Entity;
using task_api.Utils;

namespace task_api.Service
{
    public interface ITaskService
    {
        Task<TaskResponse> GetTasks(SearchParameters searchParameters);
        Task<TaskItemResponse> GetTask(int id);
        Task UpdateTask(int id, string name);
        Task DeleteTask(int id);
        Task CreateTask(string name);
        Task UpdateTaskStatus(int id);
    }
}

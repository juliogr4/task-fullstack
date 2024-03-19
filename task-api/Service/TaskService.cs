using task_api.Models.DTO.Request;
using task_api.Models.DTO.Response;
using task_api.Repository;
using task_api.Utils;

namespace task_api.Service
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskResponse> GetTasks(SearchParameters searchParameters)
        {
            int totalRecords = await _taskRepository.GetTotalRecords(searchParameters);
            if (totalRecords == 0) return new TaskResponse { };
            var pagination = new Pagination(5, searchParameters.SelectedPage, totalRecords, 5);
            var tasks = await _taskRepository.GetTasks(searchParameters, pagination);

            return new TaskResponse
            {
                Pagination = pagination,
                TaskItems = tasks.Select(task => new TaskItemResponse { Id = task.Id, Name = task.Name, Status = task.Status }).ToList(),
            };
        }

        public async Task<TaskItemResponse> GetTask(int id)
        {
            var task = await _taskRepository.GetTask(id);
            return new TaskItemResponse { Id = task.Id, Name = task.Name, Status = task.Status };
        }

        public async Task CreateTask(string name)
        {
            var rowsAffected = await _taskRepository.CreateTask(name);
            if(rowsAffected == 0)
                throw new Exception("Erro ao criar task");
        }

        public async Task UpdateTask(int id, string name)
        {
            var rowsAffected = await _taskRepository.UpdateTask(id, name);
            if (rowsAffected == 0)
                throw new Exception("Erro ao atualizar task");
        }

        public async Task UpdateTaskStatus(int id)
        {
            var rowsAffected = await _taskRepository.UpdateTaskStatus(id);
            if (rowsAffected == 0)
                throw new Exception("Erro ao atualizar o status da task");
        }

        public async Task DeleteTask(int id)
        {
            var rowsAffected = await _taskRepository.DeleteTask(id);
            if (rowsAffected == 0)
                throw new Exception("Erro ao deletar a task");
        }
    }
}

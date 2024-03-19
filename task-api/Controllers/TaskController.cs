using Microsoft.AspNetCore.Mvc;
using task_api.Models.DTO.Request;
using task_api.Service;

namespace task_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult> GetTasks([FromQuery] SearchParameters searchParameters)
        {
            var tasks = await _taskService.GetTasks(searchParameters);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTask(int id)
        {
            var task = await _taskService.GetTask(id);
            return Ok(task);
        }

        [HttpPut("status/{id}")]
        public async Task<ActionResult> UpdateTaskStatus(int id)
        {
            await _taskService.UpdateTaskStatus(id);
            return Ok(new { message = "Task status updated Successfully" });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, [FromBody] string name)
        {
            await _taskService.UpdateTask(id, name);
            return Ok(new { message = "Task updated Successfully" });
        }

        [HttpPost]
        public async Task<ActionResult> CreateTask([FromBody] string name)
        {
            await _taskService.CreateTask(name);
            return Ok(new { message = "Task created Successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            await _taskService.DeleteTask(id);
            return Ok(new { message = "Task deleted Successfully" });
        }
    }
}

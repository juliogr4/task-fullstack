using Dapper;
using task_api.Database;
using task_api.Models.DTO.Request;
using task_api.Models.Entity;
using task_api.Utils;

namespace task_api.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DapperContext _dapperContext;

        public TaskRepository(DapperContext dapperContext) => _dapperContext = dapperContext;

        public async Task<List<TaskItem>> GetTasks(SearchParameters searchParameters, Pagination pagination)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_get;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("skip_rows", pagination.SkipRows);
                parameters.Add("page_size", pagination.PageSize);
                parameters.Add("search_text", searchParameters.SearchText);
                parameters.Add("status", searchParameters.TaskStatus);
                parameters.Add("sort_order", searchParameters.SortOrder);

                // execute
                var tasks = await conn.QueryAsync<TaskItem>(procedure, parameters);
                return tasks.ToList();
            }
        }

        public async Task<TaskItem> GetTask(int id)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_get_by_id;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", id);

                // execute
                var task = await conn.QuerySingleAsync<TaskItem>(procedure, parameters);
                return task;
            }
        }

        public async Task<int> GetTotalRecords(SearchParameters searchParameters)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_get_total_records;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("search_text", searchParameters.SearchText);
                parameters.Add("status", searchParameters.TaskStatus);

                // execute
                return await conn.QueryFirstAsync<int>(procedure, parameters);
            }
        }

        public async Task<int> CreateTask(string name)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_create;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("name", name);

                // execute
                return await conn.ExecuteAsync(procedure, parameters);
            }
        }

        public async Task<int> UpdateTask(int id, string name)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_edit;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", id);
                parameters.Add("name", name);

                // execute
                return await conn.ExecuteAsync(procedure, parameters);
            }
        }

        public async Task<int> UpdateTaskStatus(int id)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_edit_status;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", id);

                // execute
                return await conn.ExecuteAsync(procedure, parameters);
            }
        }

        public async Task<int> DeleteTask(int id)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // query
                var procedure = Procedures.pr_task_delete;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", id);

                // execute
                return await conn.ExecuteAsync(procedure, parameters);
            }
        }
    }
}

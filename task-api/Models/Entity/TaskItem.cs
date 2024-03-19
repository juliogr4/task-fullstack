namespace task_api.Models.Entity
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime Created_At { get; set; }
    }
}

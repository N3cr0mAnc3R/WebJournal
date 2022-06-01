namespace ESchool.Models
{
    public class Teacher: Person
    {
        public int Id { get; set; }
        public Guid PersonId { get; set; }
    }
}

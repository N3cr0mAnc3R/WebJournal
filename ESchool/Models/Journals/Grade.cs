namespace ESchool.Models.Journals
{
    public class Grade
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SubName { get; set; }
        public IEnumerable<Pupil> Pupils { get; set; }
    }
}

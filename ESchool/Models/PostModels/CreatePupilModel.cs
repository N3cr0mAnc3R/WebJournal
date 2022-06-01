namespace ESchool.Models.PostModels
{
    public class CreatePupilModel
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public string FamilyName { get; set; }
        public string? Patronymic { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsMale { get; set; }
        public string? PassNumber { get; set; }
        public string? PassSeries { get; set; }
        public string? Snils { get; set; }
        public int GradeId { get; set; }
    }
}

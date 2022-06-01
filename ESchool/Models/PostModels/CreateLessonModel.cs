namespace ESchool.Models.PostModels
{
    public class CreateLessonModel
    {
        public int DisciplineId { get; set; }
        public int GradeId { get; set; }
        public int TeacherId { get; set; }
        public int NumberOfLessons { get; set; }
    }
}

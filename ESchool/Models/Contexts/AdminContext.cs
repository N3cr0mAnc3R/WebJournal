using Dapper;
using ESchool.Models.Abstract;
using ESchool.Models.Journals;
using ESchool.Models.PostModels;

namespace ESchool.Models.Contexts
{
    public class AdminContext : DataContext<AdminContext>
    {

        public async Task<IEnumerable<Teacher>> GetTeachers() =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryAsync<Teacher>("GetTeacherList", new { }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<IEnumerable<Discipline>> GetDisciplineList() =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryAsync<Discipline>("GetDisciplineList", new {  }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<int>CreateDiscipline(string Name) =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.ExecuteAsync("CreateDiscipline", new { Name }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<IEnumerable<Grade>> GetGradeList() =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryAsync<Grade>("GetGradeList", new { }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<IEnumerable<Lesson>> GetFilledLessons() =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryAsync<Lesson>("GetFilledLessons", new { }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<int>CreateGrade(string Name, string SubName) =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryFirstAsync<int>("CreateGrade", new { Name, SubName }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<int>CreateDisciplineLessons(int DisciplineId, int GradeId, int TeacherId, int NumberOfLessons) =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryFirstAsync<int>("CreateLessons", new { DisciplineId, GradeId, TeacherId, NumberOfLessons }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<int>CreatePupil(CreatePupilModel model) =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryFirstAsync<int>("EnrollPupil", new { model.Name, model.FamilyName, model.Patronymic, model.DateOfBirth, model.IsMale, model.PassSeries, model.PassNumber, model.Snils, model.GradeId }, commandType: System.Data.CommandType.StoredProcedure);
     });

    }
}

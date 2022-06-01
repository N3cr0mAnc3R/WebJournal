using ESchool.Models.Abstract;
using Dapper;
using ESchool.Models.Journals;

namespace ESchool.Models.Contexts
{
    public class TeacherContext: DataContext<TeacherContext>
    {

        public async Task<IEnumerable<Journal>> GetJournalList(string Id) =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryAsync<Journal>("GetMyDisciplineList", new { Id }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public async Task<IEnumerable<Pupil>> GetPupilsInClass(string userId, int Id) =>
     await Database.UseConnectionAsync(async (conn) =>
     {
         return await conn.QueryAsync<Pupil>("GetPupilsInClass", new { Id }, commandType: System.Data.CommandType.StoredProcedure);
     });
        public Person GetPersonInfo(string Id) =>
     Database.UseConnection((conn) =>
     {
         return conn.QueryFirst<Person>("GetUserInfo", new { Id }, commandType: System.Data.CommandType.StoredProcedure);
     });
    }
}

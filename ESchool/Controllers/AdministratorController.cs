using ESchool.Models;
using ESchool.Models.Abstract;
using ESchool.Models.Contexts;
using ESchool.Models.Journals;
using ESchool.Models.PostModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ESchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController: BaseApiController<AdminContext, AdministratorController>
    {

        public AdministratorController(DBService db, IHttpContextAccessor accessor)
                 : base(db, accessor)
        { }

        [HttpPost]
        [Route(nameof(GetTeachers))]
        public async Task<IEnumerable<Teacher>> GetTeachers()
        {
            var t1 = httpContextAccessor.HttpContext.User;
            var t = CurrentUser?.IsMale;
            return await Context.GetTeachers();
        }
        

        [HttpPost]
        [Route(nameof(GetDisciplineList))]
        [AllowAnonymous]
        public async Task<IEnumerable<Discipline>> GetDisciplineList()
        {
            return await Context.GetDisciplineList();
        }
        [HttpPost]
        [Route(nameof(GetFilledLessons))]
        [AllowAnonymous]
        public async Task<IEnumerable<Lesson>> GetFilledLessons()
        {
            return await Context.GetFilledLessons();
        }
        [HttpPost]
        [Route(nameof(GetGradeList))]
        public async Task<IEnumerable<Grade>> GetGradeList()
        {
            return await Context.GetGradeList();
        }
        [HttpPost]
        [Route(nameof(CreateDisciplineLessons))]
        public async Task<int> CreateDisciplineLessons(CreateLessonModel model)
        {
            return await Context.CreateDisciplineLessons(model.DisciplineId, model.GradeId, model.TeacherId, model.NumberOfLessons);
        }
        [HttpPost]
        [Route(nameof(CreatePupil))]
        public async Task<int> CreatePupil(CreatePupilModel model)
        {
            return await Context.CreatePupil(model);
        }


    }
}

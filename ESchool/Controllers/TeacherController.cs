using ESchool.Models;
using ESchool.Models.Abstract;
using ESchool.Models.Contexts;
using ESchool.Models.Journals;
using Microsoft.AspNetCore.Mvc;

namespace ESchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController: BaseApiController<TeacherContext, TeacherController>
    {

        public TeacherController(DBService db, IHttpContextAccessor accessor)
                 : base(db, accessor)
        { }

        //[HttpPost]
        //[Route(nameof(GetTeachers))]
        //public async Task<IEnumerable<Teacher>> GetTeachers()
        //{
        //    var t1 = httpContextAccessor.HttpContext.User;
        //    var t = CurrentUser?.IsMale;
        //    return await Context.GetTeachers();
        //}
        

        [HttpPost]
        [Route(nameof(GetJournals))]
        public async Task<IEnumerable<Journal>> GetJournals()
        {
            return await Context.GetJournalList(CurrentUser.Id);
        }
        [HttpPost]
        [Route(nameof(GetPupilsInClass))]
        public async Task<IEnumerable<Pupil>> GetPupilsInClass(int Id)
        {
            return await Context.GetPupilsInClass(CurrentUser.Id, Id);
        }


    }
}

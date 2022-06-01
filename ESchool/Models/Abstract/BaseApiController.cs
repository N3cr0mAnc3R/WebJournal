using ESchool.Models.Contexts;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ESchool.Models.Abstract
{
    [ApiController]
    public class BaseApiController<TContext, TController>: ControllerBase
         where TContext : DataContext<TContext>, new()
    {

        private TContext _context;
        protected readonly IDBService Database;
        protected IHttpContextAccessor httpContextAccessor;

        public BaseApiController(IDBService db, IHttpContextAccessor HttpContextAccessor)
        {
            Database = db;
            httpContextAccessor = HttpContextAccessor;
        }

        private Person _currentUser = null;
        protected Person CurrentUser
        {
            get
            {
                if (_currentUser == null)
                {
                    var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
                    if (userId != null)
                    {
                        _currentUser = TeacherContext.Exec(a => a.GetPersonInfo(userId.Value), Database);
                    }
                }

                return _currentUser;
            }
        }
        protected TContext Context
        {
            get
            {
                if (_context == null)
                    _context = new TContext
                    {
                        Database = Database
                    };

                return _context;
            }
        }
    }
}

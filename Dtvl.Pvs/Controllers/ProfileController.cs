using Microsoft.AspNetCore.Mvc;

namespace Dtvl.Pvs.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Detail()
        {
            return View();
        }
    }
}

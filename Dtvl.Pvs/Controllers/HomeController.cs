using Microsoft.AspNetCore.Mvc;

namespace Dtvl.Pvs.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

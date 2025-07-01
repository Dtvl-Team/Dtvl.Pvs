using Microsoft.AspNetCore.Mvc;

namespace Dtvl.Pvs.Controllers
{
    public class OverviewController : Controller
    {
        public IActionResult Router()
        {
            return View();
        }
        public IActionResult Pv()
        {
            return View();
        }
    }
}

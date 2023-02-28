using GSF.Web.Security;
using System;
using System.Threading;
using System.Web.Mvc;

namespace SystemCenter.Notifications.Controllers
{
    public class LoginController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            if (!Startup.OwinLoaded)
                throw new InvalidOperationException("Owin pipeline not loaded. Try running 'update-package Microsoft.Owin.Host.SystemWeb -reinstall' from NuGet Package Manager Console.");

            return View();
        }

        [Route("~/AuthTest")]
        [AuthorizeControllerRole]
        public ActionResult AuthTest()
        {
            return View();
        }

        [Route("~/Logout")]
        [AllowAnonymous]
        public ActionResult Logout()
        {
            return View();
        }

        [Route("~/UserInfo")]
        [AuthorizeControllerRole]
        public ActionResult UserInfo()
        {
            Thread.CurrentPrincipal = ViewBag.SecurityPrincipal = User;
            return View();
        }
    }
}
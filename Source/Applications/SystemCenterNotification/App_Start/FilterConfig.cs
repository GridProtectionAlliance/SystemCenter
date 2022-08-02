using System.Web;
using System.Web.Mvc;

namespace SystemCenter.Notifications
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

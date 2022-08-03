using GSF.Configuration;
using GSF.Web.Security;

namespace SystemCenter.Notifications
{
    public static class Common
    {
        private static string s_applicationName;
        private static string s_anonymousResourceExpression;
        private static string s_loginpage;
        private static string s_authtestpage;

        public static string ApplicationName => s_applicationName ?? (s_applicationName = GetApplicationName());

        public static string AnonymousResourceExpression => s_anonymousResourceExpression ?? (s_anonymousResourceExpression = GetAnonymousResourceExpression());

        public static string LoginPage => s_loginpage ?? (s_loginpage = GetLoginPage());
        public static string AuthTestPage => s_authtestpage ?? (s_authtestpage = GetAuthTestPage());
        private static string GetApplicationName() =>
            GetSettingValue("SecurityProvider", "ApplicationName", "GSF Authentication");

        private static string GetAnonymousResourceExpression() =>
            GetSettingValue("SystemSettings", "AnonymousResourceExpression", AuthenticationOptions.DefaultAnonymousResourceExpression);

        private static string GetLoginPage()  =>
            GetSettingValue("SystemSettings", "LoginPage", AuthenticationOptions.DefaultLoginPage);
        private static string GetAuthTestPage() =>
           GetSettingValue("SystemSettings", "AuthTestPage", AuthenticationOptions.DefaultAuthTestPage);

        private static string GetSettingValue(string section, string keyName, string defaultValue)
        {
            try
            {
                ConfigurationFile config = ConfigurationFile.Current;
                CategorizedSettingsElementCollection settings = config.Settings[section];
                return settings[keyName].ValueAs(defaultValue);
            }
            catch
            {
                return defaultValue;
            }
        }
    }
}
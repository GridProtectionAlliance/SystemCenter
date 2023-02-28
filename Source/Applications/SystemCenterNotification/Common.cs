using GSF.Configuration;
using GSF.Web.Security;
using GSF.Web.Shared;

namespace SystemCenter.Notifications
{
    public static class Common
    {
        private static string s_applicationName;
        private static string s_anonymousResourceExpression;
        private static string s_loginPage;
        private static string s_loginIcon;
        private static string s_authTestPage;

        public static string ApplicationName => s_applicationName ?? (s_applicationName = GetApplicationName());

        public static string AnonymousResourceExpression => s_anonymousResourceExpression ?? (s_anonymousResourceExpression = GetAnonymousResourceExpression());

        public static string LoginPage => s_loginPage ?? (s_loginPage = GetLoginPage());

        public static string LoginIcon = s_loginIcon ?? (s_loginIcon = GetLoginIcon());

        public static string AuthTestPage => s_authTestPage ?? (s_authTestPage = GetAuthTestPage());

        private static string GetApplicationName() =>
            GetSettingValue("SecurityProvider", "ApplicationName", "GSF Authentication");

        private static string GetAnonymousResourceExpression() =>
            GetSettingValue("SystemSettings", "AnonymousResourceExpression", AuthenticationOptions.DefaultAnonymousResourceExpression);

        private static string GetLoginPage() =>
            GetSettingValue("SystemSettings", "LoginPage", "/Login");

        private static string GetLoginIcon() =>
           GetSettingValue("SystemSettings", "LoginIcon", $"{Resources.Root}/Shared/Images/gpa-smalllock.png");

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
using System.Security.Claims;

namespace SP20.P05.Web.Features.Authentication
{
    internal static class Roles
    {
        public const string Admin = nameof(Admin);
        public const string Customer = nameof(Customer);
        public const string Manager = nameof(Manager);
        public const string Employee = nameof(Employee);
        public const string ManagerPlus = Admin + "," + Manager;
        public const string EmplyoyeePlus = Employee + "," + ManagerPlus;

        public static bool IsManagerPlus(ClaimsPrincipal user)
        {
            return HasAnyRole(user, ManagerPlus);
        }

        private static bool HasAnyRole(ClaimsPrincipal user, string target)
        {
            foreach (var role in target.Split(","))
            {
                if (user.IsInRole(role))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
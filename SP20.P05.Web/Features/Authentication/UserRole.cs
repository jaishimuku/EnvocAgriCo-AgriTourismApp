using Microsoft.AspNetCore.Identity;

namespace SP20.P05.Web.Features.Authentication
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
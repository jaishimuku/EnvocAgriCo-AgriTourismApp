using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using SP20.P05.Web.Features.Cart_and_transactions;


namespace SP20.P05.Web.Features.Authentication
{
    public class User : IdentityUser<int>
    {
        public Cart Cart { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
    }
}

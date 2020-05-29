using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SP20.P05.Web.Features.Authentication;
using SP20.P05.Web.Features.Cart_and_transactions;
using SP20.P05.Web.Features.FarmFields;
using SP20.P05.Web.Features.FarmFieldTickets;

namespace SP20.P05.Web.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {
        }

        public DbSet<FarmField> FarmFields { get; set; }
        public DbSet<FarmFieldTicket> FarmFieldTickets { get; set; }

        public DbSet<Cart> Cart { get; set; }
        public DbSet<Transaction> Transactions{ get; set; }
        public DbSet<Item> Items { get; set; }

        public DbSet<Size> Size { get; set; }

        public DbSet<UnitPrice> UnitPrices { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var userRoleBuilder = builder.Entity<UserRole>();

            userRoleBuilder.HasKey(x => new { x.UserId, x.RoleId });

            userRoleBuilder.HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId);

            userRoleBuilder.HasOne(x => x.User)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.UserId);
        }
    }
}
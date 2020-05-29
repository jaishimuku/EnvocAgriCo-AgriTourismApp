using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SP20.P05.Web.Controllers;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Authentication;
using SP20.P05.Web.Features.Cart_and_transactions;
using SP20.P05.Web.Features.FarmFields;
using SP20.P05.Web.Features.Shared;

namespace SP20.P05.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddTransient<FarmFieldTicketsController>();
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DataContext")));

            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<DataContext>();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 3;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 403;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });



            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Farm API", Version = "v1" });
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            MigrateDb(app);
            SeedData(app);
            SeedUnitPrice(app);
            // This isn't ideal, but the proper way is significantly more complex and really obscures what is happening
            AddRoles(app).GetAwaiter().GetResult();
            AddUsers(app).GetAwaiter().GetResult();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            
   

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
    }

        private static async Task AddRoles(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<Role>>();
                if (roleManager.Roles.Any())
                {
                    return;
                }

                await roleManager.CreateAsync(new Role {Name = Roles.Admin});
                await roleManager.CreateAsync(new Role {Name = Roles.Customer});
                await roleManager.CreateAsync(new Role {Name = Roles.Manager});
                await roleManager.CreateAsync(new Role {Name = Roles.Employee});
            }
        }

        private static async Task AddUsers(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
                if (userManager.Users.Any())
                {
                    return;
                }

                await CreateUser(userManager, "admin", Roles.Admin);
                await CreateUser(userManager, "manager", Roles.Manager);
                await CreateUser(userManager, "employee", Roles.Employee);

            }
        }

        private static async Task CreateUser(UserManager<User> userManager, string username, string role)
        {
            const string passwordForEveryone = "pass";
            var user = new User {UserName = username };
            await userManager.CreateAsync(user, passwordForEveryone);
            await userManager.AddToRoleAsync(user, role);
        }

       
        private static void SeedData(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DataContext>();
                if (context.Set<FarmField>().Any())
                {
                    return;
                }

                context.Set<FarmField>().Add(new FarmField { Name = "Strawberries", Active = true, Description = "Fresh and Red Never out of stock", Src = "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/strawberries-1296x728-feature.jpg?w=1155&h=1528", Dimensions = new Dimensions { Width = 10, Height = 5 } });
                context.Set<FarmField>().Add(new FarmField { Name = "Oranges", Active = true, Description = "Fresh, Never out of stock", Src = "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg?w=1155&h=1444", Dimensions = new Dimensions { Width = 10, Height = 5 } });
                context.Set<FarmField>().Add(new FarmField { Name = "Apples", Active = true, Description = "Gala Apples, Green Apples", Src = "https://ichef.bbci.co.uk/wwfeatures/live/976_549/images/live/p0/7v/2w/p07v2wjn.jpg", Dimensions = new Dimensions { Width = 10, Height = 5 } });
                context.Set<FarmField>().Add(new FarmField { Name = "Grapes", Active = true, Description = "Green, Red", Src = "https://media.npr.org/assets/img/2013/03/06/f-88c8aa015f1e0c3da52479fae49a77adefdba3a2-s800-c85.jpg", Dimensions = new Dimensions { Width = 10, Height = 5 } });
                context.Set<FarmField>().Add(new FarmField { Name = "BlueBerries", Active = true, Description = "Blue, Fresh", Src = "https://extension.unh.edu/sites/default/files/styles/2x_blog_main/public/field/image/blueberries-690072_1920.jpg?itok=8pBVh_eZ&timestamp=1500318544", Dimensions = new Dimensions { Width = 10, Height = 5 } });
                context.Set<FarmField>().Add(new FarmField { Name = "Cherries", Active = true, Description = "Red, Juicy", Src = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/05/30/15/cherries.jpg?w968h681", Dimensions = new Dimensions { Width = 10, Height = 5 } });
                context.SaveChanges();
            }
        }

        private static void SeedUnitPrice(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DataContext>();
                if (context.Set<UnitPrice>().Any())
                {
                    return;
                }

                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 1, sizeId = 1, rate = 15 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 1, sizeId = 2, rate = 25 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 1, sizeId = 3, rate = 30 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 2, sizeId = 1, rate = 20 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 2, sizeId = 2, rate = 25 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 2, sizeId = 3, rate = 30 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 3, sizeId = 1, rate = 10 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 3, sizeId = 2, rate = 15 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 3, sizeId = 3, rate = 20 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 4, sizeId = 1, rate = 17 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 4, sizeId = 2, rate = 24 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 4, sizeId = 3, rate = 28 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 5, sizeId = 1, rate = 8 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 5, sizeId = 2, rate = 12 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 5, sizeId = 3, rate = 18 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 6, sizeId = 1, rate = 5 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 6, sizeId = 2, rate = 10 });
                context.Set<UnitPrice>().Add(new UnitPrice { farmFieldId = 6, sizeId = 3, rate = 15 });
                context.SaveChanges();
            }
        }


        private static void MigrateDb(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DataContext>();
                context.Database.Migrate();
            }
        }
    }
}

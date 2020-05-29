using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration.Memory;
using SP20.P05.Web;

namespace SP20.P05.Tests.Helpers
{
    public class ServerHelper
    {
        public static CustomWebApplicationFactory<Startup> GetTestWeb()
        {
            return new CustomWebApplicationFactory<Startup>();
        }
    }

    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder x)
        {
            x.ConfigureAppConfiguration(y =>
            {
                var connection = DatabaseHelper.GetConnection();
                y.Add(new MemoryConfigurationSource
                {
                    InitialData = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("ConnectionStrings:DataContext", connection),
                        new KeyValuePair<string, string>("Logging:LogLevel:Microsoft", "Error"),
                        new KeyValuePair<string, string>("Logging:LogLevel:Microsoft.Hosting.Lifetime", "Error"),
                        new KeyValuePair<string, string>("Logging:LogLevel:Default", "Error")
                    }
                });
            });
            base.ConfigureWebHost(x);
        }
    }
}

using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SP20.P05.Tests.Extensions;
using SP20.P05.Tests.Helpers;

namespace SP20.P05.Tests
{
    [TestClass]
    public class ExampleUnitTest
    {
        [TestMethod]
        public async Task EnsureOnlyDtosAreUsedInApi()
        {
            using (var webServer = ServerHelper.GetTestWeb())
            {
                var webClient = webServer.CreateClient();
                var httpResponse = await webClient.GetAsync("/swagger/v1/swagger.json");
                var apiSpec = await httpResponse.Content.ReadAsJsonAsync<OpenApiSpec>();

                var violations = apiSpec.Components.Schemas.Where(x => !x.Key.EndsWith("Dto")).Select(x => x.Key)
                    .ToList();
                Assert.IsTrue(violations.Count == 0,
                    $"You have entities being sent in your API:\r\n{string.Join("\r\n", violations)}");
            }
        }
    }
}

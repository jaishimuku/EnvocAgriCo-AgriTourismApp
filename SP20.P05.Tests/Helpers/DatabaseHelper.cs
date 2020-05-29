using System;
using System.Runtime.InteropServices;
using Microsoft.Data.SqlClient;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SP20.P05.Tests.Helpers
{
    [TestClass]
    public class DatabaseHelper
    {
        public const string DbPrefix = "SP20-P05";
        public static string DatabaseName;

        [AssemblyInitialize]
        public static void Init(TestContext context)
        {
            DeleteDatabase();
        }

        [AssemblyCleanup]
        public static void Cleanup()
        {
            DeleteDatabase();
        }
        
        private static string GetName()
        {
            if (DatabaseName == null)
            {
                DatabaseName = Guid.NewGuid().ToString("N");
            }
            return $"{DbPrefix}{DatabaseName}";
        }

        private static void DeleteDatabase()
        {
            using (var test = new SqlConnection(GetMasterDbConnectionString()))
            {
                test.Open();
                var singleUserCommand = new SqlCommand(
                    $"IF EXISTS(select * from sys.databases where name='{GetName()}')" +
                    $"ALTER DATABASE  [{GetName()}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE", test);
                singleUserCommand.ExecuteNonQuery();

                var dropCommand = new SqlCommand($"DROP DATABASE IF EXISTS [{GetName()}]", test);
                dropCommand.ExecuteNonQuery();
            }
        }

        private static string GetMasterDbConnectionString()
        {
            return GetConnection().Replace($"{DbPrefix}{DatabaseName}", "master");
        }

        public static string GetConnection()
        {
            string connection;
            if (!RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                connection = $"Server=localhost,1433;Database={GetName()};User Id=sa;Password=Password123!;";
            }
            else
            {
                connection = $"Server=(localdb)\\mssqllocaldb;Database={GetName()};Trusted_Connection=True";
            }
            return connection;
        }
    }
}

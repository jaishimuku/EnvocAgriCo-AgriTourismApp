using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class populatingsizes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Size(BucketSizeNames) VALUES('Small')");
            migrationBuilder.Sql("INSERT INTO Size(BucketSizeNames) VALUES('Medium')");
            migrationBuilder.Sql("INSERT INTO Size(BucketSizeNames) VALUES('Large')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

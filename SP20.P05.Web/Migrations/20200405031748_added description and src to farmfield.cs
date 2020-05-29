using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class addeddescriptionandsrctofarmfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FarmFields",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Src",
                table: "FarmFields",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "FarmFields");

            migrationBuilder.DropColumn(
                name: "Src",
                table: "FarmFields");
        }
    }
}

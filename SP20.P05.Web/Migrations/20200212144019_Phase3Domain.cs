using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class Phase3Domain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FarmFields",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    Dimensions_Width = table.Column<int>(nullable: true),
                    Dimensions_Height = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmFields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FarmFieldTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Redeemed = table.Column<DateTimeOffset>(nullable: true),
                    TicketTimeSlot = table.Column<DateTimeOffset>(nullable: false),
                    FarmFieldId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmFieldTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FarmFieldTickets_FarmFields_FarmFieldId",
                        column: x => x.FarmFieldId,
                        principalTable: "FarmFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FarmFieldTickets_FarmFieldId",
                table: "FarmFieldTickets",
                column: "FarmFieldId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FarmFieldTickets");

            migrationBuilder.DropTable(
                name: "FarmFields");
        }
    }
}

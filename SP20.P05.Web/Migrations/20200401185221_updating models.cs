using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class updatingmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_FarmFieldTickets_FarmFieldTicketId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "TicketTimeSlot",
                table: "FarmFieldTickets");

            migrationBuilder.RenameColumn(
                name: "FarmFieldTicketId",
                table: "Items",
                newName: "farmFieldTicketId");

            migrationBuilder.RenameIndex(
                name: "IX_Items_FarmFieldTicketId",
                table: "Items",
                newName: "IX_Items_farmFieldTicketId");

            migrationBuilder.AlterColumn<int>(
                name: "farmFieldTicketId",
                table: "Items",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_FarmFieldTickets_farmFieldTicketId",
                table: "Items",
                column: "farmFieldTicketId",
                principalTable: "FarmFieldTickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_FarmFieldTickets_farmFieldTicketId",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "farmFieldTicketId",
                table: "Items",
                newName: "FarmFieldTicketId");

            migrationBuilder.RenameIndex(
                name: "IX_Items_farmFieldTicketId",
                table: "Items",
                newName: "IX_Items_FarmFieldTicketId");

            migrationBuilder.AlterColumn<int>(
                name: "FarmFieldTicketId",
                table: "Items",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "TicketTimeSlot",
                table: "FarmFieldTickets",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_Items_FarmFieldTickets_FarmFieldTicketId",
                table: "Items",
                column: "FarmFieldTicketId",
                principalTable: "FarmFieldTickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

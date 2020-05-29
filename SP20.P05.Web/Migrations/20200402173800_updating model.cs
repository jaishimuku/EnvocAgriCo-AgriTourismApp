using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class updatingmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Size_SizeId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_FarmFieldTickets_farmFieldTicketId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitPrices_FarmFields_farmFieldId",
                table: "UnitPrices");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitPrices_Size_sizeId",
                table: "UnitPrices");

            migrationBuilder.DropIndex(
                name: "IX_UnitPrices_farmFieldId",
                table: "UnitPrices");

            migrationBuilder.DropIndex(
                name: "IX_UnitPrices_sizeId",
                table: "UnitPrices");

            migrationBuilder.DropIndex(
                name: "IX_Items_SizeId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_farmFieldTicketId",
                table: "Items");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UnitPrices_farmFieldId",
                table: "UnitPrices",
                column: "farmFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitPrices_sizeId",
                table: "UnitPrices",
                column: "sizeId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_SizeId",
                table: "Items",
                column: "SizeId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_farmFieldTicketId",
                table: "Items",
                column: "farmFieldTicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Size_SizeId",
                table: "Items",
                column: "SizeId",
                principalTable: "Size",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_FarmFieldTickets_farmFieldTicketId",
                table: "Items",
                column: "farmFieldTicketId",
                principalTable: "FarmFieldTickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UnitPrices_FarmFields_farmFieldId",
                table: "UnitPrices",
                column: "farmFieldId",
                principalTable: "FarmFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UnitPrices_Size_sizeId",
                table: "UnitPrices",
                column: "sizeId",
                principalTable: "Size",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

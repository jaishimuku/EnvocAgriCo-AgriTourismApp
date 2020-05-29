using Microsoft.EntityFrameworkCore.Migrations;

namespace SP20.P05.Web.Migrations
{
    public partial class updatingtables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Size_BucketSizeId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_BucketSizeId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "BucketSizeId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "SizeId",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Items_SizeId",
                table: "Items",
                column: "SizeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Size_SizeId",
                table: "Items",
                column: "SizeId",
                principalTable: "Size",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Size_SizeId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_SizeId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "SizeId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "BucketSizeId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_BucketSizeId",
                table: "Items",
                column: "BucketSizeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Size_BucketSizeId",
                table: "Items",
                column: "BucketSizeId",
                principalTable: "Size",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

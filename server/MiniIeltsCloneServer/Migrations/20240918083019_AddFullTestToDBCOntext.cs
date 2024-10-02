using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddFullTestToDBCOntext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FullTest_AspNetUsers_AppUserId",
                table: "FullTest");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_FullTest_FullTestId",
                table: "Tests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FullTest",
                table: "FullTest");

            migrationBuilder.RenameTable(
                name: "FullTest",
                newName: "FullTests");

            migrationBuilder.RenameIndex(
                name: "IX_FullTest_AppUserId",
                table: "FullTests",
                newName: "IX_FullTests_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FullTests",
                table: "FullTests",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FullTests_AspNetUsers_AppUserId",
                table: "FullTests",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_FullTests_FullTestId",
                table: "Tests",
                column: "FullTestId",
                principalTable: "FullTests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FullTests_AspNetUsers_AppUserId",
                table: "FullTests");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_FullTests_FullTestId",
                table: "Tests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FullTests",
                table: "FullTests");

            migrationBuilder.RenameTable(
                name: "FullTests",
                newName: "FullTest");

            migrationBuilder.RenameIndex(
                name: "IX_FullTests_AppUserId",
                table: "FullTest",
                newName: "IX_FullTest_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FullTest",
                table: "FullTest",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FullTest_AspNetUsers_AppUserId",
                table: "FullTest",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_FullTest_FullTestId",
                table: "Tests",
                column: "FullTestId",
                principalTable: "FullTest",
                principalColumn: "Id");
        }
    }
}

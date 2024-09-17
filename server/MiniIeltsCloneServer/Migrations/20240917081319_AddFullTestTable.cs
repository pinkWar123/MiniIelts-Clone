using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddFullTestTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FullTestId",
                table: "Tests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FullTest",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FullTest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FullTest_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tests_FullTestId",
                table: "Tests",
                column: "FullTestId");

            migrationBuilder.CreateIndex(
                name: "IX_FullTest_AppUserId",
                table: "FullTest",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_FullTest_FullTestId",
                table: "Tests",
                column: "FullTestId",
                principalTable: "FullTest",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tests_FullTest_FullTestId",
                table: "Tests");

            migrationBuilder.DropTable(
                name: "FullTest");

            migrationBuilder.DropIndex(
                name: "IX_Tests_FullTestId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "FullTestId",
                table: "Tests");
        }
    }
}

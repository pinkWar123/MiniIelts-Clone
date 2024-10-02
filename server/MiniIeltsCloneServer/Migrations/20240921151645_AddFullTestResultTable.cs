using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddFullTestResultTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FullTestResultId",
                table: "Results",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FullTestResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullTestId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Marks = table.Column<double>(type: "float", nullable: false),
                    Correct = table.Column<int>(type: "int", nullable: false),
                    QuestionCount = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FullTestResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FullTestResults_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FullTestResults_FullTests_FullTestId",
                        column: x => x.FullTestId,
                        principalTable: "FullTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Results_FullTestResultId",
                table: "Results",
                column: "FullTestResultId");

            migrationBuilder.CreateIndex(
                name: "IX_FullTestResults_AppUserId",
                table: "FullTestResults",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FullTestResults_FullTestId",
                table: "FullTestResults",
                column: "FullTestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_FullTestResults_FullTestResultId",
                table: "Results",
                column: "FullTestResultId",
                principalTable: "FullTestResults",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_FullTestResults_FullTestResultId",
                table: "Results");

            migrationBuilder.DropTable(
                name: "FullTestResults");

            migrationBuilder.DropIndex(
                name: "IX_Results_FullTestResultId",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "FullTestResultId",
                table: "Results");
        }
    }
}

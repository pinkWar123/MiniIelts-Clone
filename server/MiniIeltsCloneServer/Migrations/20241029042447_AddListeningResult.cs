using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddListeningResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Transcript",
                table: "ListeningParts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ListeningResultId",
                table: "Answers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ListeningResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListeningTestId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    Time = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListeningResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListeningResults_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ListeningResults_ListeningTests_ListeningTestId",
                        column: x => x.ListeningTestId,
                        principalTable: "ListeningTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ListeningResultId",
                table: "Answers",
                column: "ListeningResultId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningResults_AppUserId",
                table: "ListeningResults",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningResults_ListeningTestId",
                table: "ListeningResults",
                column: "ListeningTestId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_ListeningResults_ListeningResultId",
                table: "Answers",
                column: "ListeningResultId",
                principalTable: "ListeningResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_ListeningResults_ListeningResultId",
                table: "Answers");

            migrationBuilder.DropTable(
                name: "ListeningResults");

            migrationBuilder.DropIndex(
                name: "IX_Answers_ListeningResultId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "ListeningResultId",
                table: "Answers");

            migrationBuilder.AlterColumn<string>(
                name: "Transcript",
                table: "ListeningParts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddListeningTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListeningExerciseId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ListeningExerciseId",
                table: "ExerciseChoices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ListeningTests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListeningTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListeningTests_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ListeningParts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListeningTestId = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListeningParts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListeningParts_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ListeningParts_ListeningTests_ListeningTestId",
                        column: x => x.ListeningTestId,
                        principalTable: "ListeningTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListeningExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListeningPartId = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    ExerciseType = table.Column<int>(type: "int", nullable: false),
                    QuestionCount = table.Column<int>(type: "int", nullable: false),
                    StartQuestion = table.Column<int>(type: "int", nullable: false),
                    EndQuestion = table.Column<int>(type: "int", nullable: false),
                    ChoiceCount = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListeningExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListeningExercises_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ListeningExercises_ListeningParts_ListeningPartId",
                        column: x => x.ListeningPartId,
                        principalTable: "ListeningParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ListeningExerciseId",
                table: "Questions",
                column: "ListeningExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseChoices_ListeningExerciseId",
                table: "ExerciseChoices",
                column: "ListeningExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningExercises_AppUserId",
                table: "ListeningExercises",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningExercises_ListeningPartId",
                table: "ListeningExercises",
                column: "ListeningPartId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningParts_AppUserId",
                table: "ListeningParts",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningParts_ListeningTestId",
                table: "ListeningParts",
                column: "ListeningTestId");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningTests_AppUserId",
                table: "ListeningTests",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseChoices_ListeningExercises_ListeningExerciseId",
                table: "ExerciseChoices",
                column: "ListeningExerciseId",
                principalTable: "ListeningExercises",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_ListeningExercises_ListeningExerciseId",
                table: "Questions",
                column: "ListeningExerciseId",
                principalTable: "ListeningExercises",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseChoices_ListeningExercises_ListeningExerciseId",
                table: "ExerciseChoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_ListeningExercises_ListeningExerciseId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "ListeningExercises");

            migrationBuilder.DropTable(
                name: "ListeningParts");

            migrationBuilder.DropTable(
                name: "ListeningTests");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ListeningExerciseId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseChoices_ListeningExerciseId",
                table: "ExerciseChoices");

            migrationBuilder.DropColumn(
                name: "ListeningExerciseId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ListeningExerciseId",
                table: "ExerciseChoices");
        }
    }
}

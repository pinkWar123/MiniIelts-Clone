using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseChoices_Excercises_ExcerciseId",
                table: "ExerciseChoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Excercises_ExcerciseId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ExcerciseId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseChoices_ExcerciseId",
                table: "ExerciseChoices");

            migrationBuilder.DropColumn(
                name: "ExcerciseId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ExcerciseId",
                table: "ExerciseChoices");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ExerciseId",
                table: "Questions",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseChoices_ExerciseId",
                table: "ExerciseChoices",
                column: "ExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseChoices_Excercises_ExerciseId",
                table: "ExerciseChoices",
                column: "ExerciseId",
                principalTable: "Excercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Excercises_ExerciseId",
                table: "Questions",
                column: "ExerciseId",
                principalTable: "Excercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseChoices_Excercises_ExerciseId",
                table: "ExerciseChoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Excercises_ExerciseId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ExerciseId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseChoices_ExerciseId",
                table: "ExerciseChoices");

            migrationBuilder.AddColumn<int>(
                name: "ExcerciseId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExcerciseId",
                table: "ExerciseChoices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ExcerciseId",
                table: "Questions",
                column: "ExcerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseChoices_ExcerciseId",
                table: "ExerciseChoices",
                column: "ExcerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseChoices_Excercises_ExcerciseId",
                table: "ExerciseChoices",
                column: "ExcerciseId",
                principalTable: "Excercises",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Excercises_ExcerciseId",
                table: "Questions",
                column: "ExcerciseId",
                principalTable: "Excercises",
                principalColumn: "Id");
        }
    }
}

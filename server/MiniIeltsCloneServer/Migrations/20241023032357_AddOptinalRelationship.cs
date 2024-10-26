using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddOptinalRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseChoices_Excercises_ExerciseId",
                table: "ExerciseChoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Excercises_ExerciseId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "Questions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "ExerciseChoices",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseChoices_Excercises_ExerciseId",
                table: "ExerciseChoices",
                column: "ExerciseId",
                principalTable: "Excercises",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Excercises_ExerciseId",
                table: "Questions",
                column: "ExerciseId",
                principalTable: "Excercises",
                principalColumn: "Id");
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

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "ExerciseChoices",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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
    }
}

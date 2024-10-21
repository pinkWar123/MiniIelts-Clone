using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class SimplifyExplanation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Detail",
                table: "Explanations");

            migrationBuilder.DropColumn(
                name: "KeywordsInQuestion",
                table: "Explanations");

            migrationBuilder.RenameColumn(
                name: "SimilarWordsInPassage",
                table: "Explanations",
                newName: "Content");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Explanations",
                newName: "SimilarWordsInPassage");

            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "Explanations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "KeywordsInQuestion",
                table: "Explanations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

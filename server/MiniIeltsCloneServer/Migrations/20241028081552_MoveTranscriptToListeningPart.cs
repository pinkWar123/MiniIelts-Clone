using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class MoveTranscriptToListeningPart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Transcript",
                table: "ListeningTests");

            migrationBuilder.AddColumn<string>(
                name: "Transcript",
                table: "ListeningParts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Transcript",
                table: "ListeningParts");

            migrationBuilder.AddColumn<string>(
                name: "Transcript",
                table: "ListeningTests",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

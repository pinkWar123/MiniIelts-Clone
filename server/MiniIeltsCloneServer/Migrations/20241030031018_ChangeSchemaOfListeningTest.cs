using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class ChangeSchemaOfListeningTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ListeningResults_ListeningTestId",
                table: "ListeningResults");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningResults_ListeningTestId",
                table: "ListeningResults",
                column: "ListeningTestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ListeningResults_ListeningTestId",
                table: "ListeningResults");

            migrationBuilder.CreateIndex(
                name: "IX_ListeningResults_ListeningTestId",
                table: "ListeningResults",
                column: "ListeningTestId",
                unique: true);
        }
    }
}

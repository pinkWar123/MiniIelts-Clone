using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddSeriesFullTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FullTests_Series_SeriesId",
                table: "FullTests");

            migrationBuilder.DropIndex(
                name: "IX_FullTests_SeriesId",
                table: "FullTests");

            migrationBuilder.CreateTable(
                name: "SeriesFullTests",
                columns: table => new
                {
                    FullTestId = table.Column<int>(type: "int", nullable: false),
                    SeriesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeriesFullTests", x => new { x.SeriesId, x.FullTestId });
                    table.ForeignKey(
                        name: "FK_SeriesFullTests_FullTests_FullTestId",
                        column: x => x.FullTestId,
                        principalTable: "FullTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SeriesFullTests_Series_SeriesId",
                        column: x => x.SeriesId,
                        principalTable: "Series",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SeriesFullTests_FullTestId",
                table: "SeriesFullTests",
                column: "FullTestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SeriesFullTests");

            migrationBuilder.CreateIndex(
                name: "IX_FullTests_SeriesId",
                table: "FullTests",
                column: "SeriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FullTests_Series_SeriesId",
                table: "FullTests",
                column: "SeriesId",
                principalTable: "Series",
                principalColumn: "Id");
        }
    }
}

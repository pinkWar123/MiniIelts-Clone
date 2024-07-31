using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MiniIeltsCloneServer.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6729521c-5da9-4dfa-965a-8560191a6102", null, "User", "USER" },
                    { "bd9373c5-f145-416e-a00e-b84fdfc5978d", null, "SuperAdmin", "SUPERADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "3c0d6fc1-f648-47b7-a5cb-85534616f04d", 0, "15e2d5ed-b592-40ed-8699-2432fb78aa7f", "nquan003@gmail.com", true, false, null, "NQUAN003@GMAIL.COM", "SUPER_ADMIN", "AQAAAAIAAYagAAAAEPj/cPWJjyxorcJrfjNAPVUBF0seSwCMSOnMv7yMk7s/sd02ttMN4C39JDMP/QWlCg==", null, false, "f0bb63eb-e11d-4578-ac66-11627ea7f7ac", false, "super_admin" },
                    { "5e79f877-05b9-48c4-a82c-f38a2b2af58d", 0, "1914dff2-59a8-4b11-b10c-21a3ac7ba5ea", "mm@mm.com", true, false, null, "MM@MM.COM", "BASIC_USER", "AQAAAAIAAYagAAAAEBx3ch4dfuk6yV96EhhdYYAdbSGoUoUzpGMEGngJSLgOyGIImjXHpfDvArY1VpVunw==", null, false, "19768c96-7a8a-4654-9ef4-5b4d140be3d5", false, "basic_user" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "bd9373c5-f145-416e-a00e-b84fdfc5978d", "3c0d6fc1-f648-47b7-a5cb-85534616f04d" },
                    { "6729521c-5da9-4dfa-965a-8560191a6102", "5e79f877-05b9-48c4-a82c-f38a2b2af58d" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "bd9373c5-f145-416e-a00e-b84fdfc5978d", "3c0d6fc1-f648-47b7-a5cb-85534616f04d" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "6729521c-5da9-4dfa-965a-8560191a6102", "5e79f877-05b9-48c4-a82c-f38a2b2af58d" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6729521c-5da9-4dfa-965a-8560191a6102");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd9373c5-f145-416e-a00e-b84fdfc5978d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3c0d6fc1-f648-47b7-a5cb-85534616f04d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5e79f877-05b9-48c4-a82c-f38a2b2af58d");
        }
    }
}

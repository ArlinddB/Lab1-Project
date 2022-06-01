using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantManagementSystem.Migrations
{
    public partial class EmployeesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    e_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    e_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    e_username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    e_password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    e_phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    e_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfJoining = table.Column<DateTime>(type: "Date", nullable: false),
                    e_roleID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.e_id);
                    table.ForeignKey(
                        name: "FK_Employees_Roles_e_roleID",
                        column: x => x.e_roleID,
                        principalTable: "Roles",
                        principalColumn: "r_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_e_roleID",
                table: "Employees",
                column: "e_roleID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}

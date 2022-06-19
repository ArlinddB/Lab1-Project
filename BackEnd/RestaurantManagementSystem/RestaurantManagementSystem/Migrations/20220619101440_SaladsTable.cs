using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantManagementSystem.Migrations
{
    public partial class SaladsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Salads",
                columns: table => new
                {
                    SaladId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SaladName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SaladPrice = table.Column<float>(type: "real", nullable: false),
                    SaladDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salads", x => x.SaladId);
                    table.ForeignKey(
                        name: "FK_Salads_FoodCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "FoodCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Salads_categoryId",
                table: "Salads",
                column: "categoryId");       
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {           
            migrationBuilder.DropTable(
                name: "Salads");          
        }
    }
}

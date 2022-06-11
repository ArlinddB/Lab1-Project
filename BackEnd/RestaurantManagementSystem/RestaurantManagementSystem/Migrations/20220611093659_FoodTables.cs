using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantManagementSystem.Migrations
{
    public partial class FoodTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FoodCategories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodCategories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "FastFoods",
                columns: table => new
                {
                    FoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FoodPrice = table.Column<float>(type: "real", nullable: false),
                    FoodDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FastFoods", x => x.FoodId);
                    table.ForeignKey(
                        name: "FK_FastFoods_FoodCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "FoodCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pastas",
                columns: table => new
                {
                    FoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FoodPrice = table.Column<float>(type: "real", nullable: false),
                    FoodDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pastas", x => x.FoodId);
                    table.ForeignKey(
                        name: "FK_Pastas_FoodCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "FoodCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SeaFoods",
                columns: table => new
                {
                    FoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FoodPrice = table.Column<float>(type: "real", nullable: false),
                    FoodDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeaFoods", x => x.FoodId);
                    table.ForeignKey(
                        name: "FK_SeaFoods_FoodCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "FoodCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TraditionalFoods",
                columns: table => new
                {
                    FoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FoodPrice = table.Column<float>(type: "real", nullable: false),
                    FoodDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TraditionalFoods", x => x.FoodId);
                    table.ForeignKey(
                        name: "FK_TraditionalFoods_FoodCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "FoodCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FastFoods_categoryId",
                table: "FastFoods",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Pastas_categoryId",
                table: "Pastas",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SeaFoods_categoryId",
                table: "SeaFoods",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TraditionalFoods_categoryId",
                table: "TraditionalFoods",
                column: "categoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FastFoods");

            migrationBuilder.DropTable(
                name: "Pastas");

            migrationBuilder.DropTable(
                name: "SeaFoods");

            migrationBuilder.DropTable(
                name: "TraditionalFoods");

            migrationBuilder.DropTable(
                name: "FoodCategories");
        }
    }
}

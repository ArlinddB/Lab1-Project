using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantManagementSystem.Migrations
{
    public partial class DrinkTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DrinksCategories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrinksCategories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "AlcoholicDrinks",
                columns: table => new
                {
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DrinkPrice = table.Column<float>(type: "real", nullable: false),
                    DrinkDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlcoholicDrinks", x => x.DrinkId);
                    table.ForeignKey(
                        name: "FK_AlcoholicDrinks_DrinksCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "DrinksCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ColdDrinks",
                columns: table => new
                {
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DrinkPrice = table.Column<float>(type: "real", nullable: false),
                    DrinkDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColdDrinks", x => x.DrinkId);
                    table.ForeignKey(
                        name: "FK_ColdDrinks_DrinksCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "DrinksCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HotDrinks",
                columns: table => new
                {
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DrinkPrice = table.Column<float>(type: "real", nullable: false),
                    DrinkDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotDrinks", x => x.DrinkId);
                    table.ForeignKey(
                        name: "FK_HotDrinks_DrinksCategories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "DrinksCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NonAlcoholicDrinks",
                columns: table => new
                {
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DrinkPrice = table.Column<float>(type: "real", nullable: false),
                    DrinkDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NonAlcoholicDrinks", x => x.DrinkId);
                    table.ForeignKey(
                        name: "FK_NonAlcoholicDrinks_DrinksCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "DrinksCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlcoholicDrinks_categoryId",
                table: "AlcoholicDrinks",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ColdDrinks_categoryId",
                table: "ColdDrinks",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_HotDrinks_categoryId",
                table: "HotDrinks",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_NonAlcoholicDrinks_CategoryId",
                table: "NonAlcoholicDrinks",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlcoholicDrinks");

            migrationBuilder.DropTable(
                name: "ColdDrinks");

            migrationBuilder.DropTable(
                name: "HotDrinks");

            migrationBuilder.DropTable(
                name: "NonAlcoholicDrinks");

            migrationBuilder.DropTable(
                name: "DrinksCategories");
        }
    }
}

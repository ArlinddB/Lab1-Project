using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Dtos.DrinksDto
{
    public class InsertNonAlcoholicDrinksDto
    {
        [Key]
        public int DrinkId { get; set; }
        public string DrinkName { get; set; }
        public float DrinkPrice { get; set; }
        public string DrinkDescription { get; set; }

        [ForeignKey("categoryId")]
        public int categoryId { get; set; }
    }
}

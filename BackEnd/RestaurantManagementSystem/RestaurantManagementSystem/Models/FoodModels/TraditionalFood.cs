using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Models.FoodModels
{
    public class TraditionalFood
    {
        [Key]
        public int FoodId { get; set; }
        public string FoodName { get; set; }
        public float FoodPrice { get; set; }
        public string FoodDescription { get; set; }

        [ForeignKey("categoryId")]
        public int categoryId { get; set; }
        public FoodCategory category { get; set; }
    }
}

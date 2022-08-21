using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Models.FoodModels
{
    public class Salad
    {
        [Key]
        public int SaladId { get; set; }
        public string SaladName { get; set; }
        public float SaladPrice { get; set; }
        public string SaladDescription { get; set; }

        [ForeignKey("categoryId")]
        public int categoryId { get; set; }
        public FoodCategory category { get; set; }
    }
}

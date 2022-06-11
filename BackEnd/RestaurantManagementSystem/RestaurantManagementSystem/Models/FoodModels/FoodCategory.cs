using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Models.FoodModels
{
    public class FoodCategory
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}

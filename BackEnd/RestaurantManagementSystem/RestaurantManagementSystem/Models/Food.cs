using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Models
{
    public class Food
    {
        [Key]
        public int food_id { get; set; }
        public string food_type { get; set; }
        public string food_name { get; set; }   
        public float food_price { get; set; }   
      
    }
}

using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Models
{
    public class Drinks
    {
        [Key]
        public int drink_id { get; set; }
        public string drink_type { get; set; }
        public string drink_name { get; set; }
        public float drink_price { get; set; }

    }
}

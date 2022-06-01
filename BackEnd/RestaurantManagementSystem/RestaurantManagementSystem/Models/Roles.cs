using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Models
{
    public class Roles
    {
        [Key]
        public int r_id { get; set; }
        public string r_name { get; set; }

    }
}

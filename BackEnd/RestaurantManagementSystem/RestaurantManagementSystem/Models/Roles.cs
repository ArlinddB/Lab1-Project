using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Models
{
    public class Roles
    {
        [Key]
        public int roleId { get; set; }
        public string roleName { get; set; }

    }
}

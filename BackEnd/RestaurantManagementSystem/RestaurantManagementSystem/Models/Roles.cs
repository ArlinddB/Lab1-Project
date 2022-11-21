using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RestaurantManagementSystem.Models
{
    public class Roles
    {
        [Key]
        public int roleId { get; set; }
        public string roleName { get; set; }
        public string description { get; set; }
        
    }
}

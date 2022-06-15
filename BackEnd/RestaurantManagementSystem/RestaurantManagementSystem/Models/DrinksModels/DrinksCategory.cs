using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RestaurantManagementSystem.Models.DrinksModels
{
    public class DrinksCategory
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
       
    }
}
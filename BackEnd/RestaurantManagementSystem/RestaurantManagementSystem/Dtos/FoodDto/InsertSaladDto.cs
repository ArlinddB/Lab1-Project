using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Dtos.FoodDto
{
    public class InsertSaladDto
    {
        [Key]
        public int SaladId { get; set; }
        public string SaladName { get; set; }
        public float SaladPrice { get; set; }
        public string SaladDescription { get; set; }

        [ForeignKey("categoryId")]
        public int categoryId { get; set; }
    }
}

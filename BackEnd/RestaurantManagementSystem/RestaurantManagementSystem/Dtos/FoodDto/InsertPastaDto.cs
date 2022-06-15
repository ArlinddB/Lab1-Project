using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Dtos.FoodDto
{
    public class InsertPastaDto
    {
        [Key]
        public int FoodId { get; set; }
        public string FoodName { get; set; }
        public float FoodPrice { get; set; }
        public string FoodDescription { get; set; }

        [ForeignKey("categoryId")]
        public int categoryId { get; set; }
    }
}
